import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

const root = process.cwd();
const sourceDir = join(root, "зураг ундрам");
const outputDir = join(root, "public", "gallery");
const dataFile = join(root, "data", "gallery.json");
const preparedArg = process.argv.find((argument) => argument.startsWith("--prepared="));
const workDir = mkdtempSync(join(tmpdir(), "undram-gallery-"));
const heicDir = preparedArg ? preparedArg.slice("--prepared=".length) : join(workDir, "heic");
const nextOutput = join(workDir, "assets");
const imageExtensions = new Set([".heic", ".jpg", ".jpeg", ".png", ".webp"]);
const videoExtensions = new Set([".mov", ".mp4", ".m4v"]);

mkdirSync(heicDir, { recursive: true });
mkdirSync(nextOutput, { recursive: true });

const files = readdirSync(sourceDir)
  .filter((name) => name !== ".DS_Store")
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }));
const images = files.filter((name) => imageExtensions.has(extname(name).toLowerCase()));
const videos = files.filter((name) => videoExtensions.has(extname(name).toLowerCase()));
const heicFiles = images.filter((name) => extname(name).toLowerCase() === ".heic");

if (!preparedArg && heicFiles.length) {
  execFileSync("qlmanage", ["-t", "-s", "2400", "-o", heicDir, ...heicFiles.map((name) => join(sourceDir, name))], { stdio: "inherit" });
}

function dimensions(file) {
  const result = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file], { encoding: "utf8" });
  return {
    width: Number(result.match(/pixelWidth: (\d+)/)?.[1] || 0),
    height: Number(result.match(/pixelHeight: (\d+)/)?.[1] || 0),
  };
}

const imageItems = images.map((name, index) => {
  const source = join(sourceDir, name);
  const extension = extname(name).toLowerCase();
  const rendered = extension === ".heic" ? join(heicDir, `${name}.png`) : source;
  const filename = `image-${String(index + 1).padStart(3, "0")}.jpg`;
  const destination = join(nextOutput, filename);
  const original = dimensions(source);

  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "68", "-Z", "1400", rendered, "--out", destination], { stdio: "ignore" });
  const ratio = original.width / Math.max(original.height, 1);
  const megapixels = (original.width * original.height) / 1_000_000;

  return {
    type: "image",
    src: `/gallery/${filename}`,
    width: original.width,
    height: original.height,
    orientation: ratio > 1.25 ? "landscape" : ratio < 0.8 ? "portrait" : "square",
    quality: megapixels >= 10 ? "featured" : megapixels >= 4 ? "standard" : "compact",
  };
});

const videoItems = [];
for (const [index, name] of videos.entries()) {
  const filename = `video-${String(index + 1).padStart(3, "0")}.mp4`;
  const destination = join(nextOutput, filename);
  const encodedVideo = join(workDir, `video-${String(index + 1).padStart(3, "0")}.m4v`);
  try {
    execFileSync("avconvert", ["--source", join(sourceDir, name), "--preset", "PresetAppleM4V480pSD", "--output", encodedVideo, "--duration", "8", "--replace"], { stdio: "ignore" });
    renameSync(encodedVideo, destination);
    videoItems.push({ type: "video", src: `/gallery/${filename}`, width: 854, height: 480, orientation: "landscape", quality: "featured" });
  } catch {
    console.warn(`Skipped unsupported video: ${name}`);
  }
}

const gallery = [];
imageItems.forEach((item, index) => {
  gallery.push(item);
  if ((index + 1) % 8 === 0 && videoItems.length) gallery.push(videoItems.shift());
});
gallery.push(...videoItems);

rmSync(outputDir, { recursive: true, force: true });
renameSync(nextOutput, outputDir);
mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(dataFile, `${JSON.stringify(gallery, null, 2)}\n`);
rmSync(workDir, { recursive: true, force: true });
console.log(`Gallery synced: ${imageItems.length} images, ${gallery.filter((item) => item.type === "video").length} videos.`);

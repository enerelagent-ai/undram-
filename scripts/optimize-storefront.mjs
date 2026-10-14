import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
// Keep original assets intact; static Next export serves these pre-sized WebP copies.
for (const folder of ["images", "media", "gallery"]) {
  const target =
    folder === "gallery" ? "public/optimized/gallery" : "public/optimized";
  await mkdir(target, { recursive: true });
  for (const file of await readdir(`public/${folder}`)) {
    if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) continue;
    const source = `public/${folder}/${file}`,
      output = path.join(target, file.replace(/\.[^.]+$/, ".webp"));
    try {
      if ((await stat(output)).mtimeMs >= (await stat(source)).mtimeMs)
        continue;
    } catch {}
    await sharp(source)
      .rotate()
      .resize({
        width: folder === "gallery" ? 1100 : 1600,
        withoutEnlargement: true,
      })
      .webp({ quality: 83 })
      .toFile(output);
  }
}

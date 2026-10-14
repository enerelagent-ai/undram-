import Link from "next/link";
import { Flower2 } from "lucide-react";
export default function NotFound() {
  return (
    <main className="empty-state">
      <Flower2 size={54} strokeWidth={1} />
      <p className="eyebrow">UNDRAM / 404</p>
      <h1>
        Энэ замд
        <br />
        <em>цэцэг дэлгэрээгүй байна.</em>
      </h1>
      <p>
        Хуудас олдсонгүй. Бүтээгдэхүүнүүдтэй танилцаарай.
        <br />
        Page not found.
      </p>
      <Link href="/products" className="button button-dark">
        Бүтээгдэхүүн үзэх / Shop
      </Link>
    </main>
  );
}

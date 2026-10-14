import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/utils/storefront";
export default function EditorialCard({ item, kind, label }) {
  return (
    <article className="editorial-card">
      <Link className="editorial-photo" href={`/${kind}/${item.id}`}>
        <Image
          src={asset(item.image)}
          alt={item.title}
          fill
          sizes="(max-width:600px) 100vw, 33vw"
        />
      </Link>
      <p className="eyebrow">{item.date || item.category || "UNDRAM"}</p>
      <Link href={`/${kind}/${item.id}`}>
        <h3>{item.title}</h3>
      </Link>
      {item.excerpt && <p>{item.excerpt}</p>}
      <Link href={`/${kind}/${item.id}`} className="text-link">
        {label}
        <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}

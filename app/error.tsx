"use client";
import Link from "next/link";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="empty-state">
      <p className="eyebrow">UNDRAM</p>
      <h1>Түр саатал гарлаа.</h1>
      <p>Дахин оролдоно уу. Something went wrong.</p>
      <button className="button button-dark" onClick={reset}>
        Дахин оролдох / Try again
      </button>
      <p className="mt-6">
        <Link className="text-link" href="/">
          Нүүр / Home
        </Link>
      </p>
    </main>
  );
}

export default function Loading() {
  return (
    <main className="shell" aria-busy="true" aria-label="Уншиж байна / Loading">
      <div className="loading-grid">
        {[0, 1, 2].map((i) => (
          <div className="skeleton" key={i} />
        ))}
      </div>
    </main>
  );
}

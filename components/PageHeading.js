export default function PageHeading({ eyebrow, title, description }) {
  return (
    <header className="page-heading">
      <p className="eyebrow">UNDRAM / {eyebrow}</p>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}

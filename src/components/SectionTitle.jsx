export default function SectionTitle({ eyebrow, title, text, className = "" }) {
  return (
    <div className={`section-title${className ? ` ${className}` : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

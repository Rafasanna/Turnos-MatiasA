export default function ImagePlaceholder({ label, note, variant = "default" }) {
  return (
    <div className={`image-placeholder ${variant}`}>
      <span aria-hidden="true">+</span>
      <strong>{label}</strong>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

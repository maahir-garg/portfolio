interface IndexProps {
  n: number;
  of?: number;
  className?: string;
}

export function IndexNumber({ n, of, className = "" }: IndexProps) {
  const pad = (x: number) => String(x).padStart(2, "0");
  return (
    <span
      aria-hidden
      className={`mono text-[color:var(--color-ink-faint)] tracking-[0.05em] ${className}`.trim()}
    >
      {pad(n)}
      {of !== undefined ? (
        <>
          <span className="opacity-60"> / </span>
          <span className="opacity-60">{pad(of)}</span>
        </>
      ) : null}
    </span>
  );
}

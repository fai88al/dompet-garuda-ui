interface SectionHeadingProps {
  eyebrow: string;
  headline: string;
  subhead?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  headline,
  subhead,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={`${centered ? "mx-auto max-w-xl text-center" : ""} ${className ?? ""}`}
    >
      <p className="text-[13px] font-extrabold tracking-[0.12em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-[clamp(28px,3.6vw,42px)] font-bold leading-tight text-foreground text-pretty">
        {headline}
      </h2>
      {subhead && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subhead}
        </p>
      )}
    </div>
  );
}

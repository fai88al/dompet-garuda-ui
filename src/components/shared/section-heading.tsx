interface SectionHeadingProps {
  eyebrow: string;
  headline: string;
  subhead?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  headline,
  subhead,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-sm font-medium tracking-wide text-accent-hover dark:text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
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

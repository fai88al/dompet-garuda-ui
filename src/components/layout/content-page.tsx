interface ContentPageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function ContentPage({ eyebrow, title, subtitle, children }: ContentPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-wide text-accent-hover dark:text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-[0.01em] text-foreground sm:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}

      <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        {children}
      </div>
    </main>
  );
}

const SHAPES = {
  aman: "rounded-[3px_3px_8px_8px] border-2 border-primary",
  terhubung: "rounded-full border-2 border-primary",
  cepat: "-skew-x-12 rounded-[2px] bg-primary",
  praktis: "rounded-[50%_50%_50%_4px] -rotate-45 bg-primary",
} as const;

export type TrustShape = keyof typeof SHAPES;

export function TrustIcon({
  shape,
  className,
}: {
  shape: TrustShape;
  className?: string;
}) {
  return <span className={`${SHAPES[shape]} ${className ?? ""}`} />;
}

type Props = {
  size?: number;
  className?: string;
  withTrail?: boolean;
};

// Avión de papel del logo Skyment, apuntando arriba-derecha, con estela de guiones
export default function PlaneMark({ size = 24, className = "", withTrail = true }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden
    >
      {withTrail && (
        <g stroke="var(--accent)" strokeWidth="6" strokeLinecap="round">
          <path d="M14 90 L20 84" opacity="0.35" />
          <path d="M24 80 L31 73" opacity="0.6" />
          <path d="M35 69 L43 61" opacity="0.85" />
        </g>
      )}
      {/* ala superior */}
      <path d="M92 8 L38 50 L60 56 Z" fill="var(--accent-bright)" />
      {/* cuerpo inferior */}
      <path d="M92 8 L60 56 L66 78 Z" fill="var(--accent)" />
      {/* pliegue interior */}
      <path d="M92 8 L52 54 L60 56 Z" fill="var(--accent-deep)" />
    </svg>
  );
}

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function WhatsAppCta({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "group inline-flex items-center gap-3 rounded-full font-medium t-premium active:scale-[0.98] select-none";
  const styles =
    variant === "primary"
      ? "bg-accent text-white pl-6 pr-2 py-2 shadow-[0_8px_40px_-8px_rgba(59,111,212,0.55)] hover:bg-accent-bright hover:shadow-[0_12px_48px_-8px_rgba(91,141,239,0.65)]"
      : "glass text-ink pl-6 pr-2 py-2 hover:bg-white/8";

  return (
    <a href={href} target="_blank" rel="noopener" className={`${base} ${styles} ${className}`}>
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full t-premium group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${
          variant === "primary" ? "bg-white/15" : "bg-white/10"
        }`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 18 18 6M9 6h9v9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

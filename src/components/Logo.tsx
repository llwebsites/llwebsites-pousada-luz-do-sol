type Props = {
  tone?: "light" | "dark";
  size?: "sm" | "lg";
};

/** Marca provisória. Substituir pelo arquivo oficial da pousada quando enviado. */
export function Logo({ tone = "dark", size = "sm" }: Props) {
  const color = tone === "light" ? "#ffffff" : "#10222B";
  const accent = tone === "light" ? "#ffffff" : "#1D5C4E";
  const big = size === "lg";
  return (
    <span
      className="inline-flex items-center gap-3"
      style={{ color }}
      role="img"
      aria-label="Pousada Luz do Sol"
    >
      <svg
        width={big ? 64 : 34}
        height={big ? 64 : 34}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
      >
        <circle cx="32" cy="32" r="11" fill={accent} />
        <g stroke={accent} strokeWidth="3.5" strokeLinecap="round">
          <path d="M32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M49 15l-6 6M21 43l-6 6" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={
            big
              ? "text-sm font-medium uppercase tracking-[0.32em]"
              : "text-[10px] font-medium uppercase tracking-[0.28em]"
          }
        >
          Pousada
        </span>
        <span
          className={
            big
              ? "mt-1.5 text-4xl font-semibold tracking-tight sm:text-5xl"
              : "mt-1 text-lg font-semibold tracking-tight"
          }
        >
          Luz do Sol
        </span>
      </span>
    </span>
  );
}

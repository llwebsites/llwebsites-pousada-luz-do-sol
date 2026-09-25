import Image from "next/image";

type Props = {
  size?: "sm" | "lg";
};

/** Versão compacta da marca (emblema + nome), para fundos escuros. */
export function Logo({ size = "sm" }: Props) {
  const big = size === "lg";
  return (
    <span
      className="inline-flex items-center gap-3 text-gold"
      role="img"
      aria-label="Pousada Luz do Sol"
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={big ? 96 : 52}
        height={big ? 62 : 33}
        className="h-auto"
        style={{ width: big ? 96 : 52 }}
        priority
      />
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

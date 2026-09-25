import { Reveal } from "@/components/Reveal";

type Props = {
  title: string;
  support?: string;
  id?: string;
  align?: "left" | "center";
};

export function SectionTitle({ title, support, id, align = "left" }: Props) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </h2>
      {support ? (
        <span className="mt-3 block text-base text-slate2 sm:text-lg">
          {support}
        </span>
      ) : null}
    </Reveal>
  );
}

import { Compass, Gauge, MousePointerClick, Target } from "lucide-react";
import { Concept } from "@/lib/concepts";
import Reveal from "@/components/ui/Reveal";

const icons = [Compass, Target, MousePointerClick, Gauge];

export default function Strategy({ concept }: { concept: Concept }) {
  const { strategy, brand } = concept;
  const accent = brand.palette[2].hex;

  return (
    <div>
      <Reveal>
        <p className="max-w-3xl text-pretty font-sans text-3xl font-normal leading-[1.1] tracking-[-0.04em] text-ink sm:text-4xl lg:text-5xl">
          <span className="text-ink/40">The goal: </span>
          {strategy.goal}
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
        {strategy.points.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <div className="group h-full rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/10 transition-transform duration-500 hover:-translate-y-1 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-6" style={{ backgroundColor: accent }}>
                    <Icon size={19} />
                  </span>
                  <span className="font-display text-lg text-ink/30">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-sans text-2xl font-semibold tracking-[-0.03em] text-ink">{p.title}</h3>
                <p className="mt-2 text-pretty text-base leading-relaxed text-ink/70">{p.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">What we&apos;d measure</span>
          {strategy.metrics.map((m) => (
            <span key={m} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-medium text-ink/80">
              {m}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle2 } from "lucide-react";
const FULL_TEXT = "I’m Jura. I’ll walk with you through this — calmly and step by step. I’ll ask you several questions to understand where you are now, and where you may need to go based on your situation.";
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}
type TypedTextProps<T extends keyof JSX.IntrinsicElements = "span"> = {
  text: string;
  speed?: number;
  active?: boolean;
  reduced?: boolean;
  onDone?: () => void;
  as?: T;
  className?: string;
  ariaLive?: "polite" | "assertive" | "off";
};
function TypedText<T extends keyof JSX.IntrinsicElements = "span">({
  text,
  speed = 30,
  active = true,
  reduced,
  onDone,
  as,
  className,
  ariaLive
}: TypedTextProps<T>) {
  const [display, setDisplay] = useState("");
  const Tag = (as || "span") as any;
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setDisplay(text);
      onDone?.();
      return;
    }
    setDisplay("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [active, reduced, speed, text, onDone]);
  return <Tag className={className} aria-live={ariaLive}>
      {display}
    </Tag>;
}
const steps = ["Collect your core details safely (you control the pace).", "Draft your court forms (DV-100 and a short declaration).", "Review for clarity, accuracy, and safety-first language.", "Guide filing and service of process, with local court tips.", "Prepare you for next steps and hearing day, if needed."];
const CaseIntroScreen: React.FC = () => {
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0); // 0: heading, 1: paragraph, 2.. bullets

  // SEO: title + meta description + canonical
  useEffect(() => {
    document.title = "DV Restraining Order Intro | PlainLaw";
    const desc = "You chose Domestic Violence Restraining Order. Learn what happens next and start calmly with Jura.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    const href = window.location.origin + "/case/intro/dv";
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", href);
  }, []);
  const advance = reduced ? undefined : () => setStep(s => s + 1);
  return <div className="min-h-screen bg-background">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <header className="space-y-5 md:space-y-7">
          <div className="flex justify-start">
            <div aria-hidden className="inline-flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 text-primary shadow bg-[#1c1e22]">
              <Sparkles className="size-5 md:size-6" />
            </div>
          </div>
          <TypedText as="h1" className="text-3xl md:text-5xl font-semibold text-foreground text-left" text="You chose: Domestic Violence Restraining Order" reduced={reduced} active={reduced || step === 0} onDone={advance} ariaLive="polite" speed={30} />
        </header>

        {(reduced || step >= 1) && <section className="mt-6 md:mt-8">
            <TypedText as="p" className="text-lg md:text-xl text-foreground-soft text-left leading-relaxed" text={FULL_TEXT} reduced={reduced} active={reduced || step === 1} onDone={advance} ariaLive="polite" speed={28} />
          </section>}

        {(reduced || step >= 2) && <section className="mt-8 md:mt-10">
            <ul className="space-y-3 md:space-y-4">
              {steps.map((s, i) => (reduced || step >= 2 + i) && <li key={s} className="flex items-start gap-3">
                    <CheckCircle2 aria-hidden className="mt-0.5 text-primary" />
                    <TypedText as="span" className="text-base md:text-lg text-foreground text-left leading-relaxed" text={s} reduced={reduced} active={reduced || step === 2 + i} onDone={advance} speed={26} />
                  </li>)}
            </ul>
          </section>}

        {(reduced || step >= 2 + steps.length) && <div className="mt-10 md:mt-12 flex justify-center">
            <Button size="lg" onClick={() => navigate("/intake")} className="rounded-full bg-[transpar#1c1e22ent] bg-[#1c1e22]">
              I understand
            </Button>
          </div>}
      </main>
    </div>;
};
export default CaseIntroScreen;
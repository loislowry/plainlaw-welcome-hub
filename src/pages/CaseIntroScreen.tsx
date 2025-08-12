import React, { useEffect, useMemo, useState } from "react";
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

function useTypedText(text: string, speed = 22) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }

    setDisplay("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);

    return () => window.clearInterval(id);
  }, [text, reduced, speed]);

  return display;
}

const steps = [
  "Collect your core details safely (you control the pace).",
  "Draft your court forms (DV-100 and a short declaration).",
  "Review for clarity, accuracy, and safety-first language.",
  "Guide filing and service of process, with local court tips.",
  "Prepare you for next steps and hearing day, if needed.",
];

const CaseIntroScreen: React.FC = () => {
  const navigate = useNavigate();
  const typed = useTypedText(FULL_TEXT);

  // SEO: title + meta description + canonical
  useEffect(() => {
    document.title = "DV Restraining Order Intro | PlainLaw";
    const desc =
      "You chose Domestic Violence Restraining Order. Learn what happens next and start calmly with Jura.";
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

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <header className="text-center space-y-5 md:space-y-7">
          <div className="flex justify-center">
            <div
              aria-hidden
              className="inline-flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 bg-accent/60 text-primary shadow"
            >
              <Sparkles className="size-5 md:size-6" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground">
            You chose: Domestic Violence Restraining Order
          </h1>
        </header>

        <section className="mt-6 md:mt-8">
          <p
            role="status"
            aria-live="polite"
            className="text-lg md:text-xl text-foreground-soft text-center"
          >
            {typed}
          </p>
        </section>

        <section className="mt-8 md:mt-10">
          <ul className="space-y-3 md:space-y-4">
            {steps.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <CheckCircle2 aria-hidden className="mt-0.5 text-primary" />
                <span className="text-base md:text-lg text-foreground text-left">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 md:mt-12 flex justify-center">
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/intake")}
          >
            I understand
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CaseIntroScreen;

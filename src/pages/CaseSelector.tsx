import React, { useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/components/ui/use-toast';
const CaseSelector: React.FC = () => {
  useEffect(() => {
    document.title = 'All features in 1 tool | PlainLaw';
    const meta = document.querySelector('meta[name="description"]');
    const description = 'Discover features that simplify workflows and grow your business.';
    if (meta) {
      meta.setAttribute('content', description);
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = description;
      document.head.appendChild(m);
    }
  }, []);
  const {
    toast
  } = useToast();
  type Layout = 'image-left' | 'text-only';
  interface Feature {
    title: string;
    description: string;
    icon: string;
    layout: Layout;
    imageSrc?: string;
    imageAlt?: string;
  }
  const features: Feature[] = [{
    title: 'Domestic Violence Restraining Order (DV)',
    description: 'Get court‑ready protection fast. Jura will collect your details, fill the forms, and guide filing and service.',
    icon: '✖',
    layout: 'image-left',
    imageSrc: '/lovable-uploads/b286490e-d7c4-41a1-80f2-50938fd19e4c.png',
    imageAlt: 'Collaborative illustration showing people and documents'
  }, {
    title: 'Custody & Visitation',
    description: 'Change or set up parenting arrangements. Jura will help draft your request, prepare supporting forms, and keep you on track for court.',
    icon: '⚙',
    layout: 'text-only'
  }, {
    title: 'Small Claims',
    description: 'Resolve money disputes under $10,000. Jura will guide you in filing your claim, preparing evidence, and getting ready for your hearing.',
    icon: '↗',
    layout: 'text-only'
  }, {
    title: 'AI-Powered Support',
    description: 'Enhance customer experience with always-on virtual assistants.',
    icon: '💬',
    layout: 'image-left',
    imageSrc: '/lovable-uploads/34881303-5244-4b7f-851e-6ae67e2dba5a.png',
    imageAlt: 'Customer support illustration with people and care symbols'
  }, {
    title: 'Security & Compliance',
    description: 'Keep data protected and meet regulatory standards with built-in safeguards.',
    icon: '🛡',
    layout: 'text-only'
  }];
  const delays = ['animate-delay-100', 'animate-delay-200', 'animate-delay-300', 'animate-delay-400', 'animate-delay-500'];
  const layoutVariants = ['md:col-span-4 md:min-h-[16rem]', 'md:col-span-2 md:min-h-[12rem]', 'md:col-span-3 md:min-h-[10rem]', 'md:col-span-3 md:min-h-[18rem]', 'md:col-span-6 md:min-h-[14rem]'];

  // Scroll reveal: header + cards
  const {
    ref: headerRef,
    isInView: headerVisible
  } = useInView<HTMLElement>();
  const FeatureCard: React.FC<{
    f: Feature;
    index: number;
  }> = ({
    f,
    index
  }) => {
    const {
      ref,
      isInView
    } = useInView<HTMLDivElement>();
    return <article ref={ref} onClick={() => {
      if (index > 0) toast({
        title: 'Coming soon',
        description: 'This feature will be available shortly.'
      });
    }} className={`case-card relative rounded-3xl p-6 md:p-7 bg-card/90 border border-border shadow-2xl transition-all duration-300 will-change-transform hover:-translate-y-0.5 group ${isInView ? `animate-fade-slide-in ${delays[index]}` : 'opacity-0'} ${layoutVariants[index]} ${index > 0 ? 'cursor-not-allowed' : ''}`} aria-disabled={index > 0}>
        {index > 0 && <div className="absolute inset-0 z-10 rounded-3xl bg-card/60 backdrop-blur-md border border-border/60 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-sm md:text-base font-medium text-foreground">Coming soon</span>
          </div>}
        {f.layout === 'image-left' ? <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-center">
            <div className="md:col-span-3">
{f.imageSrc && (
              <div className="rounded-xl shadow-2xl overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={f.imageSrc}
                    alt={f.imageAlt || f.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </AspectRatio>
              </div>
            )}
            </div>
            <div className="md:col-span-2">
              {index === 0 && <Button size="sm" className="mb-4 transition-transform duration-300 group-hover:-translate-y-0.5 bg-[#1c1e22] rounded-3xl">
                  Start my case
                </Button>}
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{index === 0 ? 'Restraining Order' : f.title}</h3>
              <p className="text-foreground-soft text-base">{f.description}</p>
            </div>
          </div> : <div className="flex items-start gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-foreground-soft text-base text-left">{f.description}</p>
            </div>
          </div>}
      </article>;
  };
  return <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-[60px]">
        <header ref={headerRef} className={`text-center mb-10 md:mb-14 ${headerVisible ? 'animate-fade-slide-in animate-delay-100' : 'opacity-0'}`}>
          <h1 className="text-4xl text-foreground mb-4 font-semibold md:text-6xl">What you need help with today?</h1>
          <p className="text-foreground-soft text-lg md:text-xl max-w-2xl mx-auto">Pick a case type to get a personalized checklist. You can switch later.</p>
        </header>

        <section className="grid md:grid-cols-6 gap-6 md:gap-8">
          {features.map((f, index) => <FeatureCard key={f.title} f={f} index={index} />)}
        </section>

        <div className="mt-10 md:mt-14 flex items-center justify-center gap-4">
        </div>
      </main>
    </div>;
};
export default CaseSelector;
import React, { useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const START_ROUTE = "/intake"; // route to start case
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
    description: 'Get court‑ready protection fast. Jura will collect your details, fill the forms, and guide you to filing safely.',
    icon: '✖',
    layout: 'image-left',
    imageSrc: '/lovable-uploads/b286490e-d7c4-41a1-80f2-50938fd19e4c.png',
    imageAlt: 'Collaborative illustration showing people and documents'
  }, {
    title: 'Custody & Visitation',
    description: 'Set or change parenting time and decision‑making. Jura will help draft required forms and keep you on track for court.',
    icon: '⚙',
    layout: 'text-only'
  }, {
    title: 'Small Claims',
    description: 'Resolve money disputes under $10,000. Jura helps prepare your claim, organize evidence, and get ready for the hearing.',
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
  const layoutVariants = ['md:col-span-4', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3', 'md:col-span-6'];

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
    } = useInView<HTMLButtonElement>();
    return <button type="button" ref={ref} onClick={e => {
      e.preventDefault();
      e.stopPropagation();
      if (index === 0) {
        navigate(START_ROUTE);
      } else {
        toast({
          title: 'Coming soon',
          description: 'This case type will be available shortly.'
        });
      }
    }} onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (index === 0) {
          navigate(START_ROUTE);
        } else {
          toast({
            title: 'Coming soon',
            description: 'This case type will be available shortly.'
          });
        }
      }
    }} onClickCapture={e => {
      if (index > 0) {
        e.preventDefault();
        e.stopPropagation();
      }
    }} className={`case-card relative rounded-3xl p-6 md:p-7 bg-card/90 border border-border shadow-2xl transition-all duration-300 will-change-transform hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 ${isInView ? `animate-fade-slide-in ${delays[index]}` : 'opacity-0'} ${layoutVariants[index]} ${index > 0 ? 'cursor-not-allowed' : ''}`} aria-disabled={index > 0}>


        {index > 0 && <div className="absolute inset-0 z-10 rounded-3xl bg-card/60 backdrop-blur-md border border-border/60 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-sm md:text-base font-medium text-foreground">Coming soon</span>
          </div>}
        {f.layout === 'image-left' ? <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-center">
            <div className="md:col-span-3">
          {f.imageSrc && <div className="rounded-xl shadow-2xl overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img src={f.imageSrc} alt={f.imageAlt || f.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
                </AspectRatio>
              </div>}
            </div>
            <div className="md:col-span-2">
              {index === 0 && <Button size="sm" onClick={e => {
            e.stopPropagation();
            navigate(START_ROUTE);
          }} className="mb-4 transition-transform duration-300 group-hover:-translate-y-0.5 bg-[#1c1e22] rounded-3xl">
                  Start my case
                </Button>}

              <h3 className="text-xl font-semibold text-foreground mb-2 text-left md:text-2xl">{index === 0 ? 'Restraining Order' : f.title}</h3>
              <p className="text-foreground-soft text-base text-left">{f.description}</p>
            </div>
          </div> : <div className="flex items-start gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 text-left">{f.title}</h3>
              <p className="text-foreground-soft text-base md:text-lg text-left">{f.description}</p>
            </div>
          </div>}
      </button>;
  };
  return <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-[60px]">
        <header ref={headerRef} className={`text-center mb-10 md:mb-14 ${headerVisible ? 'animate-fade-slide-in animate-delay-100' : 'opacity-0'}`}>
          <h1 className="text-4xl text-foreground mb-4 font-semibold md:text-6xl">What you need help with today?</h1>
          <p className="text-foreground-soft text-lg md:text-xl max-w-2xl mx-auto">Choose your case type to get a calm, step-by-step checklist. You can switch later.</p>
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
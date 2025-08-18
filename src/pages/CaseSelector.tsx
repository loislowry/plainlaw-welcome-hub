import React, { useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
const CaseSelector: React.FC = () => {
  useEffect(() => {
    document.title = 'Select Your Case | PlainLaw';
    const meta = document.querySelector('meta[name="description"]');
    const description = 'Choose your legal case type and get personalized help with court documents and filing processes.';
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
  const START_ROUTE = "/case/intro/dv";
  interface CaseType {
    title: string;
    description: string;
    nextSteps: string;
    available: boolean;
    bgColor: string;
  }
  const cases: CaseType[] = [{
    title: 'Restraining Order',
    description: 'Get protection fast. Jura collects your story, completes DV forms, and guides filing & service.',
    nextSteps: 'Next: Quick Intake → Recommended Forms → Build Docs → File & Serve → Dashboard',
    available: true,
    bgColor: 'bg-[#F9FAFB]/60'
  }, {
    title: 'Custody & Visitation',
    description: 'Set or change a parenting schedule. Jura will draft your request and supporting forms.',
    nextSteps: 'Next: Quick Intake → Recommended Forms → Build Docs → Court Prep → Dashboard',
    available: false,
    bgColor: 'bg-[#F1F5F9]/60'
  }, {
    title: 'Divorce & Family Law',
    description: 'Starting or responding to a divorce? Jura will organize info, disclosures, and required forms.',
    nextSteps: 'Next: Quick Intake → Recommended Forms → Build Docs → File & Track → Dashboard',
    available: false,
    bgColor: 'bg-[#F8FAFC]/60'
  }, {
    title: 'Small Claims',
    description: 'Resolve money disputes under $10,000. Jura will guide filing and hearing preparation.',
    nextSteps: 'Next: Quick Intake → Recommended Forms → Build Docs → Court Prep → Dashboard',
    available: false,
    bgColor: 'bg-[#F9FAFB]/60'
  }, {
    title: 'Eviction Defense',
    description: 'Facing a notice or lawsuit? Jura will help prepare the right response and track deadlines.',
    nextSteps: 'Next: Quick Intake → Recommended Forms → Build Docs → File & Track → Dashboard',
    available: false,
    bgColor: 'bg-[#F1F5F9]/60'
  }];

  // Uneven card heights for natural look - made bigger
  const cardHeights = ['h-96', 'h-[26rem]', 'h-[22rem]', 'h-[28rem]', 'h-[24rem]'];

  // Scroll reveal: header + carousel
  const {
    ref: headerRef,
    isInView: headerVisible
  } = useInView<HTMLElement>();
  const handleCaseClick = (caseItem: CaseType, index: number) => {
    if (caseItem.available) {
      navigate(START_ROUTE);
    } else {
      toast({
        title: 'Coming soon',
        description: 'This case type will be available shortly.'
      });
    }
  };
  const CaseCard: React.FC<{
    caseItem: CaseType;
    index: number;
  }> = ({
    caseItem,
    index
  }) => {
    const {
      ref,
      isInView
    } = useInView<HTMLDivElement>();
    const cardHeight = cardHeights[index % cardHeights.length];
    const textColor = 'text-[#0F172A]'; // Dark navy for headings

    // iPhone-style staggered animation delay
    const animationDelay = `${index * 150}ms`;
    return <div ref={ref} className={`relative group cursor-pointer transition-all duration-700 ease-out ${isInView ? 'animate-fade-in translate-y-0 opacity-100' : 'opacity-0 translate-y-8'}`} style={{
      animationDelay: isInView ? animationDelay : '0ms',
      transitionDelay: isInView ? animationDelay : '0ms'
    }} onClick={() => handleCaseClick(caseItem, index)}>
        <div className={`
          relative ${cardHeight} rounded-[2rem] shadow-[0_12px_32px_rgba(2,6,23,0.08)] transition-all duration-500 
          hover:shadow-3xl overflow-hidden border
          ${caseItem.bgColor} backdrop-blur-md ${textColor}
          border-white/40
          transform-gpu will-change-transform
        `}>
          {/* Coming Soon Overlay */}
          {!caseItem.available && <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem] z-10">
              <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium px-6 py-2 text-lg rounded-2xl">
                Coming Soon
              </Badge>
            </div>}
          
          {/* Card Content */}
          <div className="flex flex-col h-full p-6 md:p-7">
            <div className="flex-1 space-y-3 md:space-y-4">
              <h3 className="text-3xl md:text-4xl leading-tight font-semibold">
                {caseItem.title}
              </h3>
              
              <p className="text-[#475569] text-lg md:text-xl leading-relaxed">
                {caseItem.description}
              </p>
              
              <p className="text-sm text-slate-600 leading-6 mb-0">
                {caseItem.nextSteps}
              </p>
            </div>
            
            {caseItem.available && <div className="mt-auto pt-3 shrink-0 self-start">
              <button onClick={e => {
              e.stopPropagation();
              navigate(START_ROUTE);
            }} className="inline-flex items-center justify-center rounded-full px-5 h-11 text-white font-semibold leading-none transition focus:outline-none focus:ring-2 focus:ring-blue-200 ring-offset-0 bg-[#2563EB]">
                Start Case
              </button>
            </div>}
          </div>
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-white relative">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-[71px]">
        <header ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl text-[#0F172A] mb-6 font-medium md:text-7xl">
            Select Your Case
          </h1>
          <p className="text-[#475569] text-xl max-w-3xl mx-auto md:text-xl">
            Choose your legal case type and get personalized help with court documents and filing processes.
          </p>
        </header>

        <section className="max-w-6xl mx-auto relative">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-6">
              {cases.map((caseItem, index) => <CarouselItem key={caseItem.title} className="pl-6 md:basis-1/2 xl:basis-1/3 py-[13px]">
                  <CaseCard caseItem={caseItem} index={index} />
                </CarouselItem>)}
            </CarouselContent>
            
            {/* Navigation buttons positioned in upper right */}
            <div className="absolute -top-20 right-0 flex gap-3 z-20 py-[21px]">
              <CarouselPrevious className="relative top-0 left-0 translate-x-0 translate-y-0 bg-white/90 hover:bg-white border-2 border-gray-200 shadow-lg w-12 h-12 rounded-3xl" />
              <CarouselNext className="relative top-0 right-0 translate-x-0 translate-y-0 bg-white/90 hover:bg-white border-2 border-gray-200 shadow-lg w-12 h-12 rounded-3xl" />
            </div>
          </Carousel>
        </section>

        <div className="mt-20 text-center">
          
        </div>
      </main>
    </div>;
};
export default CaseSelector;
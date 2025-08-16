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
    available: boolean;
    bgColor: string;
  }
  const cases: CaseType[] = [{
    title: 'Restraining Order',
    description: 'Start your case with Jura\'s help.',
    available: true,
    bgColor: 'bg-[#f5f5f5]'
  }, {
    title: 'Custody & Visitation',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-[#f2f2f1]'
  }, {
    title: 'Divorce & Family Law',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-white'
  }, {
    title: 'Small Claims',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-[#f5f5f5]'
  }, {
    title: 'Evictions',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-[#f2f2f1]'
  }];

  // Staggered layout with varying heights and offsets for organic feel
  const cardHeights = ['h-[420px] md:h-[440px]', 'h-[460px] md:h-[480px]', 'h-[430px] md:h-[450px]', 'h-[420px] md:h-[440px]', 'h-[460px] md:h-[480px]'];
  const cardOffsets = ['md:translate-y-2', 'md:-translate-y-3', 'md:translate-y-1', 'md:translate-y-2', 'md:-translate-y-2'];
  const tabletOffsets = ['sm:translate-y-[-8px]', 'sm:translate-y-[6px]', 'sm:translate-y-[-4px]', 'sm:translate-y-[8px]', 'sm:translate-y-[-6px]'];

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
    const cardOffset = cardOffsets[index % cardOffsets.length];
    const tabletOffset = tabletOffsets[index % tabletOffsets.length];

    // iPhone-style staggered animation delay
    const animationDelay = `${index * 150}ms`;
    return <div ref={ref} className={`relative group cursor-pointer transition-all duration-700 ease-out ${cardOffset} ${tabletOffset} ${isInView ? 'animate-fade-in translate-y-0 opacity-100' : 'opacity-0 translate-y-8'}`} style={{
      animationDelay: isInView ? animationDelay : '0ms',
      transitionDelay: isInView ? animationDelay : '0ms'
    }} onClick={() => handleCaseClick(caseItem, index)}>
        <div className={`
          relative ${cardHeight} rounded-2xl p-8 shadow-[0_12px_32px_rgba(2,6,23,0.08)] transition-all duration-500 
          hover:shadow-[0_16px_40px_rgba(2,6,23,0.12)] hover:-translate-y-1 overflow-hidden
          bg-white/60 backdrop-blur-md border border-white/40
          transform-gpu will-change-transform
        `}>
          {/* Coming Soon Overlay */}
          {!caseItem.available && <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-end flex-col pb-8 opacity-100 transition-opacity duration-300 rounded-2xl z-10">
              <Badge variant="secondary" className="bg-white/90 text-gray-800 font-semibold px-6 py-3 text-base rounded-full shadow-sm">
                Coming Soon
              </Badge>
            </div>}
          
          {/* Card Content */}
          <div className="space-y-6 h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight text-[#0F172A] tracking-tight">
              {caseItem.title}
            </h3>
            
            <p className="text-[#475569] text-lg md:text-xl leading-relaxed flex-grow">
              {caseItem.description}
            </p>
            
            {caseItem.available && <Button 
              variant="secondary" 
              size="lg" 
              className="self-start mt-auto text-base font-semibold px-8 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full shadow-sm hover:shadow-md hover:ring-2 hover:ring-blue-200 active:translate-y-[1px] transition-all duration-200" 
              onClick={e => {
              e.stopPropagation();
              navigate(START_ROUTE);
            }}>
                Start Case
              </Button>}
          </div>
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-white relative font-[Inter,ui-sans-serif,system-ui,-apple-system,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Apple_Color_Emoji','Segoe_UI_Emoji']">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <header ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 tracking-tight">
            Select Your Case
          </h1>
          <p className="text-[#475569] text-xl md:text-2xl max-w-3xl mx-auto">
            Choose your legal case type and get personalized help with court documents and filing processes.
          </p>
        </header>

        <section className="max-w-6xl mx-auto relative">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-6">
              {cases.map((caseItem, index) => <CarouselItem key={caseItem.title} className="pl-6 basis-full sm:basis-1/2 xl:basis-1/3">
                  <CaseCard caseItem={caseItem} index={index} />
                </CarouselItem>)}
            </CarouselContent>
            
            {/* Navigation buttons positioned in upper right */}
            <div className="absolute -top-20 right-0 flex gap-3 z-20">
              <CarouselPrevious className="relative top-0 left-0 translate-x-0 translate-y-0 bg-white/90 hover:bg-white border-2 border-gray-200 shadow-lg w-12 h-12 rounded-2xl" />
              <CarouselNext className="relative top-0 right-0 translate-x-0 translate-y-0 bg-white/90 hover:bg-white border-2 border-gray-200 shadow-lg w-12 h-12 rounded-2xl" />
            </div>
          </Carousel>
        </section>

        <div className="mt-20 text-center">
          
        </div>
      </main>
    </div>;
};
export default CaseSelector;
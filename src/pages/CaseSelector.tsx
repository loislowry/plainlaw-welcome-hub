import React, { useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
const CaseSelector: React.FC = () => {
  // Force recompilation
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
    bgColor: 'bg-[#1c1e22]'
  }, {
    title: 'Custody & Visitation',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-white'
  }, {
    title: 'Divorce & Family Law',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-[#1c1e22]'
  }, {
    title: 'Small Claims',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-white'
  }, {
    title: 'Evictions',
    description: 'Coming soon',
    available: false,
    bgColor: 'bg-[#1c1e22]'
  }];

  // Uneven card heights for natural look
  const cardHeights = ['h-72', 'h-80', 'h-76', 'h-84', 'h-78'];

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
    const isWhiteBg = caseItem.bgColor.includes('white');
    const textColor = isWhiteBg ? 'text-gray-900' : 'text-white';
    const starColor = isWhiteBg ? 'text-yellow-500' : 'text-yellow-300';
    return <div ref={ref} className={`relative group cursor-pointer ${isInView ? 'animate-fade-in' : 'opacity-0'}`} onClick={() => handleCaseClick(caseItem, index)}>
        <div className={`
          relative ${cardHeight} rounded-2xl p-6 shadow-lg transition-all duration-300 
          hover:shadow-xl hover:-translate-y-1 overflow-hidden border
          ${caseItem.bgColor} ${textColor}
          ${isWhiteBg ? 'border-gray-200 shadow-gray-200/50' : 'border-gray-700 shadow-black/20'}
        `}>
          {/* Coming Soon Overlay */}
          {!caseItem.available && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-10">
              <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium">
                Coming Soon
              </Badge>
            </div>}
          
          {/* Stars rating */}
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => {})}
          </div>
          
          {/* Card Content */}
          <div className="space-y-4 h-full flex flex-col">
            <h3 className="text-2xl font-bold leading-tight">
              {caseItem.title}
            </h3>
            
            <p className={`${isWhiteBg ? 'text-gray-600' : 'text-white/90'} text-base leading-relaxed flex-grow`}>
              {caseItem.available ? caseItem.description : 'This case type will be available soon with comprehensive guidance and support.'}
            </p>
            
            {caseItem.available && <Button variant="secondary" size="sm" className={`self-start mt-auto ${isWhiteBg ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-white/20 hover:bg-white/30 text-white border-white/30'}`} onClick={e => {
            e.stopPropagation();
            navigate(START_ROUTE);
          }}>
                Start Case
              </Button>}
          </div>
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <header ref={headerRef} className={`text-center mb-12 ${headerVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Select Your Case
          </h1>
          <p className="text-foreground-soft text-xl md:text-2xl max-w-3xl mx-auto">
            Choose your legal case type and get personalized help with court documents and filing processes.
          </p>
        </header>

        <section className="max-w-5xl mx-auto">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-4">
              {cases.map((caseItem, index) => <CarouselItem key={caseItem.title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <CaseCard caseItem={caseItem} index={index} />
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </Carousel>
        </section>

        <div className="mt-16 text-center">
          <p className="text-foreground-soft text-lg">
            More case types coming soon. Need help with something else?{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              Contact us
            </a>
          </p>
        </div>
      </main>
    </div>;
};
export default CaseSelector;
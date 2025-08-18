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
          relative ${cardHeight} rounded-[2rem] p-6 md:p-7 pb-6 shadow-[0_12px_32px_rgba(2,6,23,0.08)] transition-all duration-500 
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
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-2 md:space-y-3">
              <h3 className="text-3xl md:text-4xl leading-tight font-semibold">
                {caseItem.title}
              </h3>
              
              <p className="text-[#475569] text-lg md:text-xl leading-relaxed">
                {caseItem.description}
              </p>
              
              <p className="text-[#475569] text-lg leading-relaxed md:text-base mb-0">
                {caseItem.nextSteps}
              </p>
              
              {/* SVG illustration for Custody & Visitation card */}
              {index === 1 && (
                <div className="mt-4 flex justify-center">
                  <svg width="312" height="92" viewBox="0 0 312 92" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" className="w-full max-w-[280px] h-auto opacity-80">
                    <title id="title">Divorce & Family — Care and Coordination</title>
                    <desc id="desc">Two simple adult figures with a child in the middle, a small heart above, connected by a dotted path. Hand-drawn, slightly wobbly strokes with soft color blobs.</desc>

                    {/* soft blobs (no outlines) */}
                    <path d="M40 28c20-16 54-10 62 7 8 16-9 30-29 34-20 4-40-2-45-14-4-10 1-19 12-27Z" fill="#F5E6DA"/>
                    <path d="M210 28c20-16 54-10 62 7 8 16-9 30-29 34-20 4-40-2-45-14-4-10 1-19 12-27Z" fill="#EAE8F4"/>
                    <path d="M135 10c16-6 44-2 48 10 3 10-7 18-17 21-13 3-28 3-38-3-9-5-10-18 7-28Z" fill="#F9D6C8"/>

                    {/* left adult: head (slightly uneven circle) */}
                    <path d="M70 14c7-2 16 2 18 9 2 7-3 14-10 16-8 2-15-3-17-10-2-6 1-12 9-15Z"
                          stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    {/* left shoulders/chest */}
                    <path d="M50 58q20-10 40 0 3 2 6 6"
                          stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                    {/* right adult: head */}
                    <path d="M242 14c7-2 16 2 18 9 2 7-3 14-10 16-8 2-15-3-17-10-2-6 1-12 9-15Z"
                          stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    {/* right shoulders/chest */}
                    <path d="M222 58q20-10 40 0 3 2 6 6"
                          stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                    {/* dotted path connecting adults (slightly wavy) */}
                    <path d="M100 46q28-8 56 0t56 0"
                          stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                          strokeDasharray="0.01 8"/>

                    {/* heart above center (small, hand-drawn) */}
                    <path d="M151 22c-2-4-8-4-10 0-2 4 1 8 5 11l5 4 5-4c4-3 7-7 5-11-2-4-8-4-10 0Z"
                          stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

                    {/* child (stick figure) */}
                    {/* head */}
                    <circle cx="156" cy="44" r="5.6" stroke="#111" strokeWidth="3" fill="none"/>
                    {/* body */}
                    <path d="M156 50v16" stroke="#111" strokeWidth="3.2" strokeLinecap="round"/>
                    {/* arms */}
                    <path d="M146 56q10-4 20 0" stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* legs */}
                    <path d="M152 70q4 4 4 8 M160 70q-4 4-4 8" stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              
              {/* SVG illustration for Small Claims card */}
              {index === 3 && (
                <div className="mt-4 flex justify-center">
                  <svg width="312" height="162" viewBox="0 0 312 162" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" className="w-full max-w-[280px] h-auto opacity-80">
                    <title id="title">Receipt and Coin — Claim for Money Owed</title>
                    <desc id="desc">A rough receipt with a zig-zag bottom and a wobbly coin with a small dollar squiggle, drawn with imperfect lines and soft color blobs.</desc>

                    {/* Soft color blobs (no outlines) */}
                    <path d="M26 36c22-18 72-18 96 2 24 20 5 48-28 57-33 9-72 2-84-18-9-15-3-29 16-41Z" fill="#F5E6DA"/>
                    <path d="M230 54c16-10 44-8 56 6 12 14 2 30-14 36-16 6-38 4-48-6-10-10-10-24 6-36Z" fill="#F9DCC4"/>

                    {/* Receipt outline with zig-zag bottom (wobbly) */}
                    <path d="M60 30
                           Q56 28 54 34
                           L54 112
                           L60 104
                           L68 118
                           L76 104
                           L84 118
                           L92 104
                           L100 118
                           L108 104
                           L116 118
                           L124 104
                           L132 118
                           L140 104
                           L148 118
                           L156 104
                           L164 118
                           L172 104
                           L180 118
                           L188 104
                           L196 118
                           L204 104
                           L212 118
                           L220 104
                           L226 112
                           L226 36
                           Q224 30 218 32
                           L62 32
                           Q61 31 60 30 Z"
                          stroke="#111" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                    {/* "Text" lines on the receipt (uneven) */}
                    <path d="M72 46h118" stroke="#111" strokeWidth="2.6" strokeLinecap="round" opacity="0.9"/>
                    <path d="M72 58h104" stroke="#111" strokeWidth="2.6" strokeLinecap="round" opacity="0.9"/>
                    <path d="M72 70h112" stroke="#111" strokeWidth="2.6" strokeLinecap="round" opacity="0.9"/>
                    <path d="M72 82h90"  stroke="#111" strokeWidth="2.6" strokeLinecap="round" opacity="0.9"/>

                    {/* Wobbly coin shape */}
                    <path d="M262 86
                           q 6 -22 26 -20
                           q 24 4 22 26
                           q -4 24 -26 22
                           q -24 -4 -22 -28 Z"
                          stroke="#111" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                    {/* Tiny '$' squiggle inside coin */}
                    <path d="M284 76
                           q -5 4 5 9
                           q -7 4 -5 9"
                          stroke="#111" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <path d="M284 72v28" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>
            
            {caseItem.available && <div className="mt-auto pt-3 shrink-0 self-start">
              <button onClick={e => {
              e.stopPropagation();
              navigate(START_ROUTE);
            }} className="inline-flex items-center justify-center rounded-full px-5 h-11 text-white font-semibold leading-none transition focus:outline-none focus:ring-2 focus:ring-blue-200 ring-offset-0 bg-[#1c1e22]">
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
          <h1 className="text-5xl md:text-6xl text-[#0F172A] mb-6 font-semibold">
            Select Your Case
          </h1>
          <p className="text-[#475569] text-xl max-w-3xl mx-auto md:text-2xl">
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
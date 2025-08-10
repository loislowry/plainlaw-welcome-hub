import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';


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

  type Layout = 'image-left' | 'text-only';
  interface Feature {
    title: string;
    description: string;
    icon: string;
    layout: Layout;
    imageSrc?: string;
    imageAlt?: string;
  }

  const features: Feature[] = [
    {
      title: 'Cutting-Edge AI',
      description: 'Deploy AI solutions that adapt quickly, learn fast, and scale with your needs.',
      icon: '✖',
      layout: 'image-left',
      imageSrc: '/placeholder.svg',
      imageAlt: 'Futuristic robot by a window'
    },
    {
      title: 'Automated Workflows',
      description: 'Streamline tasks and boost efficiency with scalable AI-powered automation.',
      icon: '⚙',
      layout: 'text-only'
    },
    {
      title: 'Insightful Analytics',
      description: 'Gain deep, real-time insights to guide smarter strategies and growth.',
      icon: '↗',
      layout: 'text-only'
    },
    {
      title: 'AI-Powered Support',
      description: 'Enhance customer experience with always-on virtual assistants.',
      icon: '💬',
      layout: 'image-left',
      imageSrc: '/placeholder.svg',
      imageAlt: 'Cute assistant robot in a living room'
    },
    {
      title: 'Security & Compliance',
      description: 'Keep data protected and meet regulatory standards with built-in safeguards.',
      icon: '🛡',
      layout: 'text-only'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-4">
            All features in 1 tool
          </h1>
          <p className="text-foreground-soft text-lg md:text-xl max-w-2xl mx-auto">
            Discover features that simplify workflows & grow your business.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          {features.map((f) => (
            <article key={f.title} className="case-card relative rounded-3xl p-6 md:p-7 bg-card/90 border border-border shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
              {f.layout === 'image-left' ? (
                <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-center">
                  <div className="md:col-span-3">
                    {f.imageSrc && (
                      <img
                        src={f.imageSrc}
                        alt={f.imageAlt || f.title}
                        loading="lazy"
                        className="w-full h-40 md:h-44 object-cover rounded-xl shadow-2xl"
                      />
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background shadow-xl mb-4">
                      <span className="text-base">{f.icon}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-foreground-soft text-base">{f.description}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background shadow-xl">
                    <span className="text-base">{f.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-foreground-soft text-base">{f.description}</p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>

        <div className="mt-10 md:mt-14 flex items-center justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">See Our Services</Button>
        </div>
      </main>
    </div>
  );
};

export default CaseSelector;
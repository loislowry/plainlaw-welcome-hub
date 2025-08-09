import React, { useState, useEffect } from 'react';
import CaseCategoryCard from '../components/CaseCategoryCard';

interface CaseCategory {
  icon: string;
  title: string;
  description: string;
}

const CaseSelector: React.FC = () => {
  // In a real app, this would come from authentication context or props
  const [userName] = useState('Sarah'); // Placeholder user name
  
  const caseCategories: CaseCategory[] = [
    { 
      icon: "🔒", 
      title: "Restraining Order", 
      description: "Protect yourself from abuse or threats" 
    },
    { 
      icon: "👶", 
      title: "Child Custody", 
      description: "Request or modify custody arrangements" 
    },
    { 
      icon: "💸", 
      title: "Child Support", 
      description: "Request or change support payments" 
    },
    { 
      icon: "🏠", 
      title: "Eviction Defense", 
      description: "Respond to a notice or eviction case" 
    },
    { 
      icon: "📝", 
      title: "Other Filings", 
      description: "Help with other California court forms" 
    }
  ];

  const handleCategorySelect = (categoryTitle: string) => {
    console.log(`Selected category: ${categoryTitle}`);
    // In a real app, this would navigate to the specific case flow
    // or call an API endpoint to start the legal process
  };

  // Animation delay classes for staggered effect
  const animationDelays = [
    'animate-delay-100',
    'animate-delay-200', 
    'animate-delay-300',
    'animate-delay-400',
    'animate-delay-500'
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* Greeting */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
            Hi {userName}, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">what do you need help with today?</span>
          </h2>
          <p className="text-xl text-foreground-soft max-w-3xl mx-auto leading-relaxed">
            Select the type of legal assistance you need. We'll guide you through each step of the process.
          </p>
        </div>

        {/* Case Categories Grid */}
        <div className="grid gap-6 md:gap-8">
          {caseCategories.map((category, index) => (
            <CaseCategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              onClick={() => handleCategorySelect(category.title)}
              animationDelay={animationDelays[index]}
            />
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-24 text-center">
          <div className="case-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need something else?
            </h3>
            <p className="text-foreground-soft mb-8 text-lg">
              Our team is here to help you navigate California's legal system. 
              If you don't see what you're looking for, we can still assist you.
            </p>
            <button className="modern-btn">
              Contact Support
            </button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default CaseSelector;
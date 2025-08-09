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
      {/* Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PlainLaw.ai
            </h1>
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-foreground-soft">Welcome back, {userName}</span>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="bg-background-subtle border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-foreground-soft">
              © 2024 PlainLaw.ai. Making legal help accessible to everyone.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-foreground-soft hover:text-legal-blue transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground-soft hover:text-legal-blue transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-foreground-soft hover:text-legal-blue transition-colors">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CaseSelector;
import React from 'react';

interface CaseCategoryCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
  animationDelay?: string;
}

const CaseCategoryCard: React.FC<CaseCategoryCardProps> = ({
  icon,
  title,
  description,
  onClick,
  animationDelay = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`case-card w-full text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 animate-fade-slide-in ${animationDelay}`}
      aria-label={`Select ${title} - ${description}`}
    >
      <div className="flex items-start space-x-6">
        <div className="text-5xl md:text-6xl flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-float will-change-transform">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {title}
          </h3>
          <p className="text-lg md:text-xl text-foreground-soft leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CaseCategoryCard;
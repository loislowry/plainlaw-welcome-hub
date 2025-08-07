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
      className={`case-card w-full text-left group focus:outline-none focus:ring-2 focus:ring-legal-blue focus:ring-offset-2 animate-fade-slide-in ${animationDelay}`}
      aria-label={`Select ${title} - ${description}`}
    >
      <div className="flex items-start space-x-4">
        <div className="text-3xl md:text-4xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-legal-blue transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm md:text-base text-foreground-soft leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CaseCategoryCard;
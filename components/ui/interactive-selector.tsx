import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export interface SelectorItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

export const InteractiveSelector = ({ items, className }: { items: SelectorItem[]; className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleOptionClick = (index: number) => {
    // Navigate to the member's profile page
    navigate(`/committee/${items[index].id}`);
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    items.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [items.length]);

  if (!items || items.length === 0) return null;

  return (
    <div className={cn("relative flex flex-col items-center justify-center font-sans", className)}>
      {/* Options Container */}
      <div className="options flex w-full h-[450px] items-stretch overflow-hidden relative rounded-2xl shadow-2xl">
        {items.map((option, index) => (
          <div
            key={option.id}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer
              ${activeIndex === index ? 'active flex-[5]' : 'flex-[1]'}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-20px)',
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Dark Overlay Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
            />

            {/* Content */}
            <div className={`relative z-10 p-6 flex flex-col justify-end h-full transition-all duration-500 ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 lg:opacity-100 lg:translate-y-0'}`}>

              <div className="flex items-center gap-4 mb-2">
                <div className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 transition-all duration-500 ${activeIndex === index ? 'scale-100' : 'scale-75'}`}>
                  {option.icon}
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-w-full opacity-100' : 'max-w-0 opacity-0 lg:max-w-full lg:opacity-0'}`}>
                  <h3 className="text-xl font-bold text-white whitespace-nowrap">{option.title}</h3>
                </div>
              </div>

              <div className={`overflow-hidden transition-all duration-700 ${activeIndex === index ? 'max-h-24 opacity-100 delay-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-blue-200 text-sm leading-relaxed max-w-md">
                  {option.description}
                </p>
              </div>
            </div>

            {/* Vertical Title for inactive state on Desktop */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block transition-all duration-500 ${activeIndex === index ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <span className="writing-vertical-lr text-white/80 font-bold tracking-widest text-sm uppercase rotate-180">
                {/* Only show initials or short name if needed, but here we just hide content */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
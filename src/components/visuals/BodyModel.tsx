
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const BodyModel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 100);
    
    const highlightInterval = setInterval(() => {
      const parts = ['head', 'heart', 'lungs', 'spine', null];
      const randomPart = parts[Math.floor(Math.random() * parts.length)];
      setHighlightedPart(randomPart);
    }, 3000);
    
    return () => {
      clearInterval(rotationInterval);
      clearInterval(highlightInterval);
    };
  }, []);

  return (
    <div 
      className={cn(
        "relative h-[500px] w-[300px] mx-auto",
        "transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Glowing base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full bg-radial-glow"></div>
      
      {/* Main body image */}
      <div 
        className="relative w-full h-full flex items-center justify-center animate-float"
        style={{
          perspective: '1000px',
        }}
      >
        <img 
          src="/lovable-uploads/1aa59af9-dcfa-417a-9eae-a9edb6de98a7.png" 
          alt="Human Body Model" 
          className="h-full object-contain relative z-10"
          style={{
            transform: `rotateY(${rotation}deg)`,
            filter: 'drop-shadow(0 0 10px rgba(51, 232, 245, 0.4))',
          }}
        />

        {/* Highlight overlays */}
        {highlightedPart === 'head' && (
          <div className="absolute top-[15%] w-16 h-16 rounded-full bg-med-cyan/20 animate-pulse-glow z-20"></div>
        )}
        {highlightedPart === 'heart' && (
          <div className="absolute top-[30%] left-[45%] w-12 h-12 rounded-full bg-med-purple/20 animate-pulse-glow z-20"></div>
        )}
        {highlightedPart === 'lungs' && (
          <div className="absolute top-[30%] w-32 h-24 rounded-full bg-med-blue/20 animate-pulse-glow z-20"></div>
        )}
        {highlightedPart === 'spine' && (
          <div className="absolute top-[45%] w-8 h-32 bg-med-cyan/20 animate-pulse-glow z-20"></div>
        )}

        {/* Scanning effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-med-cyan/20 to-transparent"
            style={{
              animation: 'scan-move 4s ease-in-out infinite',
            }}
          ></div>
        </div>
      </div>

      {/* Data points */}
      <div className="absolute top-1/4 -left-12 flex flex-col items-start">
        <div className="text-xs text-med-cyan">Height</div>
        <div className="text-sm font-bold text-white">178cm</div>
        <div className="h-px w-16 bg-med-cyan/50 my-1"></div>
      </div>

      <div className="absolute top-1/3 -right-12 flex flex-col items-end">
        <div className="text-xs text-med-cyan">Weight</div>
        <div className="text-sm font-bold text-white">72kg</div>
        <div className="h-px w-16 bg-med-cyan/50 my-1"></div>
      </div>

      <div className="absolute top-2/3 -left-12 flex flex-col items-start">
        <div className="text-xs text-med-cyan">Metabolic Rate</div>
        <div className="text-sm font-bold text-white">1750 kcal</div>
        <div className="h-px w-16 bg-med-cyan/50 my-1"></div>
      </div>

      {/* HUD elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-med-cyan/50"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-med-cyan/50"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-med-cyan/50"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-med-cyan/50"></div>
    </div>
  );
};

export default BodyModel;

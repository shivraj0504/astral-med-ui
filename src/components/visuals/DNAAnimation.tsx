
import { useEffect, useState } from 'react';

const DNAAnimation = () => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 50);
    
    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className="glass-panel p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-med-cyan text-lg font-semibold">DNA Analysis</h3>
        <div className="text-xs text-white/50">Processing...</div>
      </div>
      
      <div className="relative h-48 w-full overflow-hidden flex items-center justify-center">
        {/* DNA Helix */}
        <div 
          className="h-full w-32 relative"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          <img 
            src="/lovable-uploads/76f65291-b048-4259-9afe-90b3a65a0b5d.png" 
            alt="DNA Strand" 
            className="h-full object-contain absolute top-0 left-0 right-0 mx-auto"
            style={{
              filter: 'hue-rotate(190deg) brightness(1.5) drop-shadow(0 0 5px rgba(51, 232, 245, 0.6))',
            }}
          />
        </div>
        
        {/* HUD overlay elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-med-blue/50"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-med-blue/50"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-med-blue/50"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-med-blue/50"></div>
        
        {/* Scanning line */}
        <div 
          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-med-blue to-transparent"
          style={{
            animation: 'scan 3s ease-in-out infinite',
            top: `${Math.sin(Date.now() / 1000) * 40 + 50}%`,
          }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="bg-black/20 p-2 rounded">
          <div className="text-xs text-white/50">Genome Mapping</div>
          <div className="text-sm font-semibold text-med-blue">87% Complete</div>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1">
            <div className="bg-med-blue h-1 rounded-full animate-pulse" style={{ width: '87%' }}></div>
          </div>
        </div>
        <div className="bg-black/20 p-2 rounded">
          <div className="text-xs text-white/50">Health Markers</div>
          <div className="text-sm font-semibold text-med-purple">24 Detected</div>
          <div className="flex gap-1 mt-1">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-med-purple/40 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNAAnimation;

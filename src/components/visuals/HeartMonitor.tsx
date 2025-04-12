
import { useState, useEffect } from 'react';

const HeartMonitor = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [isBeating, setIsBeating] = useState(false);
  
  useEffect(() => {
    const beatInterval = setInterval(() => {
      setIsBeating(true);
      setTimeout(() => setIsBeating(false), 200);
    }, 800);
    
    const rateInterval = setInterval(() => {
      setHeartRate(prevRate => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(65, Math.min(85, prevRate + change));
      });
    }, 2000);
    
    return () => {
      clearInterval(beatInterval);
      clearInterval(rateInterval);
    };
  }, []);

  // ECG path for the heart monitor
  const ecgPath = "M 0,20 L 10,20 L 12,10 L 14,30 L 16,10 L 18,40 L 20,10 L 22,20 L 30,20 L 35,20 L 36,0 L 37,40 L 38,20 L 45,20 L 55,20";

  return (
    <div className="glass-panel p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-med-cyan text-lg font-semibold flex items-center">
          <span className="h-2 w-2 bg-med-cyan rounded-full mr-2 animate-pulse"></span>
          Cardiac Monitor
        </h3>
        <div className="text-xs text-white/50">Real-time</div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div 
          className={`relative flex items-center justify-center w-32 h-32 ${isBeating ? 'animate-heart-beat' : ''}`}
        >
          <img 
            src="/lovable-uploads/691d9b71-ee33-47f1-8fa2-6b987b4366c6.png" 
            alt="Digital Heart" 
            className="h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(51, 232, 245, 0.4))',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-med-cyan/10 to-transparent rounded-full"></div>
        </div>
        
        <div className="flex-1">
          <div className="bg-black/30 rounded-lg p-3 overflow-hidden">
            <div className="relative h-14 w-full">
              {/* Static ECG background lines */}
              <div className="absolute inset-0 grid grid-cols-12 gap-4">
                {Array(12).fill(0).map((_, i) => (
                  <div key={i} className="h-full w-px bg-med-cyan/10"></div>
                ))}
              </div>
              <div className="absolute inset-0 grid grid-rows-5 gap-2">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="w-full h-px bg-med-cyan/10"></div>
                ))}
              </div>
              
              {/* Animated ECG Line */}
              <div className="absolute inset-0 flex">
                <svg 
                  className="h-full w-full" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d={ecgPath} 
                    stroke="#33e8f5" 
                    strokeWidth="1.5" 
                    fill="none" 
                    className="animate-ecg-line"
                  />
                  <path 
                    d={ecgPath} 
                    stroke="#33e8f5" 
                    strokeWidth="1.5" 
                    fill="none"
                    className="animate-ecg-line" 
                    style={{transform: 'translateX(100%)'}}
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-xs text-white/50">BPM</div>
              <div className="text-2xl font-bold text-med-cyan">{heartRate}</div>
            </div>
            <div>
              <div className="text-xs text-white/50">SpO2</div>
              <div className="text-lg font-semibold text-med-purple">98%</div>
            </div>
            <div>
              <div className="text-xs text-white/50">BP</div>
              <div className="text-lg font-semibold text-med-blue">120/80</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartMonitor;

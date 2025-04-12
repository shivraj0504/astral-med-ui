
import { useEffect, useState } from 'react';

type HealthStat = {
  label: string;
  value: number;
  max: number;
  color: string;
};

const HealthStats = () => {
  const [stats, setStats] = useState<HealthStat[]>([
    { label: 'Immunity', value: 78, max: 100, color: 'med-cyan' },
    { label: 'Hydration', value: 65, max: 100, color: 'med-blue' },
    { label: 'Sleep', value: 82, max: 100, color: 'med-purple' },
    { label: 'Activity', value: 45, max: 100, color: 'med-purple' },
  ]);
  
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setAnimated(true), 300);
    
    // Simulate changing stats
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: Math.max(5, Math.min(100, stat.value + (Math.random() * 6 - 3)))
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getCircumference = (radius: number) => 2 * Math.PI * radius;
  
  return (
    <div className="glass-panel p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-med-cyan text-lg font-semibold">Health Metrics</h3>
        <div className="text-xs text-white/50">Updated 2m ago</div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const radius = 43;
          const circumference = getCircumference(radius);
          const strokeDashoffset = circumference - (stat.value / stat.max) * circumference;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="progress-circle">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r={radius} />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r={radius}
                    className={`progress ${animated ? 'animate' : ''} text-${stat.color}`}
                    style={{ 
                      strokeDasharray: circumference,
                      strokeDashoffset: animated ? strokeDashoffset : circumference,
                      transition: 'stroke-dashoffset 2s ease-out'
                    }}
                  />
                  <text 
                    x="50" 
                    y="50" 
                    textAnchor="middle" 
                    dy=".3em" 
                    className={`text-${stat.color} fill-current text-2xl font-bold`}
                  >
                    {Math.round(stat.value)}%
                  </text>
                </svg>
              </div>
              <span className="text-sm text-white/80 mt-2">{stat.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 bg-black/20 p-3 rounded-lg">
        <div className="text-sm text-white/80 mb-1">Overall Health Score</div>
        <div className="flex items-center">
          <div className="text-2xl font-bold text-med-purple mr-2">82</div>
          <div className="text-xs text-med-cyan">+4 from last week</div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
          <div 
            className="bg-gradient-to-r from-med-blue to-med-purple h-1.5 rounded-full" 
            style={{ width: '82%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HealthStats;

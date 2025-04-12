
import Layout from '@/components/layout/Layout';
import BodyModel from '@/components/visuals/BodyModel';
import HeartMonitor from '@/components/visuals/HeartMonitor';
import DNAAnimation from '@/components/visuals/DNAAnimation';
import HealthStats from '@/components/visuals/HealthStats';
import { Activity } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold glow-text-cyan">Medical Dashboard</h1>
          <p className="text-white/70">Advanced health monitoring system</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column for body model */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="glass-panel p-4 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-med-cyan text-lg font-semibold">Body Analysis</h3>
                <div className="text-xs text-white/50 px-2 py-1 bg-white/5 rounded-full">
                  Active Scan
                </div>
              </div>
              <BodyModel />
            </div>
          </div>
          
          {/* Right columns for stats and monitors */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Health stats */}
            <HealthStats />
            
            {/* Middle row: Heart monitor and DNA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HeartMonitor />
              <DNAAnimation />
            </div>
            
            {/* Bottom row: Health timeline */}
            <div className="glass-panel p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-med-cyan text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-med-cyan" />
                  Health Timeline
                </h3>
                <div className="text-xs text-white/50">Last 7 Days</div>
              </div>
              
              <div className="w-full bg-black/30 p-3 rounded-lg">
                <div className="h-40 flex items-end justify-between">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const height = 20 + Math.random() * 80;
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-4/5 bg-gradient-to-t from-med-blue to-med-cyan rounded-t-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-white/50 mt-2">{day}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-med-cyan mr-2"></div>
                  <span className="text-white/70">Physical Activity</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-med-blue mr-2"></div>
                  <span className="text-white/70">Resting Periods</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-med-purple mr-2"></div>
                  <span className="text-white/70">Sleep Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

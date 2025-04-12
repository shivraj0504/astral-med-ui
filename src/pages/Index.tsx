
import Layout from '@/components/layout/Layout';
import BodyModel from '@/components/visuals/BodyModel';
import HeartMonitor from '@/components/visuals/HeartMonitor';
import DNAAnimation from '@/components/visuals/DNAAnimation';
import HealthStats from '@/components/visuals/HealthStats';
import { Activity, AlertTriangle, BellRing, CheckCircle2, CircleAlert, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="p-6">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold glow-text-cyan">Medical Dashboard</h1>
            <p className="text-white/70">Advanced health monitoring system</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-black/30 p-2 rounded-full relative">
              <BellRing className="h-5 w-5 text-med-cyan" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-med-purple rounded-full border border-black"></span>
            </div>
            <div className="glass-panel px-3 py-1 rounded-full flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span className="text-white/80 text-sm">Connected</span>
            </div>
          </div>
        </header>
        
        {/* Alert System */}
        <div className="glass-panel p-3 mb-6 flex items-center justify-between bg-black/40 border-l-4 border-med-purple">
          <div className="flex items-center gap-2">
            <CircleAlert className="h-5 w-5 text-med-purple" />
            <span className="text-white/80">Health AI has detected unusual heart rate patterns during sleep. View detailed analysis.</span>
          </div>
          <button className="bg-med-purple/20 hover:bg-med-purple/30 text-med-purple px-3 py-1 rounded-full text-sm transition-colors">
            Review
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column for body model */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="glass-panel p-4 flex-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-med-cyan text-lg font-semibold">Body Analysis</h3>
                <div className="text-xs text-white/50 px-2 py-1 bg-white/5 rounded-full">
                  Active Scan
                </div>
              </div>
              <BodyModel />
              
              {/* Health score overlay */}
              <div className="absolute top-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm border border-med-cyan/30 rounded-full h-16 w-16 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-med-cyan text-xl font-bold">87</div>
                    <div className="text-white/50 text-xs">Health</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick action cards */}
            <div className="grid grid-cols-2 gap-3">
              <Link to="/ai-doctor" className="glass-panel p-3 hover:bg-white/5 transition-all group">
                <Zap className="h-6 w-6 text-med-cyan mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-medium">AI Doctor</h4>
                <p className="text-white/50 text-xs">Get instant diagnosis</p>
              </Link>
              <Link to="/hospital-booking" className="glass-panel p-3 hover:bg-white/5 transition-all group">
                <CheckCircle2 className="h-6 w-6 text-med-blue mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-medium">Checkup</h4>
                <p className="text-white/50 text-xs">Schedule your visit</p>
              </Link>
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
                          className="w-4/5 bg-gradient-to-t from-med-blue to-med-cyan rounded-t-sm relative overflow-hidden group"
                          style={{ height: `${height}%` }}
                        >
                          {/* Hover info tooltip */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col">
                            <span className="text-med-cyan text-xs font-bold">{Math.floor(height)}%</span>
                            <span className="text-white/70 text-[10px]">Activity</span>
                          </div>
                        </div>
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
              
              {/* Upcoming appointments reminder */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Upcoming Appointment</h4>
                  <Link to="/appointment-booking" className="text-med-cyan text-sm hover:underline">View All</Link>
                </div>
                <div className="mt-2 bg-black/20 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-white">Dr. Sarah Chen - Cardiology</div>
                    <div className="text-white/50 text-sm">Quantum Health Hospital</div>
                    <div className="text-med-cyan text-sm mt-1">Tomorrow, 10:30 AM</div>
                  </div>
                  <div>
                    <button className="bg-med-cyan/10 hover:bg-med-cyan/20 text-med-cyan px-3 py-1 rounded text-sm transition-colors">
                      Reschedule
                    </button>
                  </div>
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

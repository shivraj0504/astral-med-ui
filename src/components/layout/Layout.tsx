
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 pl-16 lg:pl-64 flex flex-col min-h-screen">
        {/* Global header */}
        <header className="glass-panel p-3 m-3 mb-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-med-cyan/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-med-cyan animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-white/80 text-sm font-light">AstralMed System</h3>
              <h4 className="text-white/50 text-xs">Medical Status: <span className="text-med-cyan">Active</span></h4>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="text-white/50 text-xs text-right">System Status</div>
              <div className="flex items-center gap-1 text-med-cyan text-xs">
                <div className="h-1.5 w-1.5 bg-med-cyan rounded-full animate-pulse"></div>
                All Systems Operational
              </div>
            </div>
            <div className="bg-black/20 py-1 px-3 rounded-full text-white/70 text-xs flex items-center gap-2">
              <span className="hidden sm:inline">Last updated:</span>
              <span className="text-med-cyan">Just now</span>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

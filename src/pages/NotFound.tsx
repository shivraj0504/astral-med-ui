
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1221] p-6">
      <div className="glass-panel p-8 max-w-md text-center">
        <div className="h-20 w-20 mx-auto bg-black/30 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-10 w-10 text-med-cyan animate-pulse-glow" />
        </div>
        <h1 className="text-4xl font-bold text-med-cyan mb-2">404</h1>
        <p className="text-xl text-white mb-6">Page Not Found</p>
        <p className="text-white/70 mb-8">The requested medical data could not be located in our database.</p>
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-6 py-3 transition-colors mx-auto w-full max-w-xs"
        >
          <Home className="h-5 w-5" />
          Return to Dashboard
        </Link>
        
        {/* HUD elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-med-cyan/50"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-med-cyan/50"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-med-cyan/50"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-med-cyan/50"></div>
      </div>
    </div>
  );
};

export default NotFound;

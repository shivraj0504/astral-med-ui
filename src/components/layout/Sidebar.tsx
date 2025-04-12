
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Bot, Hospital, Bed, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex flex-col items-center gap-2 p-4 border-b-2 transition-all duration-300",
      isActive ? "nav-item-active" : "nav-item-inactive"
    )}
  >
    <div className="text-2xl">{icon}</div>
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems = [
    { path: '/', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { path: '/ai-doctor', icon: <Bot className="h-5 w-5" />, label: 'AI Doctor' },
    { path: '/hospital-booking', icon: <Hospital className="h-5 w-5" />, label: 'Hospital Booking' },
    { path: '/bed-booking', icon: <Bed className="h-5 w-5" />, label: 'Bed Booking' },
    { path: '/appointment-booking', icon: <Calendar className="h-5 w-5" />, label: 'Appointment' }
  ];

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-screen z-40 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64",
        "bg-black/30 backdrop-blur-md border-r border-white/10"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-med-cyan mr-2 animate-pulse-glow" />
            <h1 className="text-xl font-bold glow-text-cyan">AstralMed</h1>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          {isCollapsed ? (
            <span className="text-white/70">&raquo;</span>
          ) : (
            <span className="text-white/70">&laquo;</span>
          )}
        </button>
      </div>

      <div className="flex flex-col flex-grow">
        {navItems.map((item) => (
          isCollapsed ? (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex justify-center p-4 transition-colors",
                location.pathname === item.path 
                  ? "text-med-cyan" 
                  : "text-white/70 hover:text-white/90"
              )}
            >
              {item.icon}
            </Link>
          ) : (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center gap-4 p-4 transition-colors",
                location.pathname === item.path 
                  ? "text-med-cyan bg-white/5 border-l-2 border-med-cyan" 
                  : "text-white/70 hover:text-white/90 hover:bg-white/5"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        {!isCollapsed && (
          <div className="text-xs text-white/50 flex items-center">
            <div className="h-2 w-2 rounded-full bg-med-cyan mr-2 animate-pulse-glow"></div>
            System Online
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

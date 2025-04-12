
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import AIDoctor from "./pages/AIDoctor";
import HospitalBooking from "./pages/HospitalBooking";
import BedBooking from "./pages/BedBooking";
import AppointmentBooking from "./pages/AppointmentBooking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading on route change
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1221]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-med-cyan/20"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-med-cyan animate-spin"></div>
            </div>
            <div className="mt-4 text-med-cyan font-light">Loading Medical System...</div>
          </div>
        </div>
      )}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/ai-doctor" element={<PageTransition><AIDoctor /></PageTransition>} />
          <Route path="/hospital-booking" element={<PageTransition><HospitalBooking /></PageTransition>} />
          <Route path="/bed-booking" element={<PageTransition><BedBooking /></PageTransition>} />
          <Route path="/appointment-booking" element={<PageTransition><AppointmentBooking /></PageTransition>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

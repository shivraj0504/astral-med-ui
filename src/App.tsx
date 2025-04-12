
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIDoctor from "./pages/AIDoctor";
import HospitalBooking from "./pages/HospitalBooking";
import BedBooking from "./pages/BedBooking";
import AppointmentBooking from "./pages/AppointmentBooking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-doctor" element={<AIDoctor />} />
          <Route path="/hospital-booking" element={<HospitalBooking />} />
          <Route path="/bed-booking" element={<BedBooking />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

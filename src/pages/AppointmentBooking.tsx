
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, Clock, Search, User, X, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Specialist = {
  id: number;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  availableSlots: string[];
  image: string;
};

type TimeSlot = {
  time: string;
  available: boolean;
};

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const specialists: Specialist[] = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      speciality: "Cardiologist",
      experience: "10+ years",
      rating: 4.9,
      availableSlots: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      speciality: "Neurologist",
      experience: "8+ years",
      rating: 4.7,
      availableSlots: ["10:00 AM", "1:00 PM", "3:30 PM"],
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      speciality: "Pediatrician",
      experience: "12+ years",
      rating: 4.8,
      availableSlots: ["9:30 AM", "12:00 PM", "2:30 PM", "5:00 PM"],
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "Dr. David Park",
      speciality: "Dermatologist",
      experience: "7+ years",
      rating: 4.6,
      availableSlots: ["11:00 AM", "1:30 PM", "4:00 PM"],
      image: "https://randomuser.me/api/portraits/men/46.jpg"
    }
  ];

  const filteredSpecialists = specialists.filter(specialist => 
    specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialist.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "09:30 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: false },
    { time: "01:00 PM", available: true },
    { time: "01:30 PM", available: true },
    { time: "02:00 PM", available: false },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: false }
  ];

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };
  
  const handleBookAppointment = () => {
    setIsConfirming(true);
    
    // Simulate booking confirmation
    setTimeout(() => {
      setIsConfirmed(true);
    }, 1500);
  };

  return (
    <Layout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold glow-text-cyan">Appointment Booking</h1>
          <p className="text-white/70">Schedule consultations with specialists</p>
        </header>
        
        {isConfirming ? (
          <div className="glass-panel p-8 max-w-md mx-auto">
            {isConfirmed ? (
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-med-cyan/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-med-cyan" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Appointment Confirmed!</h3>
                <p className="text-white/70 mb-6">
                  Your appointment has been scheduled successfully.
                </p>
                
                <div className="bg-black/30 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <div className="text-xs text-white/50">Doctor</div>
                      <div className="text-sm text-white">{selectedSpecialist?.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Speciality</div>
                      <div className="text-sm text-white">{selectedSpecialist?.speciality}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Date</div>
                      <div className="text-sm text-white">
                        {selectedDate.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Time</div>
                      <div className="text-sm text-white">{selectedTimeSlot}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setIsConfirming(false);
                      setIsConfirmed(false);
                      setSelectedSpecialist(null);
                      setSelectedTimeSlot(null);
                    }}
                    className="w-full bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors"
                  >
                    Book Another Appointment
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = '/';
                    }}
                    className="w-full border border-white/20 text-white/70 rounded-lg px-4 py-2 hover:bg-white/5 transition-colors"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-med-cyan/20 flex items-center justify-center mx-auto mb-4">
                  <div className="h-8 w-8 border-2 border-med-cyan border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Confirming Your Appointment</h3>
                <p className="text-white/70 mb-4">
                  Please wait while we secure your time slot...
                </p>
                
                <div className="bg-black/30 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <div className="text-xs text-white/50">Doctor</div>
                      <div className="text-sm text-white">{selectedSpecialist?.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Speciality</div>
                      <div className="text-sm text-white">{selectedSpecialist?.speciality}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Date</div>
                      <div className="text-sm text-white">
                        {selectedDate.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Time</div>
                      <div className="text-sm text-white">{selectedTimeSlot}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Specialists */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-4">
                <h3 className="text-med-cyan text-lg font-semibold mb-4">Find a Specialist</h3>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="text-sm text-white/70 block mb-1">Specialty</label>
                  <div className="relative">
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                    <select
                      className="w-full appearance-none bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan"
                    >
                      <option value="">All Specialties</option>
                      <option value="cardiologist">Cardiology</option>
                      <option value="neurologist">Neurology</option>
                      <option value="pediatrician">Pediatrics</option>
                      <option value="dermatologist">Dermatology</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6 max-h-[500px] overflow-y-auto hide-scrollbar">
                  {filteredSpecialists.map((specialist) => (
                    <div 
                      key={specialist.id}
                      onClick={() => {
                        setSelectedSpecialist(specialist);
                        setSelectedTimeSlot(null);
                      }}
                      className={cn(
                        "bg-black/30 rounded-lg p-3 cursor-pointer transition-all border",
                        selectedSpecialist?.id === specialist.id
                          ? "border-med-cyan"
                          : "border-white/10 hover:border-white/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-black/50 overflow-hidden">
                          <img 
                            src={specialist.image} 
                            alt={specialist.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{specialist.name}</h4>
                          <div className="text-xs text-med-cyan">{specialist.speciality}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 text-xs">
                        <div className="text-white/70">{specialist.experience} exp.</div>
                        <div className="flex items-center gap-1">
                          <div className="text-med-cyan">{specialist.rating}</div>
                          <div className="text-med-cyan">★</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-white/50">
                        {specialist.availableSlots.length} available slots today
                      </div>
                    </div>
                  ))}
                  
                  {filteredSpecialists.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-white/50">No specialists match your search</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right columns: Calendar and time slots */}
            <div className="lg:col-span-2">
              <div className="glass-panel p-4 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-med-cyan text-lg font-semibold">Select Date & Time</h3>
                  <div className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-full">
                    {selectedDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric'
                    })}
                  </div>
                </div>
                
                {/* Date selection */}
                <div className="flex items-center justify-between mb-6">
                  <button 
                    onClick={() => changeDate(-1)}
                    className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: 7 }).map((_, index) => {
                      const date = new Date();
                      date.setDate(selectedDate.getDate() - 3 + index);
                      const isSelected = date.toDateString() === selectedDate.toDateString();
                      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                      
                      return (
                        <button
                          key={index}
                          disabled={isPast}
                          onClick={() => !isPast && setSelectedDate(date)}
                          className={cn(
                            "h-16 w-12 rounded-lg flex flex-col items-center justify-center transition-all",
                            isSelected 
                              ? "bg-med-cyan text-black" 
                              : isPast
                                ? "bg-black/20 text-white/30" 
                                : "bg-black/30 text-white hover:bg-black/50"
                          )}
                        >
                          <span className="text-xs opacity-80">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className={cn(
                            "text-lg font-semibold",
                            isSelected ? "text-black" : ""
                          )}>
                            {date.getDate()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => changeDate(1)}
                    className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </div>
                
                {/* Time slots */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-med-cyan" />
                    <h4 className="text-white font-semibold">Available Time Slots</h4>
                  </div>
                  
                  {selectedSpecialist ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {selectedSpecialist.availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={cn(
                            "py-2 px-3 rounded text-center transition-colors",
                            selectedTimeSlot === slot
                              ? "bg-med-cyan text-black font-semibold"
                              : "bg-black/30 text-white/80 hover:bg-black/50"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-black/20 rounded-lg p-4 text-center">
                      <div className="text-white/50 mb-2">Please select a specialist first</div>
                      <div className="text-xs text-med-cyan">
                        Choose from the list on the left to view available time slots
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Appointment details */}
              {selectedSpecialist && (
                <div className="glass-panel p-4">
                  <h3 className="text-med-cyan text-lg font-semibold mb-4">Appointment Details</h3>
                  
                  <div className="bg-black/30 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-black/50 overflow-hidden">
                        <img 
                          src={selectedSpecialist.image} 
                          alt={selectedSpecialist.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{selectedSpecialist.name}</h4>
                        <div className="text-med-cyan">{selectedSpecialist.speciality}</div>
                        <div className="text-xs text-white/50 mt-1">
                          {selectedSpecialist.experience} experience • {selectedSpecialist.rating} ★
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-white/50 mb-1">Date</div>
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="h-4 w-4 text-med-cyan" />
                          {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 mb-1">Time</div>
                        <div className="flex items-center gap-2 text-white">
                          <Clock className="h-4 w-4 text-med-cyan" />
                          {selectedTimeSlot || "Not selected"}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm text-white/70 block mb-1">Reason for visit</label>
                    <select className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan">
                      <option value="consultation">General Consultation</option>
                      <option value="follow-up">Follow-up Visit</option>
                      <option value="urgent">Urgent Care</option>
                      <option value="test-results">Review Test Results</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm text-white/70 block mb-1">Additional notes</label>
                    <textarea 
                      rows={3}
                      placeholder="Any additional information for the doctor..."
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan resize-none"
                    ></textarea>
                  </div>
                  
                  <button 
                    onClick={handleBookAppointment}
                    disabled={!selectedTimeSlot}
                    className={cn(
                      "w-full rounded-lg px-4 py-2 font-semibold transition-colors",
                      selectedTimeSlot
                        ? "bg-med-cyan hover:bg-med-cyan/90 text-black"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    )}
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AppointmentBooking;

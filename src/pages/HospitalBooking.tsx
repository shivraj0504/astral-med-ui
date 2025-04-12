
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { MapPin, Search, Star, Calendar, ChevronDown, Building2, Clock, Check, User, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

type Hospital = {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  distance: string;
  image: string;
  doctors: number;
  schedule: {
    day: string;
    open: string;
    close: string;
  }[];
  features: string[];
};

const HospitalBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rotateMap, setRotateMap] = useState(0);

  useEffect(() => {
    // Create rotation effect for the map
    const interval = setInterval(() => {
      setRotateMap(prev => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "Astral Medical Center",
      location: "123 Healthcare Blvd, Techville",
      specialties: ["Cardiology", "Neurology", "Oncology"],
      rating: 4.8,
      distance: "2.4 miles",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop",
      doctors: 42,
      schedule: [
        { day: "Monday-Friday", open: "7:00 AM", close: "8:00 PM" },
        { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
        { day: "Sunday", open: "9:00 AM", close: "2:00 PM" }
      ],
      features: ["Emergency Care", "Parking", "Wheelchair Access", "Lab Services"]
    },
    {
      id: 2,
      name: "Quantum Health Hospital",
      location: "456 Medical Drive, Innovation City",
      specialties: ["Orthopedics", "Pediatrics", "General Medicine"],
      rating: 4.5,
      distance: "3.7 miles",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
      doctors: 36,
      schedule: [
        { day: "Monday-Friday", open: "8:00 AM", close: "9:00 PM" },
        { day: "Saturday", open: "8:00 AM", close: "5:00 PM" },
        { day: "Sunday", open: "10:00 AM", close: "3:00 PM" }
      ],
      features: ["24/7 Emergency", "Cafeteria", "Pharmacy", "MRI Services"]
    },
    {
      id: 3,
      name: "Nexus Healthcare",
      location: "789 Healing Road, New Future",
      specialties: ["Dermatology", "Ophthalmology", "Psychiatry"],
      rating: 4.7,
      distance: "1.2 miles",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop",
      doctors: 28,
      schedule: [
        { day: "Monday-Friday", open: "7:30 AM", close: "7:30 PM" },
        { day: "Saturday", open: "9:00 AM", close: "4:00 PM" },
        { day: "Sunday", open: "Closed", close: "Closed" }
      ],
      features: ["Modern Equipment", "Telemedicine", "Insurance Acceptance", "Free WiFi"]
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const availableTimes = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
  ];

  const handleBookingSubmit = () => {
    if (!selectedHospital || !selectedTime) return;
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold">Appointment Confirmed!</span>
        <span className="text-sm">Your appointment has been booked at {selectedHospital.name} for {selectedDate?.toDateString()} at {selectedTime}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold glow-text-cyan">Hospital Booking</h1>
          <p className="text-white/70">Find and book hospitals near you</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and filters */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-4 mb-6">
              <h3 className="text-med-cyan text-lg font-semibold mb-4">Find Hospital</h3>
              
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
                <label className="text-sm text-white/70 block mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Your location"
                    defaultValue="Current Location"
                    className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm text-white/70 block mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="date"
                    className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm text-white/70 block mb-1">Specialty</label>
                <div className="relative">
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <select
                    className="w-full appearance-none bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan"
                  >
                    <option value="">All Specialties</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                </div>
              </div>
              
              <button className="w-full bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors">
                Search Hospitals
              </button>
            </div>
            
            {/* 3D Map preview */}
            <div className="glass-panel p-4 h-80 relative overflow-hidden">
              <h3 className="text-med-cyan text-lg font-semibold mb-2">3D Map View</h3>
              
              <div className="absolute inset-0 pt-10 pb-4 px-4 flex items-center justify-center">
                <div 
                  className="w-full h-full relative"
                  style={{
                    perspective: '800px',
                  }}
                >
                  {/* Base map */}
                  <div 
                    className="w-full h-full bg-black/30 rounded-lg border border-med-cyan/20 overflow-hidden relative"
                    style={{
                      transform: `rotateX(45deg) rotateZ(${rotateMap}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Grid lines */}
                    <div className="absolute inset-0" style={{ 
                      backgroundImage: 'linear-gradient(0deg, rgba(51, 232, 245, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 232, 245, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}></div>
                    
                    {/* Hospital markers */}
                    {hospitals.map((hospital, index) => {
                      const x = 20 + (index * 25);
                      const y = 30 + (index * 15);
                      return (
                        <div 
                          key={hospital.id}
                          className={`absolute w-4 h-4 rounded-full ${selectedHospital?.id === hospital.id ? 'bg-med-purple' : 'bg-med-cyan'}`}
                          style={{ 
                            left: `${x}%`, 
                            top: `${y}%`,
                            boxShadow: `0 0 10px ${selectedHospital?.id === hospital.id ? '#9b87f5' : '#33e8f5'}`,
                          }}
                        >
                          <div className="animate-ping absolute inset-0 rounded-full bg-med-cyan/40"></div>
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap">
                            {hospital.name.split(' ')[0]}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* User location */}
                    <div 
                      className="absolute w-4 h-4 rounded-full bg-med-purple"
                      style={{ left: '50%', top: '50%', boxShadow: '0 0 15px #9b87f5' }}
                    >
                      <div className="animate-ping absolute inset-0 rounded-full bg-med-purple/40"></div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white">You</div>
                    </div>
                    
                    {/* Roads */}
                    <div className="absolute inset-0">
                      <div className="absolute h-1 bg-med-cyan/30 w-3/4 left-[12.5%] top-1/2 transform -translate-y-1/2"></div>
                      <div className="absolute w-1 bg-med-cyan/30 h-3/4 top-[12.5%] left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* HUD overlay elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-med-cyan/40"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-med-cyan/40"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-med-cyan/40"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-med-cyan/40"></div>
            </div>
          </div>
          
          {/* Hospital listings and details */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-med-cyan text-lg font-semibold">Available Hospitals</h3>
                <div className="text-xs text-white/50 px-2 py-1 bg-white/5 rounded-full">
                  {filteredHospitals.length} Found
                </div>
              </div>
              
              {filteredHospitals.length > 0 ? (
                <div className="space-y-4">
                  {filteredHospitals.map((hospital) => (
                    <div 
                      key={hospital.id}
                      onClick={() => setSelectedHospital(hospital)}
                      className={cn(
                        "bg-black/30 rounded-lg p-4 cursor-pointer transition-all overflow-hidden relative",
                        selectedHospital?.id === hospital.id 
                          ? "border-2 border-med-cyan" 
                          : "border border-white/10 hover:border-white/30"
                      )}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Hospital image - with pseudo 3D effect on hover */}
                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden relative group">
                          <div 
                            className="absolute inset-0 bg-center bg-cover transform group-hover:scale-110 transition-transform"
                            style={{backgroundImage: `url(${hospital.image})`}}
                          ></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                            <Building2 className="h-3 w-3 text-med-cyan" />
                            <span className="text-xs text-white">{hospital.doctors} Doctors</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-semibold text-lg">{hospital.name}</h4>
                              <div className="flex items-center gap-1 text-xs text-white/50 mt-1">
                                <MapPin className="h-3 w-3" />
                                {hospital.location}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded">
                              <Star className="h-3 w-3 text-med-cyan" />
                              <span className="text-sm text-white">{hospital.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {hospital.specialties.map((specialty, index) => (
                              <span 
                                key={index} 
                                className="text-xs bg-white/10 px-2 py-1 rounded text-white/80"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                          
                          {/* Working hours - shown when selected */}
                          {selectedHospital?.id === hospital.id && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 bg-black/20 p-2 rounded-lg">
                              {hospital.schedule.map((schedule, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-med-blue" />
                                  <span className="text-xs text-white/70">
                                    {schedule.day}: <span className="text-white">{schedule.open} - {schedule.close}</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-med-cyan"></div>
                              <span className="text-xs text-white/70">Available Today</span>
                            </div>
                            <span className="text-xs text-med-blue">{hospital.distance} away</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Features list - shown when selected */}
                      {selectedHospital?.id === hospital.id && (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="text-sm text-white/70 mb-2">Hospital Features</div>
                          <div className="flex flex-wrap gap-2">
                            {hospital.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded">
                                <Check className="h-3 w-3 text-med-cyan" />
                                <span className="text-xs text-white">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-white/50 mb-2">No hospitals match your search criteria</div>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-med-cyan text-sm hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
            
            {selectedHospital && (
              <div className="glass-panel p-4">
                <h3 className="text-med-cyan text-lg font-semibold mb-4">Book an Appointment</h3>
                
                <div className="bg-black/20 p-4 rounded-lg mb-4">
                  <div className="text-white font-semibold mb-1">{selectedHospital.name}</div>
                  <div className="text-sm text-white/70">{selectedHospital.location}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-sm text-white/70 block mb-1">Select Date</label>
                      <input
                        type="date"
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/70 block mb-1">Department</label>
                      <select className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan">
                        {selectedHospital.specialties.map((specialty, idx) => (
                          <option key={idx} value={specialty.toLowerCase()}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm text-white/70 block mb-2">Available Time Slots</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {availableTimes.map((time, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "text-center py-2 px-1 rounded border text-sm cursor-pointer transition-colors",
                            selectedTime === time 
                              ? "bg-med-cyan/20 border-med-cyan text-white" 
                              : "border-white/10 text-white/70 hover:border-white/30"
                          )}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <label className="text-sm text-white/70 block mb-2">Patient Information</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <input 
                          type="text" 
                          placeholder="Full Name"
                          className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <input 
                          type="text" 
                          placeholder="Phone Number"
                          className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                        />
                      </div>
                      <div className="relative md:col-span-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <input 
                          type="email" 
                          placeholder="Email Address"
                          className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={handleBookingSubmit}
                    className="flex-1 bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors"
                  >
                    Confirm Booking
                  </button>
                  <button 
                    onClick={() => setSelectedHospital(null)}
                    className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HospitalBooking;

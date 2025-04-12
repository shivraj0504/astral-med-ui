
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { MapPin, Search, Star, Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Hospital = {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  distance: string;
};

const HospitalBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "Astral Medical Center",
      location: "123 Healthcare Blvd, Techville",
      specialties: ["Cardiology", "Neurology", "Oncology"],
      rating: 4.8,
      distance: "2.4 miles"
    },
    {
      id: 2,
      name: "Quantum Health Hospital",
      location: "456 Medical Drive, Innovation City",
      specialties: ["Orthopedics", "Pediatrics", "General Medicine"],
      rating: 4.5,
      distance: "3.7 miles"
    },
    {
      id: 3,
      name: "Nexus Healthcare",
      location: "789 Healing Road, New Future",
      specialties: ["Dermatology", "Ophthalmology", "Psychiatry"],
      rating: 4.7,
      distance: "1.2 miles"
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            
            {/* Map preview (mock) */}
            <div className="glass-panel p-4 h-64 relative overflow-hidden">
              <h3 className="text-med-cyan text-lg font-semibold mb-2">Map View</h3>
              
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                {/* This would be replaced by an actual map component */}
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-med-cyan mx-auto mb-2" />
                  <p className="text-white/70 text-sm">Map visualization would appear here</p>
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
                        "bg-black/30 rounded-lg p-4 cursor-pointer transition-all",
                        selectedHospital?.id === hospital.id 
                          ? "border-2 border-med-cyan" 
                          : "border border-white/10 hover:border-white/30"
                      )}
                    >
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
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-med-cyan"></div>
                          <span className="text-xs text-white/70">Available Today</span>
                        </div>
                        <span className="text-xs text-med-blue">{hospital.distance} away</span>
                      </div>
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
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/70 block mb-1">Select Time</label>
                      <select className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan">
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors">
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

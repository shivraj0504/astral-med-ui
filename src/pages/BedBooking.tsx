
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Bed, Filter, ChevronDown, MapPin, Search, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type HospitalBed = {
  id: number;
  hospitalName: string;
  location: string;
  bedsAvailable: number;
  totalBeds: number;
  bedTypes: {
    name: string;
    available: number;
    total: number;
  }[];
  distance: string;
  lastUpdated: string;
};

const BedBooking = () => {
  const [selectedBedType, setSelectedBedType] = useState<string>('All');
  const [selectedHospital, setSelectedHospital] = useState<HospitalBed | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const hospitals: HospitalBed[] = [
    {
      id: 1,
      hospitalName: "Astral Medical Center",
      location: "123 Healthcare Blvd, Techville",
      bedsAvailable: 12,
      totalBeds: 50,
      bedTypes: [
        { name: "General", available: 5, total: 20 },
        { name: "ICU", available: 2, total: 10 },
        { name: "Emergency", available: 3, total: 10 },
        { name: "Pediatric", available: 2, total: 10 }
      ],
      distance: "2.4 miles",
      lastUpdated: "5 minutes ago"
    },
    {
      id: 2,
      hospitalName: "Quantum Health Hospital",
      location: "456 Medical Drive, Innovation City",
      bedsAvailable: 8,
      totalBeds: 40,
      bedTypes: [
        { name: "General", available: 4, total: 20 },
        { name: "ICU", available: 1, total: 8 },
        { name: "Emergency", available: 2, total: 8 },
        { name: "Pediatric", available: 1, total: 4 }
      ],
      distance: "3.7 miles",
      lastUpdated: "10 minutes ago"
    },
    {
      id: 3,
      hospitalName: "Nexus Healthcare",
      location: "789 Healing Road, New Future",
      bedsAvailable: 15,
      totalBeds: 60,
      bedTypes: [
        { name: "General", available: 8, total: 30 },
        { name: "ICU", available: 3, total: 12 },
        { name: "Emergency", available: 2, total: 10 },
        { name: "Pediatric", available: 2, total: 8 }
      ],
      distance: "1.2 miles",
      lastUpdated: "2 minutes ago"
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const nameMatch = hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedBedType === 'All') {
      return nameMatch;
    }
    return nameMatch && hospital.bedTypes.some(bed => 
      bed.name === selectedBedType && bed.available > 0
    );
  });

  const bedTypes = ["All", "General", "ICU", "Emergency", "Pediatric"];

  return (
    <Layout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold glow-text-cyan">Bed Booking</h1>
          <p className="text-white/70">Real-time hospital bed availability</p>
        </header>
        
        {/* Stats overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          {[
            { label: "Total Beds", value: "150", icon: <Bed className="h-5 w-5 text-med-cyan" /> },
            { label: "Available", value: "35", icon: <Bed className="h-5 w-5 text-med-blue" /> },
            { label: "ICU Beds", value: "6", icon: <Bed className="h-5 w-5 text-med-purple" /> },
            { label: "Emergency", value: "7", icon: <Bed className="h-5 w-5 text-[#ff6b6b]" /> }
          ].map((stat, index) => (
            <div key={index} className="glass-panel p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                  <div className="text-white text-xl font-bold">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and filters */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-4">
              <h3 className="text-med-cyan text-lg font-semibold mb-4">Find Available Beds</h3>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search hospitals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                />
              </div>
              
              <div className="mb-4">
                <label className="text-sm text-white/70 block mb-1">Bed Type</label>
                <div className="flex flex-wrap gap-2">
                  {bedTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedBedType(type)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm transition-colors",
                        selectedBedType === type
                          ? "bg-med-cyan text-black font-semibold"
                          : "bg-black/30 text-white/70 border border-white/10 hover:bg-black/50"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
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
                <label className="text-sm text-white/70 block mb-1">Distance</label>
                <div className="relative">
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <select
                    className="w-full appearance-none bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan"
                  >
                    <option value="5">Within 5 miles</option>
                    <option value="10">Within 10 miles</option>
                    <option value="20">Within 20 miles</option>
                    <option value="50">Within 50 miles</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center text-white/70 text-xs mt-4 mb-4 gap-2">
                <Clock className="h-3 w-3" />
                <span>Data updated in real-time</span>
              </div>
              
              <button className="w-full bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors flex items-center justify-center gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Hospital bed listings */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-med-cyan text-lg font-semibold">Available Hospital Beds</h3>
                <div className="text-xs text-white/50 px-2 py-1 bg-white/5 rounded-full">
                  {filteredHospitals.length} Hospitals
                </div>
              </div>
              
              {filteredHospitals.length > 0 ? (
                <div className="space-y-4">
                  {filteredHospitals.map((hospital) => (
                    <div 
                      key={hospital.id}
                      className={cn(
                        "bg-black/30 rounded-lg p-4 border cursor-pointer transition-all",
                        selectedHospital?.id === hospital.id
                          ? "border-med-cyan"
                          : "border-white/10 hover:border-white/30"
                      )}
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-semibold">{hospital.hospitalName}</h4>
                          <div className="flex items-center gap-1 text-xs text-white/50 mt-1">
                            <MapPin className="h-3 w-3" />
                            {hospital.location}
                          </div>
                        </div>
                        <div className="bg-black/40 py-1 px-3 rounded-full">
                          <span className="text-med-cyan font-medium">
                            {hospital.bedsAvailable} <span className="text-white/70">/ {hospital.totalBeds} beds</span>
                          </span>
                        </div>
                      </div>
                      
                      {/* Bed type availability */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {hospital.bedTypes.map((bed, index) => (
                          <div key={index} className="bg-black/20 p-2 rounded">
                            <div className="text-xs text-white/70">{bed.name}</div>
                            <div className="flex items-center gap-1">
                              <div className={cn(
                                "h-2 w-2 rounded-full",
                                bed.available > 0 ? "bg-med-cyan" : "bg-red-500"
                              )}></div>
                              <div className="text-sm font-medium text-white">
                                {bed.available} <span className="text-white/50">/ {bed.total}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 text-xs">
                        <div className="flex items-center gap-1 text-white/50">
                          <Clock className="h-3 w-3" />
                          <span>Updated {hospital.lastUpdated}</span>
                        </div>
                        <div className="text-med-blue">{hospital.distance} away</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-white/50 mb-2">No beds match your search criteria</div>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBedType('All');
                    }}
                    className="text-med-cyan text-sm hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
            
            {selectedHospital && (
              <div className="glass-panel p-4 mt-6">
                <h3 className="text-med-cyan text-lg font-semibold mb-4">Book a Bed</h3>
                
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="text-white font-semibold mb-1">{selectedHospital.hospitalName}</div>
                  <div className="text-sm text-white/70 mb-4">{selectedHospital.location}</div>
                  
                  <div className="mb-4">
                    <label className="text-sm text-white/70 block mb-1">Select Bed Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedHospital.bedTypes.filter(bed => bed.available > 0).map((bed, index) => (
                        <div 
                          key={index} 
                          className="border border-white/10 rounded-lg p-3 text-center cursor-pointer hover:border-med-cyan hover:bg-black/40 transition-colors"
                        >
                          <div className="text-white">{bed.name}</div>
                          <div className="text-sm text-med-cyan mt-1">{bed.available} available</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm text-white/70 block mb-1">Patient Details</label>
                    <input 
                      type="text" 
                      placeholder="Patient Name"
                      className="w-full mb-2 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Age"
                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                      />
                      <select
                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-med-cyan"
                      >
                        <option value="" disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors">
                    Request Bed
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

export default BedBooking;

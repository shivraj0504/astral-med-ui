
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Bed, Filter, ChevronDown, MapPin, Search, Clock, Activity, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

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
    color: string;
  }[];
  distance: string;
  lastUpdated: string;
  floors: {
    name: string;
    map: {x: number, y: number, type: string, available: boolean}[]
  }[];
};

const BedBooking = () => {
  const [selectedBedType, setSelectedBedType] = useState<string>('All');
  const [selectedHospital, setSelectedHospital] = useState<HospitalBed | null>(null);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [selectedBed, setSelectedBed] = useState<{x: number, y: number, type: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rotationAngle, setRotationAngle] = useState(0);
  
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(rotationInterval);
  }, []);

  const hospitals: HospitalBed[] = [
    {
      id: 1,
      hospitalName: "Astral Medical Center",
      location: "123 Healthcare Blvd, Techville",
      bedsAvailable: 12,
      totalBeds: 50,
      bedTypes: [
        { name: "General", available: 5, total: 20, color: "#1EAEDB" },
        { name: "ICU", available: 2, total: 10, color: "#9b87f5" },
        { name: "Emergency", available: 3, total: 10, color: "#ff6b6b" },
        { name: "Pediatric", available: 2, total: 10, color: "#33e8f5" }
      ],
      distance: "2.4 miles",
      lastUpdated: "5 minutes ago",
      floors: [
        {
          name: "Ground Floor",
          map: [
            {x: 1, y: 0, type: "General", available: true},
            {x: 1, y: 1, type: "General", available: false},
            {x: 1, y: 2, type: "General", available: true},
            {x: 2, y: 0, type: "ICU", available: false},
            {x: 2, y: 1, type: "ICU", available: true},
            {x: 2, y: 2, type: "Emergency", available: true}
          ]
        },
        {
          name: "First Floor",
          map: [
            {x: 0, y: 0, type: "Pediatric", available: true},
            {x: 0, y: 1, type: "Pediatric", available: true},
            {x: 1, y: 0, type: "General", available: false},
            {x: 1, y: 1, type: "General", available: true},
            {x: 2, y: 0, type: "General", available: true},
            {x: 2, y: 1, type: "ICU", available: false}
          ]
        }
      ]
    },
    {
      id: 2,
      hospitalName: "Quantum Health Hospital",
      location: "456 Medical Drive, Innovation City",
      bedsAvailable: 8,
      totalBeds: 40,
      bedTypes: [
        { name: "General", available: 4, total: 20, color: "#1EAEDB" },
        { name: "ICU", available: 1, total: 8, color: "#9b87f5" },
        { name: "Emergency", available: 2, total: 8, color: "#ff6b6b" },
        { name: "Pediatric", available: 1, total: 4, color: "#33e8f5" }
      ],
      distance: "3.7 miles",
      lastUpdated: "10 minutes ago",
      floors: [
        {
          name: "Ground Floor",
          map: [
            {x: 0, y: 0, type: "General", available: true},
            {x: 0, y: 1, type: "General", available: false},
            {x: 1, y: 0, type: "ICU", available: false},
            {x: 1, y: 1, type: "Emergency", available: true},
            {x: 2, y: 0, type: "Emergency", available: true},
            {x: 2, y: 1, type: "General", available: true}
          ]
        },
        {
          name: "First Floor",
          map: [
            {x: 0, y: 0, type: "Pediatric", available: true},
            {x: 0, y: 1, type: "General", available: true},
            {x: 1, y: 0, type: "General", available: false},
            {x: 1, y: 1, type: "ICU", available: true},
            {x: 2, y: 0, type: "General", available: true}
          ]
        }
      ]
    },
    {
      id: 3,
      hospitalName: "Nexus Healthcare",
      location: "789 Healing Road, New Future",
      bedsAvailable: 15,
      totalBeds: 60,
      bedTypes: [
        { name: "General", available: 8, total: 30, color: "#1EAEDB" },
        { name: "ICU", available: 3, total: 12, color: "#9b87f5" },
        { name: "Emergency", available: 2, total: 10, color: "#ff6b6b" },
        { name: "Pediatric", available: 2, total: 8, color: "#33e8f5" }
      ],
      distance: "1.2 miles",
      lastUpdated: "2 minutes ago",
      floors: [
        {
          name: "Ground Floor",
          map: [
            {x: 0, y: 0, type: "General", available: true},
            {x: 0, y: 1, type: "General", available: true},
            {x: 0, y: 2, type: "General", available: false},
            {x: 1, y: 0, type: "ICU", available: true},
            {x: 1, y: 1, type: "ICU", available: true},
            {x: 1, y: 2, type: "ICU", available: false},
            {x: 2, y: 0, type: "Emergency", available: true},
            {x: 2, y: 1, type: "Emergency", available: true},
            {x: 2, y: 2, type: "Pediatric", available: true}
          ]
        },
        {
          name: "First Floor",
          map: [
            {x: 0, y: 0, type: "General", available: true},
            {x: 0, y: 1, type: "General", available: true},
            {x: 0, y: 2, type: "General", available: true},
            {x: 1, y: 0, type: "General", available: false},
            {x: 1, y: 1, type: "General", available: true},
            {x: 2, y: 0, type: "Pediatric", available: true}
          ]
        }
      ]
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

  const bedTypeColors: Record<string, string> = {
    "General": "#1EAEDB",
    "ICU": "#9b87f5",
    "Emergency": "#ff6b6b",
    "Pediatric": "#33e8f5",
  };

  const getBedColor = (type: string, available: boolean) => {
    const baseColor = bedTypeColors[type] || "#cccccc";
    return available ? baseColor : "#444444";
  };

  const handleBedRequest = () => {
    if (!selectedHospital || !selectedBed) return;
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold">Bed Reserved!</span>
        <span className="text-sm">A {selectedBed.type} bed has been reserved at {selectedHospital.hospitalName}.</span>
      </div>
    );
  };

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
            <div key={index} className="glass-panel p-4 relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                  <div className="text-white text-xl font-bold">{stat.value}</div>
                </div>
              </div>
              
              {/* 3D background effect */}
              <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-radial-glow opacity-60"></div>
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
                        "px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1",
                        selectedBedType === type
                          ? "bg-med-cyan text-black font-semibold"
                          : "bg-black/30 text-white/70 border border-white/10 hover:bg-black/50"
                      )}
                    >
                      {type !== 'All' && (
                        <div 
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: bedTypeColors[type] || 'white' }}
                        ></div>
                      )}
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
                <Activity className="h-3 w-3 text-med-cyan" />
                <span className="text-white/80">Live bed availability updates</span>
              </div>
              
              <button className="w-full bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors flex items-center justify-center gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
              </button>
            </div>
            
            {/* Bed availability overview */}
            {!selectedHospital && (
              <div className="glass-panel p-4 mt-6">
                <h3 className="text-med-cyan text-lg font-semibold mb-3">Bed Availability Overview</h3>
                
                <div className="relative h-64 w-full overflow-hidden">
                  {/* 3D bed availability chart */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      perspective: '800px',
                    }}
                  >
                    <div
                      style={{
                        transform: `rotateY(${rotationAngle}deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                      className="relative h-40 w-40"
                    >
                      {/* Circular platform */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-black/30 border border-med-cyan/20"></div>
                      
                      {/* 3D Bed representations */}
                      {bedTypes.filter(type => type !== 'All').map((type, i) => {
                        const angle = (i * 120) % 360;
                        const x = Math.cos((angle * Math.PI) / 180) * 18;
                        const z = Math.sin((angle * Math.PI) / 180) * 18;
                        const color = bedTypeColors[type];
                        
                        return (
                          <div
                            key={type}
                            className="absolute top-1/2 left-1/2"
                            style={{
                              transform: `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px)`,
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            {/* Bed icon */}
                            <div 
                              className="h-16 w-16 flex items-center justify-center"
                              style={{
                                transform: 'rotateY(180deg)',
                                color: color,
                              }}
                            >
                              <Bed className="h-8 w-8" style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
                              <div className="absolute -bottom-6 text-xs text-white whitespace-nowrap">{type}</div>
                              <div className="absolute -top-6 text-xs text-white/80">
                                {hospitals.reduce((sum, h) => {
                                  const bedType = h.bedTypes.find(b => b.name === type);
                                  return sum + (bedType?.available || 0);
                                }, 0)} available
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-around mt-2 text-xs">
                  {bedTypes.filter(type => type !== 'All').map((type) => (
                    <div key={type} className="flex items-center">
                      <div 
                        className="h-2 w-2 rounded-full mr-1"
                        style={{ backgroundColor: bedTypeColors[type] }}
                      ></div>
                      <span className="text-white/70">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                      
                      {/* Bed type availability with 3D-like progress bars */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {hospital.bedTypes.map((bed, index) => {
                          const availablePercent = (bed.available / bed.total) * 100;
                          return (
                            <div key={index} className="bg-black/20 p-2 rounded relative overflow-hidden">
                              {/* Progress bar background with 3D effect */}
                              <div 
                                className="absolute bottom-0 left-0 h-1 w-full bg-white/10"
                                style={{
                                  backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                                }}
                              ></div>
                              {/* Colored progress bar */}
                              <div 
                                className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-in-out"
                                style={{
                                  width: `${availablePercent}%`,
                                  backgroundColor: bed.color,
                                  boxShadow: `0 0 10px ${bed.color}`,
                                }}
                              ></div>
                              
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
                          );
                        })}
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
                <h3 className="text-med-cyan text-lg font-semibold mb-2">Hospital Floor Plan - {selectedHospital.hospitalName}</h3>
                
                {/* Floor selector */}
                <div className="flex gap-2 mb-4">
                  {selectedHospital.floors.map((floor, idx) => (
                    <button
                      key={idx}
                      className={cn(
                        "px-3 py-1 text-sm rounded transition-colors",
                        selectedFloor === idx
                          ? "bg-med-cyan text-black"
                          : "bg-black/30 text-white/70 hover:bg-black/50"
                      )}
                      onClick={() => setSelectedFloor(idx)}
                    >
                      {floor.name}
                    </button>
                  ))}
                </div>
                
                {/* 3D Floor map */}
                <div className="bg-black/20 rounded-lg p-4 h-80 relative">
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      perspective: '800px',
                    }}
                  >
                    <div
                      style={{
                        transform: `rotateX(60deg) rotateZ(0deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                      className="relative grid grid-cols-3 gap-4 max-w-md mx-auto"
                    >
                      {/* Grid overlay */}
                      <div className="absolute inset-0 border border-med-cyan/30 rounded"></div>
                      
                      {/* Beds */}
                      {selectedHospital.floors[selectedFloor]?.map?.map((bed, idx) => {
                        const bedColor = getBedColor(bed.type, bed.available);
                        return (
                          <div
                            key={idx}
                            onClick={() => bed.available ? setSelectedBed(bed) : null}
                            className={cn(
                              "h-20 w-20 rounded border-2 flex items-center justify-center relative cursor-pointer transition-transform",
                              bed.available ? "hover:scale-105" : "opacity-50 cursor-not-allowed",
                              selectedBed?.x === bed.x && selectedBed?.y === bed.y && bed.available
                                ? "border-white scale-105" 
                                : "border-transparent"
                            )}
                            style={{
                              gridColumn: bed.x + 1, // +1 because grid is 1-indexed
                              gridRow: bed.y + 1,
                            }}
                          >
                            <div className="absolute inset-0 rounded bg-black/30"></div>
                            <Bed 
                              className="h-10 w-10 z-10 relative" 
                              style={{
                                color: bedColor,
                                filter: bed.available ? `drop-shadow(0 0 5px ${bedColor})` : 'none',
                              }}
                            />
                            <div className="absolute bottom-1 left-0 right-0 text-center text-xs text-white/80">
                              {bed.type}
                            </div>
                            
                            {/* Status indicator */}
                            <div 
                              className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
                              style={{
                                backgroundColor: bed.available ? '#4CAF50' : '#F44336',
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-x-3 gap-y-1 bg-black/40 p-2 rounded text-xs">
                    {bedTypes.filter(t => t !== 'All').map(type => (
                      <div key={type} className="flex items-center gap-1">
                        <div 
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: bedTypeColors[type] }}
                        ></div>
                        <span className="text-white/80">{type}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1 ml-auto">
                      <div className="h-2 w-2 rounded-full bg-[#4CAF50]"></div>
                      <span className="text-white/80">Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-[#F44336]"></div>
                      <span className="text-white/80">Occupied</span>
                    </div>
                  </div>
                </div>
                
                {selectedBed && (
                  <div className="mt-4 bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-white font-medium">Reserve Selected Bed</h4>
                      <div className="text-med-cyan text-sm">{selectedBed.type} Bed</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <input 
                          type="text" 
                          placeholder="Patient Name"
                          className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <input 
                          type="text" 
                          placeholder="Contact Number"
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
                    
                    <div className="flex gap-3 mt-4">
                      <button 
                        onClick={handleBedRequest}
                        className="flex-1 bg-med-cyan hover:bg-med-cyan/90 text-black font-semibold rounded-lg px-4 py-2 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Request Bed
                      </button>
                      <button 
                        onClick={() => setSelectedBed(null)}
                        className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:bg-white/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BedBooking;

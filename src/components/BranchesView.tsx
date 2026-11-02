import React, { useState } from 'react';
import { BranchId, BranchInfo } from '../types';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  ShieldCheck, 
  Car, 
  UtensilsCrossed, 
  Truck, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface BranchesViewProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  onSelectBranch: (branchId: BranchId) => void;
  onNavigate: (page: 'home' | 'menu' | 'reservations' | 'branches' | 'about' | 'track' | 'portal') => void;
}

export const BranchesView: React.FC<BranchesViewProps> = ({
  currentBranch,
  branches,
  onSelectBranch,
  onNavigate
}) => {
  const [zoneSearch, setZoneSearch] = useState('');

  // Delivery zones lookup across both branches
  const pechsZones = branches['UTG-KHI-001'].deliveryZones;
  const gulshanZones = branches['UTG-KHI-002'].deliveryZones;

  const filteredPechsZones = pechsZones.filter(z => 
    z.toLowerCase().includes(zoneSearch.toLowerCase())
  );
  const filteredGulshanZones = gulshanZones.filter(z => 
    z.toLowerCase().includes(zoneSearch.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
          Karachi Operational Network
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          Our Flagship Branches &amp; Seating Sanctuaries
        </h1>
        <p className="text-stone-300 text-sm leading-relaxed">
          Operating 24 hours a day, 7 days a week. With 42 dining tables and 184 total seating capacity across PECHS and Gulshan-e-Iqbal, plus rapid dispatch delivery covering greater Karachi.
        </p>
      </div>

      {/* Side by side branch cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PECHS Branch */}
        <div className={`bg-stone-900 border rounded-3xl p-6 sm:p-8 space-y-6 transition-all ${
          currentBranch === 'UTG-KHI-001' ? 'border-amber-500/80 ring-1 ring-amber-500/30' : 'border-stone-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">UTG-KHI-001</span>
                {currentBranch === 'UTG-KHI-001' && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold">
                    Currently Selected
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                PECHS Flagship Branch
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Main Shahrah-e-Faisal, Block 2, PECHS, Karachi
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-2xl font-mono font-bold text-amber-400">18 Tables</span>
              <p className="text-[11px] text-stone-400 font-mono">72 Total Seats</p>
            </div>
          </div>

          {/* Seating Breakdown */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
            <span className="text-xs text-stone-400 font-medium block">Table Configuration:</span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-bold text-white text-sm">6 Tables</p>
                <p className="text-[10px] text-stone-400">2-Person Seating</p>
              </div>
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-bold text-white text-sm">8 Tables</p>
                <p className="text-[10px] text-stone-400">4-Person Family</p>
              </div>
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-bold text-white text-sm">4 Tables</p>
                <p className="text-[10px] text-stone-400">7-Person Group</p>
              </div>
            </div>
          </div>

          {/* Quick info list */}
          <div className="space-y-2.5 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Direct Phone: <strong className="text-white font-mono">+92 21 3455 8901</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Hours: <strong className="text-white">Open 24/7 Round-the-Clock (Breakfast, Lunch, Late-Night)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Parking: <strong className="text-white">Complimentary Valet Service on Shahrah-e-Faisal</strong></span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onSelectBranch('UTG-KHI-001');
                onNavigate('reservations');
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all text-center"
            >
              Reserve Table at PECHS
            </button>
            <button
              onClick={() => {
                onSelectBranch('UTG-KHI-001');
                onNavigate('menu');
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-700 transition-all text-center"
            >
              Order PECHS Delivery
            </button>
          </div>
        </div>

        {/* Gulshan Branch */}
        <div className={`bg-stone-900 border rounded-3xl p-6 sm:p-8 space-y-6 transition-all ${
          currentBranch === 'UTG-KHI-002' ? 'border-orange-500/80 ring-1 ring-orange-500/30' : 'border-stone-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">UTG-KHI-002</span>
                {currentBranch === 'UTG-KHI-002' && (
                  <span className="px-2 py-0.5 rounded-full bg-orange-500 text-stone-950 text-[10px] font-bold">
                    Currently Selected
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Gulshan-e-Iqbal Mega Branch
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Main University Road, Block 6, Gulshan-e-Iqbal, Karachi
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-2xl font-mono font-bold text-orange-400">24 Tables</span>
              <p className="text-[11px] text-stone-400 font-mono">112 Total Seats</p>
            </div>
          </div>

          {/* Seating Breakdown */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
            <span className="text-xs text-stone-400 font-medium block">Table Configuration:</span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-bold text-white text-sm">8 Tables</p>
                <p className="text-[10px] text-stone-400">2-Person Seating</p>
              </div>
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-bold text-white text-sm">10 Tables</p>
                <p className="text-[10px] text-stone-400">4-Person Family</p>
              </div>
              <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-bold text-white text-sm">6 Tables</p>
                <p className="text-[10px] text-stone-400">9-10p Banquet</p>
              </div>
            </div>
          </div>

          {/* Quick info list */}
          <div className="space-y-2.5 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Direct Phone: <strong className="text-white font-mono">+92 21 3498 7720</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Hours: <strong className="text-white">Open 24/7 Round-the-Clock (Family Hall &amp; Banquet Pods)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Facilities: <strong className="text-white">Kids Play Zone, Foodpanda Hub &amp; Drive-thru OTC</strong></span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onSelectBranch('UTG-KHI-002');
                onNavigate('reservations');
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-bold text-xs transition-all text-center"
            >
              Reserve Table at Gulshan
            </button>
            <button
              onClick={() => {
                onSelectBranch('UTG-KHI-002');
                onNavigate('menu');
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-700 transition-all text-center"
            >
              Order Gulshan Delivery
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Delivery Zone Checker */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Karachi Delivery Coverage
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">
              Check Which Branch Delivers to Your Neighborhood
            </h3>
            <p className="text-stone-400 text-xs mt-0.5">
              Type your area name below to see the dedicated branch, average dispatch speed, and 24/7 delivery terms.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={zoneSearch}
              onChange={e => setZoneSearch(e.target.value)}
              placeholder="Search area (e.g. Clifton, Johar)..."
              className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800">
          
          {/* PECHS Zones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>PECHS Branch Zones (Central / South)</span>
              </h4>
              <span className="text-[11px] font-mono text-stone-400">~25-35 mins</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {filteredPechsZones.length > 0 ? (
                filteredPechsZones.map(zone => (
                  <div key={zone} className="flex items-center gap-2 p-2 rounded-lg bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{zone}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-stone-500 italic">No matching PECHS zones found.</p>
              )}
            </div>
          </div>

          {/* Gulshan Zones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-orange-400 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Gulshan Branch Zones (East / North)</span>
              </h4>
              <span className="text-[11px] font-mono text-stone-400">~25-35 mins</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {filteredGulshanZones.length > 0 ? (
                filteredGulshanZones.map(zone => (
                  <div key={zone} className="flex items-center gap-2 p-2 rounded-lg bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                    <span>{zone}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-stone-500 italic">No matching Gulshan zones found.</p>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

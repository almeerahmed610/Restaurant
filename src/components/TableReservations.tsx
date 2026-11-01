import React, { useState } from 'react';
import { 
  RestaurantTable, 
  TableReservation, 
  BranchId, 
  BranchInfo 
} from '../types';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  AlertCircle, 
  Plus, 
  Check, 
  X,
  Sparkles,
  Phone,
  UserCheck
} from 'lucide-react';

interface TableReservationsProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  tables: RestaurantTable[];
  reservations: TableReservation[];
  onAddReservation: (res: TableReservation) => void;
  onCancelReservation: (resId: string) => void;
  onCheckInGuest: (resId: string, tableId: string) => void;
}

export const TableReservations: React.FC<TableReservationsProps> = ({
  currentBranch,
  branches,
  tables,
  reservations,
  onAddReservation,
  onCancelReservation,
  onCheckInGuest
}) => {
  const branch = branches[currentBranch];
  const branchTables = tables.filter(t => t.branchId === currentBranch);
  const branchReservations = reservations.filter(r => r.branchId === currentBranch);

  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  
  // Booking Form State
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [partySize, setPartySize] = useState(4);
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookingTime, setBookingTime] = useState('20:30');
  const [notes, setNotes] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState<TableReservation | null>(null);

  // Filtered tables by seating type
  const filteredTables = branchTables.filter(t => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const availableCount = branchTables.filter(t => t.status === 'available').length;
  const reservedCount = branchTables.filter(t => t.status === 'reserved').length;
  const occupiedCount = branchTables.filter(t => t.status === 'occupied').length;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      alert('Please select an available table from the floor layout.');
      return;
    }

    if (selectedTable.status !== 'available') {
      alert('This table is currently reserved or occupied. Please select an available table.');
      return;
    }

    if (!guestName.trim() || !guestPhone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const newRes: TableReservation = {
      id: `RES-${Math.floor(500 + Math.random() * 500)}`,
      branchId: currentBranch,
      tableId: selectedTable.id,
      tableNumber: selectedTable.tableNumber,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      partySize: Number(partySize),
      date: bookingDate,
      timeSlot: bookingTime,
      notes: notes.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onAddReservation(newRes);
    setShowSuccessModal(newRes);
    setSelectedTable(null);
    setGuestName('');
    setGuestPhone('');
    setNotes('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header and Branch Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Users className="w-4 h-4" />
            <span>24/7 Table Seating &amp; Live Capacity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {branch.name} Seating Plan
          </h2>
          <p className="text-xs text-stone-400">
            {branch.seatingSummary} · Total Capacity: {branch.totalTables} Tables ({branch.totalSeats} Guests)
          </p>
        </div>

        {/* Live Status Counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
            <span className="block text-lg font-mono font-bold text-emerald-400">{availableCount}</span>
            <span className="text-[10px] text-stone-400 uppercase font-semibold">Available</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
            <span className="block text-lg font-mono font-bold text-amber-400">{reservedCount}</span>
            <span className="text-[10px] text-stone-400 uppercase font-semibold">Reserved</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-center">
            <span className="block text-lg font-mono font-bold text-rose-400">{occupiedCount}</span>
            <span className="text-[10px] text-stone-400 uppercase font-semibold">Seated</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Floor Layout + Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Floor Layout (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Seating Filter Controls */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-semibold text-white">Interactive Table Floor Map</h3>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterType === 'all' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                All Tables
              </button>
              <button
                onClick={() => setFilterType('2-person')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterType === '2-person' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                2-Seater
              </button>
              <button
                onClick={() => setFilterType('4-person')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterType === '4-person' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                4-Seater
              </button>
              {currentBranch === 'UTG-KHI-001' && (
                <button
                  onClick={() => setFilterType('7-person')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterType === '7-person' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 border border-stone-800'
                  }`}
                >
                  7-Seater Family
                </button>
              )}
              {currentBranch === 'UTG-KHI-002' && (
                <>
                  <button
                    onClick={() => setFilterType('9-person')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterType === '9-person' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 border border-stone-800'
                    }`}
                  >
                    9-Seater Group
                  </button>
                  <button
                    onClick={() => setFilterType('10-person')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterType === '10-person' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400 border border-stone-800'
                    }`}
                  >
                    10-Seater Banquet
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tables Map Grid */}
          <div className="p-5 sm:p-6 rounded-3xl bg-stone-950 border border-stone-800 shadow-inner grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredTables.map(table => {
              const isSelected = selectedTable?.id === table.id;
              const isAvailable = table.status === 'available';

              return (
                <button
                  key={table.id}
                  type="button"
                  onClick={() => isAvailable && setSelectedTable(table)}
                  disabled={!isAvailable}
                  className={`relative p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-32 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400 shadow-lg'
                      : isAvailable
                      ? 'border-stone-800 bg-stone-900 hover:border-amber-500/50 hover:bg-stone-800/80 cursor-pointer'
                      : table.status === 'reserved'
                      ? 'border-amber-900/30 bg-amber-950/20 opacity-70 cursor-not-allowed'
                      : 'border-rose-900/30 bg-rose-950/20 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="font-mono text-xs font-bold text-white">
                      {table.tableNumber}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      table.status === 'available'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : table.status === 'reserved'
                        ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                        : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                    }`}>
                      {table.status}
                    </span>
                  </div>

                  {/* Seat visualizer */}
                  <div className="my-1 flex items-center gap-1 text-stone-400">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-stone-200">{table.capacity} Guests</span>
                  </div>

                  <div className="w-full flex items-center justify-between text-[10px] text-stone-400 border-t border-stone-800/60 pt-1">
                    <span className="truncate">{table.section}</span>
                    {isSelected && (
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[3]" /> Selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Booking Form Sidebar (4-5 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-5">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-white">Reserve Your Table</h3>
              <p className="text-xs text-stone-400">
                Instant confirmation with zero advance deposit.
              </p>
            </div>

            {/* Selected table indicator */}
            {selectedTable ? (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-400">{selectedTable.tableNumber}</span>
                  <p className="text-stone-300">{selectedTable.capacity} Seats · {selectedTable.section}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTable(null)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Click any green Available table on the layout to bind your reservation.</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Party Size (Guests)</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedTable ? selectedTable.capacity : 15}
                    value={partySize}
                    onChange={e => setPartySize(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Reservation Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Time Slot (24/7 Hours)</label>
                <select
                  value={bookingTime}
                  onChange={e => setBookingTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="13:00">1:00 PM (Lunch)</option>
                  <option value="14:00">2:00 PM (Lunch)</option>
                  <option value="19:30">7:30 PM (Dinner)</option>
                  <option value="20:00">8:00 PM (Peak Dinner)</option>
                  <option value="20:30">8:30 PM (Peak Dinner)</option>
                  <option value="21:00">9:00 PM (Late Dinner)</option>
                  <option value="22:00">10:00 PM (Midnight Grill)</option>
                  <option value="23:30">11:30 PM (Late Night BBQ)</option>
                  <option value="02:00">2:00 AM (Sehri / Late Night)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Primary Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tariq Masood"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Phone Contact (Karachi)</label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={guestPhone}
                  onChange={e => setGuestPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Special Notes / Family Privacy</label>
                <input
                  type="text"
                  placeholder="e.g. Quiet family corner, birthday cake arrival"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedTable}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold uppercase tracking-wider text-xs transition-all shadow-md active:scale-95"
              >
                Confirm Table Reservation
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Active Reservations Management Panel */}
      <div className="space-y-3">
        <h3 className="font-serif font-bold text-lg text-white">
          Active Branch Bookings ({branchReservations.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {branchReservations.map(res => (
            <div
              key={res.id}
              className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between gap-3 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-amber-400 font-bold">{res.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    res.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {res.status}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{res.guestName}</h4>
                <p className="text-stone-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  {res.date} at {res.timeSlot} · {res.partySize} Guests
                </p>
                <p className="text-stone-300 font-medium">
                  {res.tableNumber}
                </p>
                {res.notes && (
                  <p className="text-stone-500 italic text-[11px]">"{res.notes}"</p>
                )}
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onCheckInGuest(res.id, res.tableId)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium text-[11px]"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Seat Guests</span>
                </button>

                <button
                  type="button"
                  onClick={() => onCancelReservation(res.id)}
                  className="text-stone-500 hover:text-red-400 font-medium text-[11px]"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in zoom-in-95">
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-xl text-white">Table Confirmed!</h4>
              <p className="text-xs text-stone-400">
                Reservation <span className="font-mono text-amber-400 font-bold">{showSuccessModal.id}</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-left space-y-1">
              <p className="text-stone-300"><strong>Guest:</strong> {showSuccessModal.guestName}</p>
              <p className="text-stone-300"><strong>Table:</strong> {showSuccessModal.tableNumber} ({showSuccessModal.partySize} Guests)</p>
              <p className="text-stone-300"><strong>Schedule:</strong> {showSuccessModal.date} at {showSuccessModal.timeSlot}</p>
            </div>
            <button
              onClick={() => setShowSuccessModal(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

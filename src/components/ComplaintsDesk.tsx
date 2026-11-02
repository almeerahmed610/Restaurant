import React, { useState } from 'react';
import { ComplaintTicket, TicketSeverity, BranchId, BranchInfo } from '../types';
import { 
  MessageSquareWarning, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Send, 
  ShieldAlert, 
  Search,
  UserCheck
} from 'lucide-react';

interface ComplaintsDeskProps {
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  tickets: ComplaintTicket[];
  onAddTicket: (ticket: ComplaintTicket) => void;
  onResolveTicket: (ticketId: string, resolution: string) => void;
}

export const ComplaintsDesk: React.FC<ComplaintsDeskProps> = ({
  currentBranch,
  branches,
  tickets,
  onAddTicket,
  onResolveTicket
}) => {
  const branch = branches[currentBranch];
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [category, setCategory] = useState<ComplaintTicket['category']>('delivery_delay');
  const [severity, setSeverity] = useState<TicketSeverity>('medium');
  const [description, setDescription] = useState('');
  const [successTicket, setSuccessTicket] = useState<ComplaintTicket | null>(null);

  // Active resolve dialog
  const [resolvingTicketId, setResolvingTicketId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  const branchTickets = tickets.filter(t => t.branchId === currentBranch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !description.trim()) {
      alert('Please fill out name, phone and feedback details.');
      return;
    }

    const newTicket: ComplaintTicket = {
      id: `TCK-${Math.floor(200 + Math.random() * 800)}`,
      ticketNumber: `TCK-UTG-${Math.floor(100 + Math.random() * 900)}`,
      orderNumber: orderNumber.trim() || undefined,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      category,
      severity,
      description: description.trim(),
      status: 'open',
      branchId: currentBranch,
      createdAt: new Date().toISOString()
    };

    onAddTicket(newTicket);
    setSuccessTicket(newTicket);
    setCustomerName('');
    setCustomerPhone('');
    setOrderNumber('');
    setDescription('');
  };

  const handleResolve = (ticketId: string) => {
    if (!resolutionText.trim()) return;
    onResolveTicket(ticketId, resolutionText.trim());
    setResolvingTicketId(null);
    setResolutionText('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <MessageSquareWarning className="w-4 h-4" />
            <span>24/7 Guest Care &amp; Duty Manager Escalation Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Feedback &amp; Resolution Hub
          </h2>
          <p className="text-xs text-stone-400">
            Every guest concern at {branch.name} is tracked with guaranteed manager review within 15 minutes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
            {branchTickets.filter(t => t.status !== 'resolved').length} Open Concerns
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form to Lodge Complaint / Feedback (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-5">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-white">Lodge a Concern or Feedback</h3>
              <p className="text-xs text-stone-400">
                Facing delay, food temperature issue, or service inquiry? Let us make it right immediately.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Category of Issue</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="delivery_delay">Delivery Delay / Rider Issue</option>
                  <option value="food_quality">Food Quality / Temperature / Taste</option>
                  <option value="wrong_item">Missing or Incorrect Item in Order</option>
                  <option value="staff_service">Dine-in / Staff Service Issue</option>
                  <option value="reservation_issue">Table Booking / Seating Concern</option>
                  <option value="other">General Feedback / Suggestion</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Severity</label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="low">Low (Feedback)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="high">High (Urgent Attention)</option>
                    <option value="urgent">Urgent (Immediate Callback)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Order ID (Optional)</label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={e => setOrderNumber(e.target.value)}
                    placeholder="e.g. UTG-1041"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Phone Contact</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Describe the Situation</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Tell us what happened so we can inspect the kitchen ticket and compensate..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Submit to Duty Manager Desk
              </button>
            </form>
          </div>
        </div>

        {/* Existing Escalation Tickets Log (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-serif font-bold text-lg text-white">
            Branch Escalations &amp; Resolution Log ({branchTickets.length})
          </h3>

          <div className="space-y-3">
            {branchTickets.map(ticket => (
              <div
                key={ticket.id}
                className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{ticket.ticketNumber}</span>
                    {ticket.orderNumber && (
                      <span className="font-mono text-[10px] text-stone-400">Order: {ticket.orderNumber}</span>
                    )}
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    ticket.severity === 'urgent'
                      ? 'bg-red-950 text-red-400 border border-red-800/40'
                      : ticket.severity === 'high'
                      ? 'bg-orange-950 text-orange-400 border border-orange-800/40'
                      : 'bg-stone-800 text-stone-400'
                  }`}>
                    {ticket.severity} Priority
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-white text-sm">{ticket.customerName}</h4>
                  <p className="text-[11px] text-stone-400">{ticket.customerPhone} · Logged {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-stone-300 mt-2 bg-stone-950 p-3 rounded-xl border border-stone-800/60 leading-relaxed">
                    "{ticket.description}"
                  </p>
                </div>

                {ticket.resolutionNote && (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
                    <p className="font-bold flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Duty Manager Resolution:
                    </p>
                    <p className="text-[11px] mt-0.5 text-stone-300">{ticket.resolutionNote}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                  <span className={`text-[10px] font-semibold uppercase ${
                    ticket.status === 'resolved' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    Status: {ticket.status}
                  </span>

                  {ticket.status !== 'resolved' && (
                    <button
                      onClick={() => setResolvingTicketId(ticket.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold transition-colors"
                    >
                      Resolve &amp; Compensate
                    </button>
                  )}
                </div>

                {/* Inline Resolve Input */}
                {resolvingTicketId === ticket.id && (
                  <div className="pt-2 space-y-2 border-t border-stone-800 animate-in fade-in">
                    <input
                      type="text"
                      value={resolutionText}
                      onChange={e => setResolutionText(e.target.value)}
                      placeholder="e.g. Sent fresh Karahi replacement + complimentary Kheer matka"
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolve(ticket.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 text-stone-950 font-bold text-xs"
                      >
                        Confirm Resolution
                      </button>
                      <button
                        onClick={() => setResolvingTicketId(null)}
                        className="px-3 py-1 rounded-lg bg-stone-800 text-stone-400 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {successTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in zoom-in-95">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-sm w-full p-6 space-y-4 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-lg text-white">Ticket Escalated</h4>
              <p className="font-mono text-amber-400 font-bold">{successTicket.ticketNumber}</p>
            </div>
            <p className="text-xs text-stone-300">
              Your feedback has been routed directly to the {branch.name} Duty Manager. We will reach you at {successTicket.customerPhone}.
            </p>
            <button
              onClick={() => setSuccessTicket(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

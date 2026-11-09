import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, CheckCircle2, Send, Phone, MapPin, Calendar, Car } from 'lucide-react';

export const ClientMailModal: React.FC = () => {
  const { clientMailModal, closeClientMailModal } = useApp();

  if (!clientMailModal.open || !clientMailModal.emailData) return null;

  const mail = clientMailModal.emailData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-[#071B49] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Client Business Email Inbox (Live Dispatch)</h3>
              <p className="text-xs text-slate-300">To: <span className="text-white font-mono">{mail.to || 'sjttravels2025@gmail.com'}</span></p>
            </div>
          </div>
          <button onClick={closeClientMailModal} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Body Preview */}
        <div className="p-6 space-y-4 text-xs font-sans text-slate-700 bg-slate-50/50">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            {/* Subject */}
            <div className="border-b pb-3">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Subject</div>
              <div className="font-bold text-base text-[#071B49] mt-0.5">
                {mail.subject || `[NEW BOOKING ALERT] Trip ${mail.bookingCode || '#SJT1262'} Received from ${mail.customerName || 'Customer'}`}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                <span>Received: {mail.timestamp || 'Just now'}</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Delivered to Client Server
                </span>
              </div>
            </div>

            {/* Email Message Content */}
            <div className="space-y-3 leading-relaxed">
              <p className="font-semibold text-slate-800">
                Dear SJT Tours & Travels Operations Team,
              </p>
              <p>
                A customer travel request was submitted on the <strong>SJT Travels Booking Portal</strong>. Verify availability and details before confirming the trip:
              </p>

              {/* Itinerary Card */}
              <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold uppercase">Booking Reference</span>
                    <span className="font-bold text-sm text-[#071B49]">{mail.bookingCode || '#SJT1262'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold uppercase">Trip Quoted Fare</span>
                    <span className="font-bold text-sm text-[#ED1735]">₹{mail.amount?.toLocaleString('en-IN') || '2,800'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-100 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold uppercase">Customer Name & Contact</span>
                    <span className="font-semibold text-slate-800">{mail.customerName || 'Customer'}</span>
                    <div className="text-[11px] text-blue-600 font-medium">{mail.customerPhone || '+91 99001 22334'}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold uppercase">Vehicle Reserved</span>
                    <span className="font-semibold text-slate-800">{mail.vehicleName || 'Toyota Innova Crysta'}</span>
                    <div className="text-[11px] text-slate-500">AC • Commercial Reg</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span><strong>Pickup:</strong> {mail.pickup || 'Indiranagar, Bangalore'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Destination:</strong> {mail.destination || 'Mysore Palace, Mysore'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span><strong>Date & Time:</strong> {mail.journeyDate || '12 Oct 2026, 06:00 AM'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {mail.paymentStatus || 'PENDING'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                Action Required: Log into SJT Admin Panel → Bookings & Dispatch to assign a regular driver and confirm vehicle allocation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Preview only · no message sent</span>
          <button
            onClick={closeClientMailModal}
            className="px-4 py-2 bg-[#071B49] text-white font-bold text-xs rounded-xl hover:bg-[#0b2568] transition-colors"
          >
            Close Email View
          </button>
        </div>
      </div>
    </div>
  );
};

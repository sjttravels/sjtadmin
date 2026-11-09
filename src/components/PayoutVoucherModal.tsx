import React, { useRef } from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { CompanyTransaction } from '../types';
import { numberToWordsINR } from './InvoiceModal';

interface PayoutVoucherModalProps {
  voucher: CompanyTransaction | null;
  onClose: () => void;
}

export const PayoutVoucherModal: React.FC<PayoutVoucherModalProps> = ({ voucher, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!voucher) return null;

  const handlePrint = () => {
    window.print();
  };

  const amountWords = numberToWordsINR(voucher.amount || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-300 my-4 print:my-0 print:border-none print:shadow-none">
        
        {/* Top Control Bar */}
        <div className="bg-gradient-to-r from-rose-800 to-red-950 text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ArrowUpRight className="w-4 h-4 text-rose-300" />
            <span>Commercial Payment Voucher · #{voucher.reference_no || voucher.id.slice(-6)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-white text-rose-900 hover:bg-rose-50 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-rose-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div ref={printRef} className="p-6 font-sans text-slate-900 space-y-4 bg-white print:p-2" id="printable-payout-voucher">
          {/* Header */}
          <div className="border-b-2 border-slate-800 pb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="w-28 h-20 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shadow-xs">
                <img 
                  src="/sjt_logo.png" 
                  alt="SJ TOURS & TRAVELS PVT. LTD." 
                  className="max-h-16 max-w-full object-contain" 
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>

              <div className="flex-1 text-right space-y-0.5">
                <h1 className="font-black text-lg sm:text-xl text-[#071B49] tracking-tight uppercase">
                  SHARANAJYOTI TOURS & TRAVELS PVT LTD
                </h1>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Ground Floor, No.101, Prajnyashree Nilaya, 1st main, 4th cross, BGS Layout, Totaguddenahalli, Nagasandra Bengaluru - 560073
                </p>
                <div className="text-[10px] text-slate-700 font-medium">
                  <span>Phone: <strong>919902278722</strong></span> • <span>GSTIN: <strong>29ABOCS4536M1ZI</strong></span> • <span>State: <strong>29-Karnataka</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 text-center">
              <span className="inline-block bg-rose-800 text-white text-[11px] font-black uppercase px-4 py-1 rounded shadow-xs tracking-wider">
                Payment Disbursement Voucher / Expense Bill
              </span>
            </div>
          </div>

          {/* Voucher Meta Grid */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-300 text-xs">
            <div className="space-y-1">
              <div className="text-slate-500 font-bold uppercase text-[10px]">Paid / Disbursed To:</div>
              <div className="font-black text-sm text-slate-900">
                {voucher.party_name || 'Designated Beneficiary'}
              </div>
              <div className="text-[11px] text-slate-600">
                <strong>Payee Classification:</strong> <span className="bg-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-800 uppercase">{voucher.party_type}</span>
              </div>
              <div className="text-[11px] text-slate-600">
                <strong>Expense Category:</strong> {(voucher.category || '').replace(/_/g, ' ')}
              </div>
            </div>

            <div className="text-right space-y-1">
              <div><strong>Voucher No:</strong> <span className="font-mono font-bold text-rose-900">VOUCH-{voucher.reference_no || voucher.id.slice(-6)}</span></div>
              <div><strong>Date:</strong> {voucher.date || new Date().toISOString().split('T')[0]}</div>
              <div><strong>Disbursement Mode:</strong> <span className="font-bold text-slate-800">{voucher.payment_mode}</span></div>
              {voucher.related_duty_code && (
                <div><strong>Related Duty Code:</strong> <span className="font-mono font-bold text-blue-700">{voucher.related_duty_code}</span></div>
              )}
            </div>
          </div>

          {/* Expense Particulars Table */}
          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-800 text-[11px] font-black uppercase text-slate-800">
                  <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                  <th className="p-2 border-r border-slate-800">Expense Description / Particulars</th>
                  <th className="p-2 border-r border-slate-800 w-36 text-center">Category</th>
                  <th className="p-2 w-32 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2.5 border-r border-slate-800 text-center font-mono">1</td>
                  <td className="p-2.5 border-r border-slate-800">
                    <div className="font-bold text-slate-900">{voucher.title}</div>
                    {voucher.notes && (
                      <div className="text-[10px] text-slate-500 italic mt-0.5">{voucher.notes}</div>
                    )}
                  </td>
                  <td className="p-2.5 border-r border-slate-800 text-center text-slate-700 font-medium">
                    {(voucher.category || '').replace(/_/g, ' ')}
                  </td>
                  <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                    ₹{Number(voucher.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount Box */}
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-300 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-rose-800 uppercase font-bold block">Total Amount Disbursed:</span>
              <span className="text-xs text-slate-800 italic mt-0.5 block font-medium">
                {amountWords}
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-rose-900">
              ₹{Number(voucher.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>

          {/* Account Debited & Dual Signatures */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs">
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <p><strong>Debited From:</strong> APEX BANK, SUNKADAKATTE</p>
              <p><strong>Account:</strong> 1039111020000025 • <strong>IFSC:</strong> KSCB0001039</p>
              <p className="text-emerald-700 font-bold flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Payout Cleared & Debited from Fleet Account
              </p>
            </div>

            <div className="flex justify-between items-end pt-8">
              <div className="text-center">
                <span className="border-b border-dashed border-slate-400 w-28 block mb-1"></span>
                <span className="text-[10px] font-bold text-slate-700 block">Receiver's Sign</span>
              </div>
              <div className="text-right">
                <span className="border-b border-dashed border-slate-400 w-36 block mb-1"></span>
                <span className="text-[10px] font-bold text-slate-900 block">For SHARANAJYOTI TOURS & TRAVELS</span>
                <span className="text-[9px] text-slate-500">Authorized Accounts Manager</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


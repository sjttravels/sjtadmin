import React, { useRef } from 'react';
import { X, Printer, CheckCircle2, User, Car, Building2, ShieldCheck, QrCode } from 'lucide-react';
import { DriverPaymentVoucher } from '../types';
import { numberToWordsINR } from './InvoiceModal';

interface DriverVoucherModalProps {
  voucher: DriverPaymentVoucher | null;
  onClose: () => void;
}

export const DriverVoucherModal: React.FC<DriverVoucherModalProps> = ({ voucher, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!voucher) return null;

  const handlePrint = () => {
    window.print();
  };

  const netWords = numberToWordsINR(voucher.netPayable || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-300 my-4 print:my-0 print:border-none print:shadow-none">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-[#071B49] text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Driver Payment Invoice · {voucher.voucherNumber}</span>
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${
              voucher.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {voucher.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 border border-blue-400/40 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div 
          ref={printRef}
          id="printable-driver-voucher"
          className="p-4 sm:p-6 bg-white font-sans text-slate-900 text-xs leading-tight print:p-2"
          style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
        >
          {/* Centered Document Header */}
          <div className="text-center pb-2">
            <h1 className="font-black text-xl text-slate-900 tracking-wide uppercase">
              Chauffeur Duty Settlement & Payment Invoice
            </h1>
            <p className="text-[11px] text-slate-600">Official Commercial Transport Fleet Payment Voucher</p>
          </div>

          {/* Solid 1px black border container */}
          <div className="border border-slate-800 bg-white">
            
            {/* 1. SELLER / COMPANY HEADER */}
            <div className="p-3.5 flex items-start gap-4 border-b border-slate-800">
              <div className="w-24 h-18 rounded border border-slate-300 bg-white flex items-center justify-center p-1 shrink-0 shadow-xs">
                <img 
                  src="/sjt_logo.png" 
                  alt="SJ TOURS & TRAVELS PVT. LTD." 
                  className="max-h-16 max-w-full object-contain" 
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>

              <div className="flex-1 space-y-0.5">
                <h2 className="font-black text-lg text-slate-900 tracking-tight leading-tight uppercase">
                  SHARANAJYOTI TOURS & TRAVELS PVT LTD
                </h2>
                <p className="text-[11px] text-slate-700 leading-snug">
                  Ground Floor, No.101, Prajnyashree Nilaya, 1st main, 4th cross, BGS Layout, Totaguddenahalli, Nagasandra Bengaluru - 560073
                </p>
                <div className="flex flex-wrap items-center gap-x-4 pt-1 text-[11px] text-slate-800">
                  <span><strong>Phone:</strong> 919902278722</span>
                  <span><strong>Email:</strong> md@sjttravels.in</span>
                  <span><strong>GSTIN:</strong> 29ABOCS4536M1ZI</span>
                  <span><strong>State:</strong> 29-Karnataka</span>
                </div>
              </div>
            </div>

            {/* 2. DRIVER & VOUCHER DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
              {/* Left: Driver Details */}
              <div className="p-3 space-y-1">
                <div className="font-bold text-[11px] text-slate-900 underline uppercase tracking-wider">
                  Driver / Chauffeur Beneficiary:
                </div>
                <div className="font-black text-sm text-slate-900">
                  {voucher.driverName}
                </div>
                <div className="text-[11px] text-slate-700 space-y-0.5 pt-0.5">
                  <div><strong>Phone:</strong> {voucher.driverPhone || 'Registered Mobile'}</div>
                  <div><strong>Assigned Vehicle:</strong> {voucher.vehicleReg} ({voucher.vehicleName})</div>
                  <div><strong>Payment Mode:</strong> {voucher.paymentMode} {voucher.utrRefNo ? `• Ref: ${voucher.utrRefNo}` : ''}</div>
                </div>
              </div>

              {/* Right: Voucher Meta */}
              <div className="p-3 space-y-1">
                <div className="font-bold text-[11px] text-slate-900 underline uppercase tracking-wider">
                  Voucher & Settlement Details:
                </div>
                <div className="text-[11px] text-slate-800 space-y-1 pt-0.5">
                  <div><strong>Voucher No:</strong> <span className="font-mono font-bold text-slate-900">{voucher.voucherNumber}</span></div>
                  <div><strong>Date:</strong> {voucher.date}</div>
                  <div><strong>Settlement Period:</strong> <span className="font-bold text-slate-900 capitalize">{voucher.billingPeriod}</span></div>
                  <div><strong>Status:</strong> <span className="font-bold text-emerald-800">{voucher.status}</span></div>
                </div>
              </div>
            </div>

            {/* 3. EARNINGS & DUTY BREAKDOWN TABLE */}
            <div className="border-b border-slate-800">
              <div className="bg-slate-100 p-2 font-black text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-800">
                1. Driver Shift Duties & Operating Allowances (Earnings)
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-800 text-[11px]">
                    <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                    <th className="p-2 border-r border-slate-800">Earnings Description</th>
                    <th className="p-2 border-r border-slate-800 w-24 text-right">Quantity</th>
                    <th className="p-2 border-r border-slate-800 w-28 text-right">Rate (₹)</th>
                    <th className="p-2 w-32 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {voucher.shiftsCount > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">1</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Company Shift Duties Completed</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">{voucher.shiftsCount} Shifts</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">₹{voucher.shiftRate.toLocaleString('en-IN')}</td>
                      <td className="p-2 text-right font-mono font-bold">₹{(voucher.shiftAmount ?? voucher.shiftEarnings ?? (voucher.shiftsCount * voucher.shiftRate)).toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.totalKm > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">2</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Distance KM Running Allowance</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">{voucher.totalKm} KM</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">₹{voucher.kmRate}/km</td>
                      <td className="p-2 text-right font-mono font-bold">₹{(voucher.kmAmount ?? voucher.kmEarnings ?? (voucher.totalKm * voucher.kmRate)).toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.battaDays > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">3</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Driver Daily Food & Batta Allowance</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">{voucher.battaDays} Days</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">₹{voucher.battaRate}/day</td>
                      <td className="p-2 text-right font-mono font-bold">₹{(voucher.battaAmount ?? voucher.battaTotal ?? (voucher.battaDays * voucher.battaRate)).toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.tollsParking > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">4</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Tolls, Fastag & Parking Reimbursement</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">Actuals</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">-</td>
                      <td className="p-2 text-right font-mono font-bold">₹{voucher.tollsParking.toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.nightHalt > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">5</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Outstation Night Halt Allowance</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">Approved</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">-</td>
                      <td className="p-2 text-right font-mono font-bold">₹{voucher.nightHalt.toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.customEarnings && voucher.customEarnings.map((c, i) => (
                    <tr key={(c as any).id || i}>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">{i + 6}</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">{c.title}</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">Custom</td>
                      <td className="p-2 border-r border-slate-800 text-right font-mono">-</td>
                      <td className="p-2 text-right font-mono font-bold">₹{Number(c.amount || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}

                  <tr className="bg-slate-100 font-black border-t border-slate-800 text-slate-900">
                    <td colSpan={4} className="p-2 text-right border-r border-slate-800 uppercase tracking-wide">
                      Total Gross Driver Earnings (A):
                    </td>
                    <td className="p-2 text-right font-mono text-sm text-emerald-800">
                      ₹{(voucher.grossEarnings ?? voucher.totalGrossEarnings ?? 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4. DEDUCTIONS TABLE */}
            <div className="border-b border-slate-800">
              <div className="bg-rose-50 p-2 font-black text-[11px] text-rose-950 uppercase tracking-wider border-b border-slate-800">
                2. Settlement Deductions & Adjustments
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-800 text-[11px]">
                    <th className="p-2 border-r border-slate-800 w-10 text-center">#</th>
                    <th className="p-2 border-r border-slate-800">Deduction Description</th>
                    <th className="p-2 border-r border-slate-800 w-44 text-right">Reference / Reason</th>
                    <th className="p-2 w-32 text-right">Deducted Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {Boolean(voucher.companyRent && voucher.companyRent > 0) && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">1</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Vehicle Company Rent / CNT Cut</td>
                      <td className="p-2 border-r border-slate-800 text-right text-slate-600 font-mono">Monthly Vehicle Cut</td>
                      <td className="p-2 text-right font-mono font-bold text-rose-700">- ₹{(voucher.companyRent || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.advanceDeduction > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">2</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Salary & Fuel Advance Recovery</td>
                      <td className="p-2 border-r border-slate-800 text-right text-slate-600 font-mono">Prior Advance Payout</td>
                      <td className="p-2 text-right font-mono font-bold text-rose-700">- ₹{voucher.advanceDeduction.toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.fuelDeduction > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">3</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Company Fuel Card / Diesel Charges</td>
                      <td className="p-2 border-r border-slate-800 text-right text-slate-600 font-mono">Fuel Card Settlement</td>
                      <td className="p-2 text-right font-mono font-bold text-rose-700">- ₹{voucher.fuelDeduction.toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.damagePenalty > 0 && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">4</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">Vehicle Damage / Traffic Fine Penalty</td>
                      <td className="p-2 border-r border-slate-800 text-right text-slate-600 font-mono">Fine Assessment</td>
                      <td className="p-2 text-right font-mono font-bold text-rose-700">- ₹{voucher.damagePenalty.toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {Boolean(voucher.tdsDeduction && voucher.tdsDeduction > 0) && (
                    <tr>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">5</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">TDS Statutory Withholding (1%)</td>
                      <td className="p-2 border-r border-slate-800 text-right text-slate-600 font-mono">Income Tax TDS</td>
                      <td className="p-2 text-right font-mono font-bold text-rose-700">- ₹{(voucher.tdsDeduction || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  )}

                  {voucher.customDeductions && voucher.customDeductions.map((d, i) => (
                    <tr key={(d as any).id || i}>
                      <td className="p-2 border-r border-slate-800 text-center font-mono">{i + 6}</td>
                      <td className="p-2 border-r border-slate-800 font-semibold">{d.title}</td>
                      <td className="p-2 border-r border-slate-800 text-right text-slate-600 font-mono">Custom Deduction</td>
                      <td className="p-2 text-right font-mono font-bold text-rose-700">- ₹{Number(d.amount || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}

                  <tr className="bg-rose-50/70 font-black border-t border-slate-800 text-slate-900">
                    <td colSpan={3} className="p-2 text-right border-r border-slate-800 uppercase tracking-wide">
                      Total Settlement Deductions (B):
                    </td>
                    <td className="p-2 text-right font-mono text-sm text-rose-800">
                      - ₹{voucher.totalDeductions.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 5. NET PAYABLE BANNER & WORDS */}
            <div className="p-3.5 bg-emerald-50/80 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Net Driver Settlement Payable (A - B):
                </div>
                <div className="text-xs text-slate-800 font-semibold italic mt-0.5">
                  Amount in words: <strong className="not-italic text-slate-950 font-black">{netWords}</strong>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block font-bold">Net Payout Amount</span>
                <span className="text-2xl font-black font-mono text-emerald-800">
                  ₹{voucher.netPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* 6. BANK COORDINATES & SIGNATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
              <div className="p-3 text-[11px] text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 uppercase underline">Disbursed From Official SJT Account:</div>
                <p><strong>Bank:</strong> THE KARNATAKA STATE COOPERATIVE APEX BANK LIMITED</p>
                <p><strong>Branch:</strong> SUNKADAKATTE, BENGALURU</p>
                <p><strong>A/C No:</strong> 1039111020000025 • <strong>IFSC:</strong> KSCB0001039</p>
                <p className="text-[10px] text-slate-500 pt-1">
                  Payment Mode: {voucher.paymentMode} {voucher.utrRefNo ? `• Transaction UTR: ${voucher.utrRefNo}` : ''}
                </p>
              </div>

              <div className="p-3 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <div className="text-center">
                    <div className="h-14 flex items-end justify-center">
                      <span className="border-b border-dashed border-slate-400 w-28 block"></span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold block mt-1">Chauffeur Signature</span>
                  </div>

                  <div className="text-center">
                    <div className="h-14 flex items-end justify-center">
                      <span className="border-b border-dashed border-slate-400 w-36 block"></span>
                    </div>
                    <span className="text-[10px] text-slate-900 font-bold block mt-1">For SHARANAJYOTI TOURS & TRAVELS</span>
                    <span className="text-[9px] text-slate-500 block">Authorized Signatory</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center pt-2 text-[10px] text-slate-500">
            This is a computer generated commercial chauffeur settlement voucher. Commercial Road Passenger Transport Fleet Division.
          </div>
        </div>

      </div>
    </div>
  );
};

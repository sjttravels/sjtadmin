import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, Download, CheckCircle2, User, Calendar, IndianRupee, Car, Building } from 'lucide-react';
import { numberToWordsINR } from './InvoiceModal';

export const PayslipModal: React.FC = () => {
  const { payslipModal, closePayslipModal, markPayrollPaid } = useApp();
  const printRef = useRef<HTMLDivElement>(null);

  if (!payslipModal.open || !payslipModal.payroll) return null;

  const pay = payslipModal.payroll;

  const handlePrint = () => {
    window.print();
  };

  // Shift & Settlement Calculations matching handwritten image formula:
  // 76 shifts × 650 = 49,400 Gross
  // Deductions: CNT (-10,800), Other (-450), TDS (-450)
  // Net = 34,300
  const totalShifts = pay.totalShifts ?? (pay.total_duties || pay.dutyDays || 76);
  const ratePerShift = pay.ratePerShift ?? 650;
  const shiftEarnings = pay.shiftEarnings ?? (totalShifts * ratePerShift);
  const baseSalary = pay.baseSalary || 0;
  const grossEarnings = shiftEarnings > 0 ? (shiftEarnings + baseSalary + (pay.dutyAllowances || 0) + (pay.overtimePay || 0)) : (pay.gross_salary || (pay.baseSalary + pay.dutyAllowances + pay.overtimePay));

  const companyRentDeduction = pay.companyRentDeduction ?? (pay.deductions && pay.deductions > 5000 ? pay.deductions : 10800); // CNT / CHT cut
  const otherDeductions = pay.otherDeductions ?? 450;
  const tdsDeduction = pay.tdsDeduction ?? (grossEarnings > 0 ? Math.round(grossEarnings * 0.01) : 450); // TDS 1% = 450
  const advances = pay.advances || 0;
  const totalDeductions = companyRentDeduction + otherDeductions + tdsDeduction + advances;

  const netPayout = pay.netPayout !== undefined && pay.netPayout > 0 
    ? pay.netPayout 
    : Math.max(0, grossEarnings - totalDeductions);

  const netInWords = numberToWordsINR(netPayout);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-300 my-4 print:my-0 print:border-none print:shadow-none">
        
        {/* Top Control Bar */}
        <div className="bg-[#071B49] text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Driver Monthly Duty Settlement & Payslip</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
              pay.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {pay.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={closePayslipModal}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div ref={printRef} className="p-6 font-sans text-slate-900 space-y-4 bg-white print:p-2" id="printable-payslip">
          
          {/* Header */}
          <div className="text-center border-b-2 border-slate-800 pb-3 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <img 
                src="/sjt_logo.png" 
                alt="SJT" 
                className="h-10 object-contain" 
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <h1 className="font-black text-xl text-[#071B49] tracking-tight uppercase">
                SHARANAJYOTI TOURS & TRAVELS PVT LTD
              </h1>
            </div>
            <p className="text-[11px] text-slate-600">
              Ground Floor, No.101, Prajnyashree Nilaya, Nagasandra Bengaluru • Phone: 919902278722
            </p>
            <div className="inline-block bg-[#071B49] text-white text-[11px] font-bold uppercase px-3 py-1 rounded mt-1">
              Driver Monthly Shift & Duty Settlement Voucher • {pay.month || 'Current Month'}
            </div>
          </div>

          {/* Driver & Duty Meta */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-300 text-xs">
            <div>
              <div className="text-slate-500 font-bold uppercase text-[10px]">Chauffeur / Driver Details:</div>
              <div className="font-black text-sm text-[#071B49] mt-0.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-600" />
                {pay.driverName || 'Driver Partner'}
              </div>
              <div className="text-slate-600 mt-1 space-y-0.5 text-[11px]">
                <div><strong>Driver ID:</strong> <span className="font-mono">{pay.driverId?.slice(0, 12).toUpperCase()}</span></div>
                <div><strong>Vehicle Reg:</strong> <span className="font-mono font-bold text-slate-900">{pay.vehicleReg || 'KA 05 AB 1234'}</span></div>
                {pay.driverPhone && <div><strong>Mobile:</strong> {pay.driverPhone}</div>}
              </div>
            </div>
            <div>
              <div className="text-slate-500 font-bold uppercase text-[10px]">Duty Settlement Metrics:</div>
              <div className="text-slate-700 mt-1 space-y-1 text-[11px]">
                <div className="flex justify-between border-b border-slate-200 pb-0.5">
                  <span>Completed Duty Shifts:</span>
                  <strong className="text-blue-900 font-mono text-sm">{totalShifts} Shifts</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-0.5">
                  <span>Agreed Shift Rate:</span>
                  <strong className="font-mono">₹{ratePerShift} / shift</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Approved Run:</span>
                  <strong className="font-mono font-bold text-slate-900">{pay.approvedKm?.toLocaleString('en-IN') || 0} KM</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Settlement Calculation Table (Matching handwritten calculation from image 4) */}
          <div className="border border-slate-800 rounded-none overflow-hidden text-xs">
            
            {/* 1. EARNINGS SECTION */}
            <div className="bg-slate-100 px-3 py-1.5 font-bold uppercase text-slate-900 border-b border-slate-800 flex justify-between">
              <span>Shift Earnings (Additions)</span>
              <span>Calculation & Amount (₹)</span>
            </div>
            <div className="p-3 space-y-1.5 border-b border-slate-800 text-slate-800 font-mono">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-sans font-medium">Company Duty Shifts ({totalShifts} shifts × ₹{ratePerShift})</span>
                <strong className="text-slate-900 font-mono">₹{shiftEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
              </div>
              {baseSalary > 0 && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-sans font-medium">Base Retainer / Fixed Pay</span>
                  <span className="font-mono">₹{baseSalary.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {(pay.dutyAllowances || 0) > 0 && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-sans font-medium">Duty Bata & Food Allowance</span>
                  <span className="font-mono">₹{pay.dutyAllowances.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {(pay.overtimePay || 0) > 0 && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-sans font-medium">Overtime / Night Shift Incentive</span>
                  <span className="font-mono">₹{pay.overtimePay.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="pt-1.5 border-t border-slate-300 flex justify-between font-bold text-emerald-800">
                <span className="font-sans uppercase">Total Gross Shift Earnings</span>
                <span className="font-mono font-black text-sm">₹{grossEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* 2. DEDUCTIONS SECTION (Matching handwritten image: CNT -10,800, Other -450, TDS 1% -450) */}
            <div className="bg-rose-50 px-3 py-1.5 font-bold uppercase text-rose-900 border-b border-slate-800 flex justify-between">
              <span>Itemized Deductions (CNT / Rent / TDS)</span>
              <span>Deduction Amount (₹)</span>
            </div>
            <div className="p-3 space-y-1.5 border-b border-slate-800 text-slate-800 font-mono">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-sans font-medium">Company Cut / Vehicle Rent Deduction (CNT/CHT)</span>
                <span className="text-rose-600 font-bold font-mono">- ₹{companyRentDeduction.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-sans font-medium">Other Operating Deductions</span>
                <span className="text-rose-600 font-bold font-mono">- ₹{otherDeductions.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-sans font-medium">TDS Deduction (1% on Duty Invoicing)</span>
                <span className="text-rose-600 font-bold font-mono">- ₹{tdsDeduction.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              {advances > 0 && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-sans font-medium">Advance Cash / Fuel Repayment</span>
                  <span className="text-rose-600 font-bold font-mono">- ₹{advances.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="pt-1.5 border-t border-slate-300 flex justify-between font-bold text-rose-800">
                <span className="font-sans uppercase">Total Deductions</span>
                <span className="font-mono font-black text-sm">- ₹{totalDeductions.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* 3. NET PAYOUT BANNER */}
            <div className="bg-[#071B49] text-white p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider block">
                  Net Driver Settlement Payout
                </span>
                <div className="text-2xl font-black font-mono tracking-tight text-white">
                  ₹{netPayout.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="text-right text-xs">
                <span className="text-blue-200 block text-[10px] uppercase">Payment Status:</span>
                <span className="font-bold text-emerald-400 uppercase text-sm tracking-wide">{pay.status}</span>
              </div>
            </div>

          </div>

          {/* Amount in words */}
          <div className="bg-slate-50 p-2.5 border border-slate-300 rounded text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Net Payout in Words:</span>
            <span className="font-black text-slate-900 italic mt-0.5 block">{netInWords}</span>
          </div>

          {/* Signatures */}
          <div className="pt-4 grid grid-cols-2 gap-8 text-xs text-slate-600">
            <div>
              <div className="w-44 border-b border-slate-700 pb-1 text-center font-medium font-serif italic text-sm text-slate-800">
                {pay.driverName || 'Driver Sign'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 text-center w-44">
                Chauffeur Signature & Acknowledgment
              </div>
            </div>
            <div className="text-right">
              <div className="w-44 border-b border-slate-700 pb-1 ml-auto text-center font-bold text-slate-900">
                Sharanappa
              </div>
              <div className="text-[10px] text-slate-500 mt-1 text-center w-44 ml-auto">
                Authorized Signatory (SJT Travels)
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between print:hidden">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Formulated as per company shift tariff (₹650/shift)</span>
          </div>
          <div className="flex gap-2">
            {pay.status !== 'PAID' && (
              <button
                onClick={() => {
                  markPayrollPaid(pay.id || pay._id || pay.driverId);
                  alert(`Payment of ₹${netPayout.toLocaleString('en-IN')} marked as PAID to ${pay.driverName}`);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Paid</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-[#071B49] hover:bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-900/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

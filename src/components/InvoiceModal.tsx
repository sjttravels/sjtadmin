import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, Download, Mail, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

// Number to Words converter (Indian Currency Format: Lakhs, Crores, Rupees)
export function numberToWordsINR(amount: number): string {
  if (isNaN(amount) || amount === 0) return 'Zero Rupees Only';
  let num = Math.round(Math.abs(amount));
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(n: number): string {
    if (n < 20) return ones[n];
    const unit = n % 10;
    return tens[Math.floor(n / 10)] + (unit ? ' ' + ones[unit] : '');
  }

  function convertThreeDigits(n: number): string {
    let str = '';
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 0) {
      str += convertTwoDigits(n);
    }
    return str.trim();
  }

  let result = '';
  const crores = Math.floor(num / 10000000);
  num %= 10000000;
  if (crores > 0) result += convertThreeDigits(crores) + ' Crore ';

  const lakhs = Math.floor(num / 100000);
  num %= 100000;
  if (lakhs > 0) result += convertThreeDigits(lakhs) + ' Lakh ';

  const thousands = Math.floor(num / 1000);
  num %= 1000;
  if (thousands > 0) result += convertThreeDigits(thousands) + ' Thousand ';

  if (num > 0) result += convertThreeDigits(num);

  return (result.trim() + ' Rupees Only').replace(/\s+/g, ' ');
}

export const InvoiceModal: React.FC = () => {
  const { invoiceModal, closeInvoiceModal } = useApp();
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!invoiceModal.open || !invoiceModal.invoice) return null;

  const inv = invoiceModal.invoice;

  // Seller Details (Exact match with Vyapar Tax Invoice)
  const seller = {
    name: inv.seller_company_name || 'SHARANAJYOTI TOURS & TRAVELS PVT LTD',
    address: inv.seller_address || 'Ground Floor, No.101, Prajnyashree Nilaya, 1st main, 4th cross, BGS Layout, Totaguddenahalli, Nagasandra Bengaluru',
    phone: inv.seller_phone || '919902278722',
    email: inv.seller_email || 'md@sjttravels.in',
    gstin: inv.seller_gstin || '29ABOCS4536M1ZI',
    state: inv.seller_state || '29-Karnataka'
  };

  // Client Details
  const clientName = inv.companyName || inv.company_name || 'Commercial Client';
  const clientAddress = inv.client_address || '';
  const clientContact = inv.client_phone || '';
  const clientGstin = inv.companyGstin || inv.client_gstin || '';
  const placeOfSupply = inv.place_of_supply || '29-Karnataka';

  // Invoice Meta
  const invoiceNo = inv.invoiceNumber || inv.invoice_number || `SJT-INV-${Date.now().toString().slice(-4)}`;
  const invoiceDate = inv.invoiceDate || inv.invoice_date || new Date().toLocaleDateString('en-GB');
  const invoiceTime = inv.invoiceTime || inv.invoice_time || '11:00 AM';
  const billingPeriod = inv.billingPeriod || inv.billing_period || 'Commercial Transport Service';

  // Transportation Details
  const vehicleType = inv.vehicle_type || inv.vehicle_name || 'COMMERCIAL VEHICLE';
  const vehicleNumber = inv.vehicle_reg || 'KA Commercial';
  const supervisorName = inv.supervisor_name || 'SHARANAPPA';
  const indicationDate = inv.indication_date || invoiceDate;
  const transportCompany = inv.transport_company_name || clientName;
  const vehicleModel = inv.vehicle_model || 'Commercial Fleet';

  // Item Calculations
  const firstItem = inv.items && inv.items.length > 0 ? inv.items[0] : null;
  const itemName = firstItem?.description || (inv as any).item_name || 'Passenger Transport Services';
  const hsnSac = inv.hsn_sac || firstItem?.hsnSac || '9964';
  const quantity = inv.quantity || firstItem?.quantity || firstItem?.daysOrKm || 1;
  const rateCard = inv.rate_per_unit || firstItem?.rate || 0;
  const taxableAmount = inv.taxable_amount || (quantity * rateCard) || (inv.subtotal || 0);

  // GST Breakdown
  const gstRate = inv.gst_rate !== undefined ? inv.gst_rate : (inv.cgst && inv.subtotal ? Math.round(((inv.cgst * 2) / inv.subtotal) * 100) : 18);
  const halfGstRate = gstRate / 2;
  const totalTax = inv.total_tax !== undefined ? inv.total_tax : (inv.cgst !== undefined && inv.sgst !== undefined ? (inv.cgst + inv.sgst) : Math.round(taxableAmount * (gstRate / 100)));
  const cgstAmt = inv.cgst_amount !== undefined ? inv.cgst_amount : (inv.cgst !== undefined ? inv.cgst : (totalTax / 2));
  const sgstAmt = inv.sgst_amount !== undefined ? inv.sgst_amount : (inv.sgst !== undefined ? inv.sgst : (totalTax / 2));
  const lineItemTotal = taxableAmount + totalTax;

  // Deductions & Final Calculation
  const subTotal = lineItemTotal;
  const gspRent = inv.gsp_rent !== undefined ? inv.gsp_rent : 0;
  const tdsCgst = inv.tds_cgst !== undefined ? inv.tds_cgst : 0;
  const tdsAmount = inv.tds_amount !== undefined ? inv.tds_amount : 0;
  const roundOff = inv.round_off !== undefined ? inv.round_off : 0;
  
  // Total after TDS & deductions
  const finalTotal = inv.grand_total || inv.totalAmount || Math.round(subTotal - gspRent - tdsCgst - tdsAmount + roundOff);
  const amountInWords = inv.amount_in_words || numberToWordsINR(finalTotal);
  const receivedAmount = inv.received_amount !== undefined ? inv.received_amount : 0;
  const balanceAmount = inv.balance_amount !== undefined ? inv.balance_amount : finalTotal;
  const invoiceValueBeforeTds = inv.invoice_value_before_tds !== undefined ? inv.invoice_value_before_tds : (subTotal - gspRent);

  // Bank Coordinates (Apex Bank Sunkadakatte)
  const bank = {
    name: inv.bank_name || 'THE KARANATAKA STATE COOPERATIVE APEX BANK LIMITED, SUNKADAKATTE',
    accountNo: inv.bank_account_no || '1039111020000025',
    ifsc: inv.bank_ifsc || 'KSCB0001039',
    holder: inv.bank_account_holder || 'SHARANAPPA'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-300 my-4 print:my-0 print:border-none print:shadow-none">
        
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Vyapar Tax Invoice · {invoiceNo}</span>
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded font-mono font-bold border border-emerald-500/30">
              GST 29-Karnataka
            </span>
            <span className="bg-blue-500/20 text-blue-300 text-xs px-2.5 py-0.5 rounded font-bold border border-blue-500/30">
              {inv.status || 'ISSUED'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#071B49] hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 border border-blue-500/40 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-blue-300" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={closeInvoiceModal}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Document (Exact 1:1 Layout with Vyapar Images) */}
        <div 
          ref={invoiceRef}
          id="printable-invoice"
          className="p-4 sm:p-6 bg-white font-sans text-slate-900 text-xs leading-tight print:p-2"
          style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
        >
          {/* Centered Document Title */}
          <div className="text-center pb-2">
            <h1 className="font-black text-xl text-slate-900 tracking-wide uppercase">
              Tax Invoice
            </h1>
          </div>

          {/* MAIN INVOICE CONTAINER (Solid 1px black border enclosing all sections) */}
          <div className="border border-slate-800 rounded-none bg-white">
            
            {/* 1. SELLER HEADER BLOCK */}
            <div className="p-3.5 flex items-start gap-4 border-b border-slate-800">
              {/* Left Logo Badge */}
              <div className="w-28 h-20 rounded-md border border-slate-300 bg-white flex items-center justify-center p-1 shrink-0 shadow-xs">
                <img 
                  src="/sjt_logo.png" 
                  alt="SJ TOURS & TRAVELS PVT. LTD." 
                  className="max-h-18 max-w-full object-contain" 
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Seller Business Details */}
              <div className="flex-1 space-y-0.5">
                <h2 className="font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-tight uppercase">
                  {seller.name}
                </h2>
                <p className="text-[11px] text-slate-700 leading-snug">
                  {seller.address}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 pt-1 text-[11px] text-slate-800 font-medium">
                  <span><strong>Phone:</strong> {seller.phone}</span>
                  <span><strong>Email:</strong> {seller.email}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 text-[11px] text-slate-900 font-bold">
                  <span><strong>GSTIN:</strong> {seller.gstin}</span>
                  <span><strong>State:</strong> {seller.state}</span>
                </div>
              </div>
            </div>

            {/* 2. TWO-COLUMN: BILL TO & INVOICE DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
              {/* Left: Bill To */}
              <div className="p-3 space-y-1">
                <div className="font-bold text-[11px] text-slate-900 underline uppercase tracking-wider">
                  Bill To:
                </div>
                <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                  {clientName}
                </div>
                <p className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed">
                  {clientAddress}
                </p>
                <div className="pt-1 text-[11px] text-slate-800 space-y-0.5">
                  <div><strong>Contact No:</strong> {clientContact}</div>
                  <div><strong>GSTIN:</strong> {clientGstin}</div>
                  <div><strong>State:</strong> {placeOfSupply}</div>
                </div>
              </div>

              {/* Right: Invoice Details */}
              <div className="p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[11px] text-slate-900 underline uppercase tracking-wider">
                      Invoice Details:
                    </span>
                    <span className="font-bold text-[11px] text-slate-800 bg-slate-100 px-2 py-0.5 border border-slate-300 rounded">
                      Bill For the month: <span className="font-black capitalize">{billingPeriod}</span>
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-800">
                    <div className="flex justify-between border-b border-slate-200 pb-0.5">
                      <span className="font-semibold">Invoice No.:</span>
                      <strong className="font-mono text-slate-900">{invoiceNo}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-0.5">
                      <span className="font-semibold">Date:</span>
                      <span className="font-mono">{invoiceDate}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-0.5">
                      <span className="font-semibold">Time:</span>
                      <span className="font-mono">{invoiceTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Place Of Supply:</span>
                      <strong className="text-slate-900">{placeOfSupply}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. TRANSPORTATION DETAILS BOX */}
            <div className="border-b border-slate-800">
              <div className="bg-slate-100/70 px-3 py-1 font-bold text-[11px] text-slate-900 border-b border-slate-300 uppercase tracking-wider">
                Transportation Details:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 p-2.5 text-[11px] text-slate-800">
                <div className="space-y-1 pr-2">
                  <div className="flex justify-between">
                    <span className="font-semibold uppercase text-slate-600">Vehicle Type:</span>
                    <span className="font-bold text-slate-900">{vehicleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-600">Vehicle Number:</span>
                    <span className="font-mono font-bold text-slate-900">{vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold uppercase text-slate-600">Supervisor Name:</span>
                    <span className="font-bold text-slate-900">{supervisorName}</span>
                  </div>
                </div>
                <div className="space-y-1 pl-0 sm:pl-2 pt-1 sm:pt-0">
                  <div className="flex justify-between">
                    <span className="font-semibold uppercase text-slate-600">Vehicle Indication Date:</span>
                    <span className="font-mono">{indicationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold uppercase text-slate-600">Company Name:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">{transportCompany}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold uppercase text-slate-600">Vehicle Model:</span>
                    <span className="font-bold text-slate-900">{vehicleModel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. ITEMS TABLE (Exact columns matching image 2 & 3) */}
            <div className="border-b border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-100/90 text-slate-900 font-bold">
                    <th className="py-2 px-2 text-center w-8 border-r border-slate-800">#</th>
                    <th className="py-2 px-3 border-r border-slate-800">Item name</th>
                    <th className="py-2 px-2 text-center w-20 border-r border-slate-800">HSN/ SAC</th>
                    <th className="py-2 px-2 text-center w-16 border-r border-slate-800">Quantity</th>
                    <th className="py-2 px-3 text-right w-24 border-r border-slate-800">Rate Card(₹)</th>
                    <th className="py-2 px-3 text-right w-28 border-r border-slate-800">Taxable amount(₹)</th>
                    <th className="py-2 px-3 text-right w-28 border-r border-slate-800">GST(%)</th>
                    <th className="py-2 px-3 text-right w-28">Amount(₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-2.5 px-2 text-center border-r border-slate-800 font-mono">1</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-medium">
                      <div className="font-bold text-slate-900 uppercase">{itemName}</div>
                      <div className="text-[10px] text-slate-500">Corporate Staff Transport Service</div>
                    </td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-800 font-mono">{hsnSac}</td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-800 font-bold font-mono">{quantity}</td>
                    <td className="py-2.5 px-3 text-right border-r border-slate-800 font-mono">₹ {rateCard.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="py-2.5 px-3 text-right border-r border-slate-800 font-mono font-bold">₹ {taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="py-2.5 px-3 text-right border-r border-slate-800 font-mono">
                      <div>₹ {totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                      <span className="text-[10px] text-slate-600 font-bold">({gstRate}%)</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                      ₹ {lineItemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  
                  {/* Total Row */}
                  <tr className="font-bold bg-slate-50 border-t border-slate-800">
                    <td className="py-2 px-2 text-center border-r border-slate-800"></td>
                    <td className="py-2 px-3 border-r border-slate-800 uppercase font-black">Total</td>
                    <td className="py-2 px-2 border-r border-slate-800"></td>
                    <td className="py-2 px-2 text-center border-r border-slate-800 font-mono font-black">{quantity}</td>
                    <td className="py-2 px-3 border-r border-slate-800"></td>
                    <td className="py-2 px-3 text-right border-r border-slate-800 font-mono font-black">
                      ₹ {taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 text-right border-r border-slate-800 font-mono font-black">
                      ₹ {totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-black text-slate-900">
                      ₹ {lineItemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 5. SPLIT SECTION: TAX SUMMARY (LEFT) + FINANCIAL TOTALS & DEDUCTIONS (RIGHT) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border-b border-slate-800">
              
              {/* Left Column: Tax Summary Table */}
              <div className="p-2.5">
                <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wide mb-1.5">
                  Tax Summary:
                </div>
                <div className="border border-slate-800 overflow-hidden">
                  <table className="w-full text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-800 font-bold text-slate-800">
                        <th rowSpan={2} className="py-1 px-1.5 text-center border-r border-slate-800">HSN/ SAC</th>
                        <th rowSpan={2} className="py-1 px-1.5 text-right border-r border-slate-800">Taxable amount (₹)</th>
                        <th colSpan={2} className="py-0.5 px-1 text-center border-r border-slate-800 border-b">CGST</th>
                        <th colSpan={2} className="py-0.5 px-1 text-center border-r border-slate-800 border-b">SGST</th>
                        <th rowSpan={2} className="py-1 px-1.5 text-right">Total Tax (₹)</th>
                      </tr>
                      <tr className="bg-slate-100 border-b border-slate-800 font-bold text-slate-700">
                        <th className="py-0.5 px-1 text-center border-r border-slate-800">Rate (%)</th>
                        <th className="py-0.5 px-1 text-right border-r border-slate-800">Amt (₹)</th>
                        <th className="py-0.5 px-1 text-center border-r border-slate-800">Rate (%)</th>
                        <th className="py-0.5 px-1 text-right border-r border-slate-800">Amt (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800 font-mono">
                        <td className="py-1.5 px-1.5 text-center border-r border-slate-800">{hsnSac}</td>
                        <td className="py-1.5 px-1.5 text-right border-r border-slate-800">{taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="py-1.5 px-1 text-center border-r border-slate-800">{halfGstRate}</td>
                        <td className="py-1.5 px-1 text-right border-r border-slate-800">{cgstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="py-1.5 px-1 text-center border-r border-slate-800">{halfGstRate}</td>
                        <td className="py-1.5 px-1 text-right border-r border-slate-800">{sgstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold">{totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr className="font-bold bg-slate-50 font-mono">
                        <td className="py-1.5 px-1.5 text-center border-r border-slate-800 font-sans font-black">TOTAL</td>
                        <td className="py-1.5 px-1.5 text-right border-r border-slate-800 font-bold">{taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="py-1.5 px-1 border-r border-slate-800"></td>
                        <td className="py-1.5 px-1 text-right border-r border-slate-800 font-bold">{cgstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="py-1.5 px-1 border-r border-slate-800"></td>
                        <td className="py-1.5 px-1 text-right border-r border-slate-800 font-bold">{sgstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="py-1.5 px-1.5 text-right font-black">{totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Totals, Deductions & Amount in Words */}
              <div className="p-3 space-y-1.5 text-[11px]">
                <div className="space-y-1 font-mono">
                  <div className="flex justify-between py-0.5 border-b border-slate-200">
                    <span className="font-semibold font-sans text-slate-700">Sub Total</span>
                    <span>:</span>
                    <strong className="text-right w-28 text-slate-900">₹ {subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  {gspRent > 0 && (
                    <div className="flex justify-between py-0.5 border-b border-slate-200 text-slate-700">
                      <span className="font-sans">GSP RENT</span>
                      <span>:</span>
                      <span className="text-right w-28 text-rose-600">- ₹ {gspRent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {tdsCgst > 0 && (
                    <div className="flex justify-between py-0.5 border-b border-slate-200 text-slate-700">
                      <span className="font-sans">TDSCGST</span>
                      <span>:</span>
                      <span className="text-right w-28 text-rose-600">- ₹ {tdsCgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {tdsAmount > 0 && (
                    <div className="flex justify-between py-0.5 border-b border-slate-200 text-slate-700">
                      <span className="font-sans">TDS@2%(192)</span>
                      <span>:</span>
                      <span className="text-right w-28 text-rose-600">₹ {tdsAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {roundOff !== 0 && (
                    <div className="flex justify-between py-0.5 border-b border-slate-200 text-slate-700">
                      <span className="font-sans">Round Off</span>
                      <span>:</span>
                      <span className="text-right w-28">{roundOff < 0 ? `- ₹ ${Math.abs(roundOff).toFixed(2)}` : `+ ₹ ${roundOff.toFixed(2)}`}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-t-2 border-b-2 border-slate-800 text-sm font-black text-slate-900">
                    <span className="font-sans uppercase">Total</span>
                    <span>:</span>
                    <strong className="text-right w-28 text-[#071B49]">₹ {finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                  </div>
                </div>

                {/* Amount in Words */}
                <div className="pt-1">
                  <div className="font-bold text-[10px] text-slate-600 uppercase">Invoice Amount in Words:</div>
                  <div className="font-bold text-xs text-slate-900 italic mt-0.5 bg-slate-50 p-1.5 border border-slate-200 rounded">
                    {amountInWords}
                  </div>
                </div>

                {/* Received & Balance Breakdown */}
                <div className="space-y-0.5 font-mono pt-1 text-[10px] text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-sans">Received</span>
                    <span>:</span>
                    <span className="text-right w-28">₹ {receivedAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span className="font-sans">Balance</span>
                    <span>:</span>
                    <span className="text-right w-28">₹ {balanceAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="font-sans">Invoice Value Before TDS</span>
                    <span>:</span>
                    <span className="text-right w-28">₹ {invoiceValueBeforeTds.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. TERMS & CONDITIONS */}
            <div className="p-2 border-b border-slate-800 bg-slate-50/50">
              <div className="font-bold text-[10px] text-slate-600 uppercase">Terms & Conditions:</div>
              <p className="text-[11px] text-slate-800 font-medium mt-0.5">
                Thanks for doing business with us!
              </p>
            </div>

            {/* 7. BANK DETAILS & AUTHORIZED SIGNATORY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
              
              {/* Left: Bank Coordinates with UPI QR Code */}
              <div className="p-3">
                <div className="font-bold text-[11px] text-slate-900 uppercase underline mb-2">
                  Bank Details:
                </div>
                <div className="flex items-start gap-3">
                  {/* UPI QR Code */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-20 h-20 border border-slate-300 p-1 bg-white rounded shadow-xs flex items-center justify-center">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=919902278722@okaxis&pn=SHARANAJYOTI%20TOURS%20AND%20TRAVELS%20PVT%20LTD&am=${finalTotal}&cu=INR`} 
                        alt="UPI QR Code" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <QrCode className="w-12 h-12 text-slate-800" style={{ display: 'none' }} />
                    </div>
                    <span className="bg-emerald-600 text-white font-black text-[8px] tracking-wider uppercase px-1.5 py-0.5 rounded mt-1">
                      UPI SCAN TO PAY
                    </span>
                  </div>

                  {/* Bank Account Details */}
                  <div className="space-y-1 text-[11px] text-slate-800 leading-snug">
                    <div>
                      <strong className="text-slate-600">Name : </strong>
                      <span className="font-bold text-slate-900">{bank.name}</span>
                    </div>
                    <div>
                      <strong className="text-slate-600">Account No. : </strong>
                      <span className="font-mono font-bold text-slate-900">{bank.accountNo}</span>
                    </div>
                    <div>
                      <strong className="text-slate-600">IFSC code : </strong>
                      <span className="font-mono font-bold text-slate-900">{bank.ifsc}</span>
                    </div>
                    <div>
                      <strong className="text-slate-600">Account holder's name : </strong>
                      <span className="font-bold text-slate-900">{bank.holder}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Authorized Signatory */}
              <div className="p-3 flex flex-col justify-between">
                <div className="text-right">
                  <div className="font-black text-xs text-slate-900 uppercase">
                    For {seller.name}:
                  </div>
                </div>

                <div className="pt-8 text-center sm:text-right space-y-1">
                  {/* Digital Signature representation matching image */}
                  <div className="inline-block text-right">
                    <div className="font-serif italic text-base font-bold text-blue-950 tracking-wider">
                      Sharanappa
                    </div>
                    <div className="w-40 border-b border-slate-700 mx-auto sm:ml-auto mt-1"></div>
                    <div className="font-bold text-xs text-slate-800 mt-1">
                      Authorized Signatory
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="pt-2 text-center text-[10px] text-slate-400 print:text-[8px]">
            This is a computer-generated GST tax invoice compliant with Rule 46 of the CGST Rules, 2017.
          </div>
        </div>

        {/* Modal Bottom Action Bar (Hidden when printing) */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Vyapar format verified · Ready for B2B GST tax returns & client dispatch</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                alert(`Official Tax Invoice ${invoiceNo} sent to client billing accounts at ${clientName.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`);
              }}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Client</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-5 py-2 bg-[#071B49] hover:bg-blue-900 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/20 transition-all cursor-pointer"
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

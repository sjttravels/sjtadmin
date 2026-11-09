// Export Utilities for Admin Panel (Excel/CSV & PDF/Print)

export function exportToExcel(filename: string, headers: string[], rows: (string | number)[][]) {
  const escapeCsv = (val: string | number | null | undefined) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  // Prepend UTF-8 Byte Order Mark (BOM) \uFEFF so Microsoft Excel opens Unicode text properly
  const csvContent = '\uFEFF' + [
    headers.map(escapeCsv).join(','),
    ...rows.map(row => row.map(escapeCsv).join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printSectionTable(title: string, subtitle: string, headers: string[], rows: (string | number)[][]) {
  const printWindow = window.open('', '_blank', 'width=1100,height=800');
  if (!printWindow) {
    alert('Please allow popups to print / save PDF.');
    return;
  }
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${title} - SJT Tours & Travels</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 24px; color: #0f172a; margin: 0; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #071B49; padding-bottom: 14px; margin-bottom: 18px; }
          .company-name { font-size: 20px; font-weight: 900; color: #071B49; margin: 0; text-transform: uppercase; letter-spacing: -0.5px; }
          .company-meta { font-size: 11px; color: #64748b; margin-top: 3px; font-weight: 500; }
          .report-title { font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 8px; text-transform: uppercase; }
          .report-meta { font-size: 11px; color: #475569; margin-top: 2px; }
          .actions { display: flex; gap: 8px; }
          .print-btn { padding: 8px 16px; background: #071B49; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 11px; }
          th { background: #f1f5f9; color: #0f172a; font-weight: 800; text-align: left; padding: 8px 10px; border: 1px solid #cbd5e1; text-transform: uppercase; font-size: 10px; }
          td { padding: 7px 10px; border: 1px solid #e2e8f0; font-size: 11px; }
          tr:nth-child(even) td { background: #f8fafc; }
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; text-transform: uppercase; }
          .badge-green { background: #dcfce7; color: #166534; }
          .badge-blue { background: #dbeafe; color: #1e40af; }
          .badge-amber { background: #fef3c7; color: #92400e; }
          .badge-red { background: #fee2e2; color: #991b1b; }
          .footer { margin-top: 24px; font-size: 10px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          @media print {
            body { padding: 0; }
            .print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="company-name">SHARANAJYOTI TOURS & TRAVELS PVT LTD</h1>
            <div class="company-meta">GSTIN: 29ABOCS4536M1ZI • State: 29-Karnataka • Nagasandra Bengaluru • Phone: 919902278722</div>
            <div class="report-title">${title}</div>
            <div class="report-meta">${subtitle} • Printed on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
          </div>
          <div class="actions">
            <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${rows.map(r => `<tr>${r.map(c => `<td>${c ?? ''}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        <div class="footer">
          SHARANAJYOTI TOURS & TRAVELS PVT LTD — Official Fleet Management Document • Total Records: ${rows.length}
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;
  printWindow.document.write(html);
  printWindow.document.close();
}


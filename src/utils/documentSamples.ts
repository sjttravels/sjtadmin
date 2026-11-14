// Official High-Fidelity SVG Document Sample Generators for SJT Travels Commercial Induction

function encodeSvg(svg: string): string {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.trim());
}

export function generateDlFront(name = 'Anand Gowda', dlNo = 'KA-04-2018-0091823', issueDate = '2018-05-20', expiryDate = '2038-05-19'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <defs>
      <linearGradient id="dlCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb"/>
        <stop offset="100%" stop-color="#fef3c7"/>
      </linearGradient>
      <linearGradient id="govHdr" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#b45309"/>
        <stop offset="50%" stop-color="#d97706"/>
        <stop offset="100%" stop-color="#b45309"/>
      </linearGradient>
    </defs>
    <rect width="600" height="380" rx="16" fill="url(#dlCardBg)" stroke="#b45309" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="60" rx="16" fill="url(#govHdr)"/>
    <rect x="0" y="40" width="600" height="20" fill="url(#govHdr)"/>
    
    <circle cx="45" cy="30" r="20" fill="#ffffff" opacity="0.95"/>
    <text x="45" y="35" font-family="Arial, sans-serif" font-size="12" font-weight="900" text-anchor="middle" fill="#78350f">KA</text>
    <text x="310" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="1">GOVERNMENT OF KARNATAKA - MOTOR VEHICLES DEPT</text>
    <text x="310" y="44" font-family="Arial, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="2">DRIVING LICENCE - FORM 7 (COMMERCIAL)</text>
    
    <rect x="25" y="80" width="115" height="145" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
    <circle cx="82" cy="125" r="28" fill="#94a3b8"/>
    <path d="M45,205 C45,165 120,165 120,205 Z" fill="#475569"/>
    <text x="82" y="215" font-family="Arial, sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#0f172a">PHOTO</text>
    
    <rect x="25" y="235" width="115" height="40" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
    <path d="M 35 260 Q 60 240 85 255 T 125 250" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="82" y="270" font-family="Arial, sans-serif" font-size="8" text-anchor="middle" fill="#64748b">CHAUFFEUR SIGN</text>

    <text x="155" y="98" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">LICENCE NUMBER:</text>
    <text x="280" y="98" font-family="Courier, monospace" font-size="15" font-weight="900" fill="#b45309">${dlNo}</text>
    
    <text x="155" y="125" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">CHAUFFEUR NAME:</text>
    <text x="280" y="125" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">${name.toUpperCase()}</text>

    <text x="155" y="150" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">FATHER'S NAME:</text>
    <text x="280" y="150" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#334155">NARAYANA GOWDA</text>

    <text x="155" y="175" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">AUTHORIZATION:</text>
    <text x="280" y="175" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#047857">LMV-TR, TRANS (COMMERCIAL PASSENGER / TAXI)</text>

    <text x="155" y="200" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">ISSUED DATE:</text>
    <text x="280" y="200" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">${issueDate}</text>

    <text x="155" y="225" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">TRANSPORT VALIDITY:</text>
    <text x="280" y="225" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#b91c1c">${expiryDate}</text>

    <text x="155" y="250" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">ISSUING AUTHORITY:</text>
    <text x="280" y="250" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#334155">RTO BENGALURU CENTRAL (KA-04)</text>

    <rect x="0" y="295" width="600" height="85" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>
    <text x="25" y="325" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#92400e">CHIP SERIAL: KA04/2018/88219 · BLOOD GROUP: O+VE</text>
    <text x="25" y="345" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#92400e">PSV BADGE: PSV-BLR-88392 (COMMERCIAL TAXI / BUS)</text>
    <circle cx="535" cy="335" r="22" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="4,2"/>
    <text x="535" y="339" font-family="Arial, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#b45309">SEAL RTO</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateDlBack(name = 'Anand Gowda', dlNo = 'KA-04-2018-0091823'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#fffbeb" stroke="#b45309" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="40" fill="#b45309"/>
    <text x="300" y="26" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">ENDORSEMENTS & EMERGENCY DETAILS (BACK SIDE)</text>
    
    <rect x="25" y="60" width="550" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="40" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b">VEHICLE CLASSES ENDORSED:</text>
    <text x="40" y="110" font-family="Arial, sans-serif" font-size="11" fill="#334155">1. MCWG (Motor Cycle with Gear) - Issue: 12-04-2010</text>
    <text x="40" y="130" font-family="Arial, sans-serif" font-size="11" fill="#334155">2. LMV-NT (Light Motor Vehicle Non-Transport) - Issue: 15-06-2012</text>
    <text x="40" y="150" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#047857">3. TRANS / LMV-TR (Commercial Transport Cab / Tourist) - Issue: 20-05-2018</text>
    <text x="40" y="170" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#047857">4. PSV BUS / MAXI CAB (Public Service Vehicle Heavy) - Issue: 10-02-2019</text>
    <text x="40" y="195" font-family="Arial, sans-serif" font-size="10" fill="#64748b">BADGE ENDORSEMENT NO: PSV-BLR-88392 / RTO BENGALURU CENTRAL</text>

    <rect x="25" y="230" width="550" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="40" y="255" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">EMERGENCY CONTACT & ADDRESS:</text>
    <text x="40" y="275" font-family="Arial, sans-serif" font-size="11" fill="#334155">Residential: Nagasandra BGS Layout, Outer Ring Road, Bengaluru - 560073</text>
    <text x="40" y="295" font-family="Arial, sans-serif" font-size="11" fill="#334155">Emergency Contact: Suma Gowda (Spouse) - +91 98450 99881</text>
    <text x="40" y="315" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#b45309">DISCLAIMER: Valid across Republic of India under Motor Vehicles Act, 1988</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateBadge(name = 'Anand Gowda', badgeNo = 'PSV-BLR-88392', vehicleType = 'Commercial Passenger Vehicle'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#f0fdf4" stroke="#16a34a" stroke-width="4"/>
    <rect x="0" y="0" width="600" height="55" rx="16" fill="#15803d"/>
    <text x="300" y="26" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">KARNATAKA MOTOR VEHICLES DEPARTMENT</text>
    <text x="300" y="44" font-family="Arial, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#ffffff">PUBLIC SERVICE VEHICLE (PSV) DRIVER BADGE</text>

    <rect x="25" y="75" width="120" height="150" rx="8" fill="#e2e8f0" stroke="#15803d" stroke-width="2"/>
    <circle cx="85" cy="120" r="30" fill="#15803d" opacity="0.6"/>
    <path d="M45,200 C45,160 125,160 125,200 Z" fill="#15803d"/>
    <text x="85" y="212" font-family="Arial, sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#ffffff">PSV DRIVER</text>

    <text x="165" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#64748b">BADGE NUMBER:</text>
    <text x="280" y="100" font-family="Courier, monospace" font-size="18" font-weight="900" fill="#15803d">${badgeNo}</text>

    <text x="165" y="130" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#64748b">DRIVER NAME:</text>
    <text x="280" y="130" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">${name.toUpperCase()}</text>

    <text x="165" y="160" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#64748b">AUTHORIZED FOR:</text>
    <text x="280" y="160" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#15803d">${vehicleType}</text>

    <text x="165" y="190" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#64748b">ISSUING RTO:</text>
    <text x="280" y="190" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#334155">RTO BENGALURU (KA-04)</text>

    <text x="165" y="220" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#64748b">VALIDITY:</text>
    <text x="280" y="220" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#b91c1c">09-FEB-2029 (RENEWABLE)</text>

    <rect x="25" y="245" width="550" height="110" rx="8" fill="#dcfce7" stroke="#86efac"/>
    <text x="40" y="275" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#166534">POLICE & CHARACTER VERIFICATION: SATISFACTORY / CLEARED</text>
    <text x="40" y="295" font-family="Arial, sans-serif" font-size="11" fill="#166534">Commercial Driver complies with Section 7 of KMV Rules 1989</text>
    <circle cx="510" cy="300" r="28" fill="none" stroke="#15803d" stroke-width="2" stroke-dasharray="3,3"/>
    <text x="510" y="304" font-family="Arial, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#15803d">RTO KA-04</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateAadhaar(name = 'Anand Gowda', aadhaarNo = '5421 8892 1045', dob = '15/06/1988'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="0" y="0" width="600" height="50" fill="#fef08a"/>
    <text x="300" y="25" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#854d0e">भारत सरकार / GOVERNMENT OF INDIA</text>
    <text x="300" y="42" font-family="Arial, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#dc2626">भारतीय विशिष्ट पहचान प्राधिकरण / UIDAI</text>

    <rect x="25" y="70" width="115" height="145" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
    <circle cx="82" cy="120" r="26" fill="#cbd5e1"/>
    <path d="M45,195 C45,160 120,160 120,195 Z" fill="#94a3b8"/>

    <text x="160" y="95" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">${name}</text>
    <text x="160" y="120" font-family="Arial, sans-serif" font-size="12" fill="#475569">जन्म तिथि / DOB: ${dob}</text>
    <text x="160" y="145" font-family="Arial, sans-serif" font-size="12" fill="#475569">पुरुष / Male</text>
    <text x="160" y="170" font-family="Arial, sans-serif" font-size="11" fill="#475569">पता: Outer Ring Road, BGS Layout, Bengaluru - 560073</text>

    <rect x="460" y="75" width="115" height="115" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
    <rect x="475" y="90" width="25" height="25" fill="#0f172a"/>
    <rect x="535" y="90" width="25" height="25" fill="#0f172a"/>
    <rect x="475" y="150" width="25" height="25" fill="#0f172a"/>

    <rect x="0" y="240" width="600" height="60" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="300" y="278" font-family="Courier, monospace" font-size="24" font-weight="900" text-anchor="middle" fill="#dc2626" letter-spacing="4">${aadhaarNo}</text>

    <text x="300" y="335" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#047857">मेरा आधार, मेरी पहचान</text>
    <text x="300" y="355" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#64748b">Proof of Identity, not Proof of Citizenship</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generatePoliceCert(name = 'Anand Gowda', issueDate = '2026-01-15', expiryDate = '2027-01-14'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="12" fill="#ffffff" stroke="#1e3a8a" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="65" fill="#1e3a8a"/>
    <text x="300" y="26" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">KARNATAKA STATE POLICE · BENGALURU CITY POLICE</text>
    <text x="300" y="48" font-family="Arial, sans-serif" font-size="16" font-weight="900" text-anchor="middle" fill="#fbbf24">POLICE VERIFICATION & CLEARANCE CERTIFICATE</text>

    <text x="40" y="100" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">CERTIFICATE REF:</text>
    <text x="160" y="100" font-family="Courier, monospace" font-size="13" font-weight="bold" fill="#1e3a8a">KSP/BLR-N/2026/091823-PCC</text>

    <text x="400" y="100" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">DATE OF ISSUE:</text>
    <text x="500" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">${issueDate}</text>

    <rect x="35" y="120" width="530" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="50" y="145" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">This is to certify that Sri <tspan font-weight="bold">${name.toUpperCase()}</tspan>, S/o Sri Narayana Gowda,</text>
    <text x="50" y="170" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">residing at Nagasandra BGS Layout, Bengaluru - 560073, has been verified</text>
    <text x="50" y="195" font-family="Arial, sans-serif" font-size="12" fill="#1e293b">through the Crime & Criminal Tracking Network & Systems (CCTNS) database.</text>
    
    <rect x="50" y="215" width="500" height="40" rx="6" fill="#dcfce7" stroke="#16a34a"/>
    <text x="300" y="240" font-family="Arial, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#166534">STATUS: NO ADVERSE OR CRIMINAL RECORD FOUND (CLEARED)</text>

    <text x="40" y="300" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626">VALIDITY: ${issueDate} to ${expiryDate} (ANNUAL RENEWAL)</text>
    <text x="400" y="320" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#1e293b">Inspector of Police, Peenya Sub-Division</text>
    <circle cx="200" cy="320" r="24" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,2"/>
    <text x="200" y="324" font-family="Arial, sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#dc2626">KSP SEAL</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateMedicalCert(name = 'Anand Gowda', issueDate = '2026-02-20', expiryDate = '2027-02-19'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="12" fill="#ffffff" stroke="#0284c7" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="60" fill="#0284c7"/>
    <text x="300" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">CENTRAL MOTOR VEHICLES RULES, 1989</text>
    <text x="300" y="46" font-family="Arial, sans-serif" font-size="16" font-weight="900" text-anchor="middle" fill="#ffffff">FORM 1-A: MEDICAL FITNESS CERTIFICATE</text>

    <text x="40" y="95" font-family="Arial, sans-serif" font-size="12" fill="#334155">I, Dr. K. R. Sharma, MBBS, Reg No: KMC-49120, certify that I have examined:</text>
    <text x="40" y="125" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#0f172a">NAME OF DRIVER: ${name.toUpperCase()} (AGE: 38 YEARS)</text>

    <rect x="40" y="145" width="520" height="135" rx="8" fill="#f0f9ff" stroke="#bae6fd"/>
    <text x="55" y="170" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0369a1">CLINICAL OBSERVATIONS:</text>
    <text x="55" y="195" font-family="Arial, sans-serif" font-size="11" fill="#334155">1. Vision Test (Distant Vision): Right Eye: 6/6 · Left Eye: 6/6 (Normal)</text>
    <text x="55" y="215" font-family="Arial, sans-serif" font-size="11" fill="#334155">2. Color Vision: Normal (Pass Ishihara 38 Plates Test)</text>
    <text x="55" y="235" font-family="Arial, sans-serif" font-size="11" fill="#334155">3. Hearing & Reflexes: Normal · Blood Pressure: 120/80 mmHg</text>
    <text x="55" y="260" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#047857">FITNESS DECLARATION: CERTIFIED FIT TO DRIVE COMMERCIAL VEHICLES</text>

    <text x="40" y="310" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626">VALIDITY: ${issueDate} to ${expiryDate}</text>
    <text x="420" y="325" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#0284c7">Dr. K. R. Sharma, MBBS</text>
    <text x="420" y="340" font-family="Arial, sans-serif" font-size="9" text-anchor="middle" fill="#64748b">Govt. Hospital, Bengaluru</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateDriverPhoto(name = 'Anand Gowda'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480">
    <defs>
      <linearGradient id="photoBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="400" height="480" fill="url(#photoBg)"/>
    <circle cx="200" cy="180" r="90" fill="#fed7aa"/>
    <path d="M110,170 C110,90 290,90 290,170 C280,120 120,120 110,170 Z" fill="#1c1917"/>
    <circle cx="170" cy="170" r="8" fill="#1c1917"/>
    <circle cx="230" cy="170" r="8" fill="#1c1917"/>
    <path d="M185,210 Q200,225 215,210" fill="none" stroke="#78350f" stroke-width="4"/>
    <path d="M70,480 L120,290 L280,290 L330,480 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <polygon points="175,290 200,340 225,290" fill="#1e3a8a"/>
    <polygon points="190,340 200,450 210,340" fill="#1e3a8a"/>
    <rect x="235" y="340" width="60" height="35" rx="4" fill="#fbbf24"/>
    <text x="265" y="362" font-family="Arial, sans-serif" font-size="9" font-weight="900" text-anchor="middle" fill="#0f172a">SJT FLEET</text>

    <rect x="0" y="420" width="400" height="60" fill="#0f172a" opacity="0.9"/>
    <text x="200" y="445" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${name.toUpperCase()}</text>
    <text x="200" y="465" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#38bdf8">CERTIFIED COMMERCIAL CHAUFFEUR</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateRcBook(vehicleReg = 'KA 05 AU 1234', model = 'Force Tempo Traveller 3350 AC', fuel = 'Diesel'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#fefce8" stroke="#ca8a04" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="55" rx="16" fill="#ca8a04"/>
    <text x="300" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">GOVERNMENT OF KARNATAKA - TRANSPORT DEPARTMENT</text>
    <text x="300" y="44" font-family="Arial, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#ffffff">CERTIFICATE OF REGISTRATION - FORM 23 (COMMERCIAL)</text>

    <rect x="30" y="75" width="220" height="45" rx="8" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
    <text x="140" y="105" font-family="Courier, monospace" font-size="20" font-weight="900" text-anchor="middle" fill="#0f172a">${vehicleReg}</text>

    <text x="280" y="92" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">CLASS OF VEHICLE:</text>
    <text x="400" y="92" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#0f172a">MAXI CAB / COMMERCIAL</text>

    <text x="280" y="112" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">SEATING CAPACITY:</text>
    <text x="400" y="112" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">17 IN ALL (INCL DRIVER)</text>

    <rect x="30" y="135" width="540" height="150" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
    <text x="45" y="160" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">MAKER / MODEL:</text>
    <text x="180" y="160" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">${model}</text>

    <text x="45" y="185" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">CHASSIS NUMBER:</text>
    <text x="180" y="185" font-family="Courier, monospace" font-size="12" font-weight="bold" fill="#0f172a">MB1A15BA1N8821940</text>

    <text x="45" y="210" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">ENGINE NUMBER:</text>
    <text x="180" y="210" font-family="Courier, monospace" font-size="12" font-weight="bold" fill="#0f172a">FM26CR8849102</text>

    <text x="45" y="235" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">FUEL TYPE:</text>
    <text x="180" y="235" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">${fuel} · BS-VI EMISSION COMPLIANT</text>

    <text x="45" y="260" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">OWNER NAME:</text>
    <text x="180" y="260" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">SJT LOGISTICS & TRAVELS FLEET PARTNER</text>

    <rect x="30" y="300" width="540" height="65" fill="#fef9c3" rx="6"/>
    <text x="45" y="325" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#854d0e">REGISTRATION DATE: 12-MAR-2023 · FITNESS VALID TILL: 28-FEB-2026</text>
    <text x="45" y="345" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#854d0e">REGISTERING AUTHORITY: RTO BENGALURU SOUTH (KA-05) - YELLOW BOARD</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateInsurance(vehicleReg = 'KA 05 AU 1234', model = 'Force Tempo Traveller 3350 AC', expiryDate = '2027-08-15'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#ffffff" stroke="#2563eb" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="60" rx="16" fill="#1e40af"/>
    <text x="300" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">ICICI LOMBARD GENERAL INSURANCE CO. LTD.</text>
    <text x="300" y="46" font-family="Arial, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#93c5fd">COMMERCIAL VEHICLE COMPREHENSIVE POLICY</text>

    <text x="35" y="90" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">POLICY NUMBER:</text>
    <text x="160" y="90" font-family="Courier, monospace" font-size="13" font-weight="bold" fill="#1e40af">3001/2026/8849102-00</text>

    <text x="350" y="90" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">INSURED VEHICLE:</text>
    <text x="480" y="90" font-family="Courier, monospace" font-size="14" font-weight="900" fill="#dc2626">${vehicleReg}</text>

    <rect x="30" y="110" width="540" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="45" y="135" font-family="Arial, sans-serif" font-size="11" fill="#334155">Insured Name: SJT Logistics & Travels Partner</text>
    <text x="45" y="155" font-family="Arial, sans-serif" font-size="11" fill="#334155">Vehicle Make & Model: ${model}</text>
    <text x="45" y="175" font-family="Arial, sans-serif" font-size="11" fill="#334155">Seating: 17 Passengers · Fuel: Diesel · IDV (Insured Declared Value): ₹ 14,50,000</text>
    <text x="45" y="200" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#047857">Coverage: Comprehensive Own Damage + Third Party Unlimited Liability</text>
    <text x="45" y="220" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#047857">Add-ons: Zero Depreciation + Nil Deductible + Passenger PA Cover (₹ 5L each)</text>
    <text x="45" y="245" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#dc2626">PERIOD OF INSURANCE: 16-AUG-2026 TO 15-AUG-2027 (ACTIVE)</text>

    <rect x="30" y="290" width="540" height="70" fill="#eff6ff" rx="6"/>
    <text x="45" y="315" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1e40af">24x7 ROADSIDE ASSISTANCE: 1800 2666 · TOLL FREE FLEET HELPLINE</text>
    <text x="45" y="335" font-family="Arial, sans-serif" font-size="10" fill="#1e40af">Duly authorized under Section 146 of the Motor Vehicles Act, 1988</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateFitnessCert(vehicleReg = 'KA 05 AU 1234', expiryDate = '2026-02-28'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#ffffff" stroke="#059669" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="55" rx="16" fill="#059669"/>
    <text x="300" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">KARNATAKA MOTOR VEHICLES DEPARTMENT</text>
    <text x="300" y="44" font-family="Arial, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#ffffff">FORM 38: CERTIFICATE OF FITNESS (FC)</text>

    <rect x="30" y="75" width="540" height="175" rx="8" fill="#f0fdf4" stroke="#a7f3d0"/>
    <text x="45" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#065f46">CERTIFICATE NO: FC/KA05/2024/9901</text>
    <text x="45" y="125" font-family="Arial, sans-serif" font-size="12" fill="#065f46">Registration Mark: <tspan font-weight="bold">${vehicleReg}</tspan> (Maxi Cab Commercial)</text>
    
    <text x="45" y="155" font-family="Arial, sans-serif" font-size="11" fill="#334155">Inspection Details: Brake Efficiency &gt; 80% (Passed)</text>
    <text x="45" y="175" font-family="Arial, sans-serif" font-size="11" fill="#334155">Speed Governor: Calibrated & Sealed at 80 km/h (Rule 118 Compliance)</text>
    <text x="45" y="195" font-family="Arial, sans-serif" font-size="11" fill="#334155">Safety Equipment: First Aid Kit, Fire Extinguisher, GPS & SOS Panic Button Verified</text>
    <text x="45" y="225" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#047857">STATUS: VEHICLE COMPLIES WITH ALL STATUTORY SAFETY REQUIREMENTS</text>

    <rect x="30" y="270" width="540" height="85" fill="#ffffff" stroke="#e2e8f0" rx="8"/>
    <text x="45" y="300" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#dc2626">EXPIRY DATE: ${expiryDate}</text>
    <text x="45" y="325" font-family="Arial, sans-serif" font-size="10" fill="#475569">Inspected by: Senior Motor Vehicle Inspector, RTO Bengaluru South</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generatePermit(vehicleReg = 'KA 05 AU 1234', expiryDate = '2028-06-30'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#f8fafc" stroke="#475569" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="55" rx="16" fill="#334155"/>
    <text x="300" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">STATE TRANSPORT AUTHORITY, KARNATAKA</text>
    <text x="300" y="44" font-family="Arial, sans-serif" font-size="14" font-weight="900" text-anchor="middle" fill="#38bdf8">FORM 46: ALL INDIA / STATE TOURIST CAB PERMIT</text>

    <text x="35" y="90" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">PERMIT NUMBER:</text>
    <text x="160" y="90" font-family="Courier, monospace" font-size="14" font-weight="bold" fill="#0f172a">AITP/KAR/2023/8871-STA</text>

    <rect x="30" y="110" width="540" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
    <text x="45" y="135" font-family="Arial, sans-serif" font-size="11" fill="#334155">Vehicle Reg: <tspan font-weight="bold">${vehicleReg}</tspan> (Seating: 17)</text>
    <text x="45" y="160" font-family="Arial, sans-serif" font-size="11" fill="#334155">Permit Holder: SJT Logistics & Travels Partner</text>
    <text x="45" y="185" font-family="Arial, sans-serif" font-size="11" fill="#334155">Route / Area: All Roads in Karnataka & Tourist Circuits of South India</text>
    <text x="45" y="210" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#047857">Authorized Purpose: Contract Carriage / IT Corporate Shuttle / Tourist Cab</text>
    <text x="45" y="235" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#dc2626">PERMIT VALIDITY: 01-JUL-2023 TO ${expiryDate}</text>

    <rect x="30" y="280" width="540" height="75" fill="#f1f5f9" rx="8"/>
    <text x="45" y="305" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1e293b">CONDITIONS: Must carry valid Tax Receipt, Insurance, Fitness and Emission Certificates</text>
    <text x="45" y="325" font-family="Arial, sans-serif" font-size="9" fill="#64748b">Issued under Section 88(9) of the Motor Vehicles Act, 1988</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateRoadTax(vehicleReg = 'KA 05 AU 1234', expiryDate = '2027-03-31'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="55" rx="16" fill="#7c3aed"/>
    <text x="300" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">GOVERNMENT OF KARNATAKA - COMMERCIAL TAX DEPT</text>
    <text x="300" y="44" font-family="Arial, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#ffffff">MOTOR VEHICLES TAXATION RECEIPT (KMVT ACT)</text>

    <text x="35" y="90" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">RECEIPT NO:</text>
    <text x="140" y="90" font-family="Courier, monospace" font-size="13" font-weight="bold" fill="#7c3aed">KARTAX/2026/04-8819</text>

    <rect x="30" y="110" width="540" height="150" rx="8" fill="#faf5ff" stroke="#e9d5ff"/>
    <text x="45" y="135" font-family="Arial, sans-serif" font-size="11" fill="#334155">Vehicle Reg: <tspan font-weight="bold">${vehicleReg}</tspan> (Yellow Board Commercial Maxi Cab)</text>
    <text x="45" y="160" font-family="Arial, sans-serif" font-size="11" fill="#334155">Owner: SJT Logistics & Travels Partner</text>
    <text x="45" y="185" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Tax Category: Commercial Passenger Vehicle Quarterly Fleet Levy</text>
    <text x="45" y="210" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#7c3aed">TAX PAID AMOUNT: ₹ 8,400 (E-Payment Confirmed)</text>
    <text x="45" y="235" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#047857">TAX PERIOD VALID TILL: ${expiryDate}</text>

    <rect x="30" y="280" width="540" height="75" fill="#ffffff" stroke="#cbd5e1" rx="8"/>
    <text x="45" y="305" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#475569">PAYMENT REF: RAZORPAY / K-TREASURY REF: TXN-BLR-2026-90412</text>
    <text x="45" y="325" font-family="Arial, sans-serif" font-size="9" fill="#64748b">Digital receipt valid under Karnataka Motor Vehicles Taxation Act, 1957</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateEmissionCert(vehicleReg = 'KA 05 AU 1234', expiryDate = '2026-12-14'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <rect width="600" height="380" rx="16" fill="#ffffff" stroke="#16a34a" stroke-width="3"/>
    <rect x="0" y="0" width="600" height="55" rx="16" fill="#15803d"/>
    <text x="300" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">MINISTRY OF ROAD TRANSPORT & HIGHWAYS (MORTH)</text>
    <text x="300" y="44" font-family="Arial, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#bbf7d0">POLLUTION UNDER CONTROL (PUC) CERTIFICATE</text>

    <text x="35" y="90" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b">PUC CERTIFICATE NO:</text>
    <text x="180" y="90" font-family="Courier, monospace" font-size="13" font-weight="bold" fill="#15803d">KA05-PUC-2026-77192</text>

    <rect x="30" y="110" width="540" height="150" rx="8" fill="#f0fdf4" stroke="#bbf7d0"/>
    <text x="45" y="135" font-family="Arial, sans-serif" font-size="11" fill="#334155">Vehicle Reg: <tspan font-weight="bold">${vehicleReg}</tspan> · Fuel: Diesel · Emission Norm: BS-VI</text>
    <text x="45" y="160" font-family="Arial, sans-serif" font-size="11" fill="#334155">Light Absorption Co-efficient (k): 0.42 m-1 (Max Allowed Limit: 1.62 m-1)</text>
    <text x="45" y="185" font-family="Arial, sans-serif" font-size="11" fill="#334155">Smoke Density: 16.5 HSU (Max Allowed Limit: 50.0 HSU)</text>
    <text x="45" y="210" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#15803d">RESULT: PASSED (EMISSION WITHIN PRESCRIBED LIMITS)</text>
    <text x="45" y="235" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#dc2626">TEST DATE: 15-JUN-2026 · VALID UP TO: ${expiryDate}</text>

    <rect x="30" y="280" width="540" height="75" fill="#ffffff" stroke="#cbd5e1" rx="8"/>
    <text x="45" y="305" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#334155">TESTING CENTER: BGS Auto Emission Test Center (RTO Auth # KA05-EC-42)</text>
    <text x="45" y="325" font-family="Arial, sans-serif" font-size="9" fill="#64748b">Tested on computerized smoke meter complying with Rule 115(7) of CMV Rules</text>
  </svg>`;
  return encodeSvg(svg);
}

export function generateVehiclePhoto(vehicleReg = 'KA 05 AU 1234', model = 'Force Tempo Traveller 3350 AC'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#e0f2fe"/>
      </linearGradient>
    </defs>
    <rect width="600" height="380" fill="url(#skyGrad)"/>
    <rect x="0" y="260" width="600" height="120" fill="#334155"/>
    <line x1="0" y1="320" x2="600" y2="320" stroke="#facc15" stroke-width="4" stroke-dasharray="25,15"/>

    <path d="M70,250 L80,120 L160,110 L450,110 L520,160 L520,250 Z" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
    
    <rect x="170" y="125" width="80" height="50" rx="4" fill="#0284c7" opacity="0.8"/>
    <rect x="260" y="125" width="80" height="50" rx="4" fill="#0284c7" opacity="0.8"/>
    <rect x="350" y="125" width="80" height="50" rx="4" fill="#0284c7" opacity="0.8"/>
    <path d="M440,125 L500,165 L440,165 Z" fill="#0284c7" opacity="0.8"/>

    <circle cx="160" cy="260" r="35" fill="#1e293b" stroke="#64748b" stroke-width="5"/>
    <circle cx="160" cy="260" r="18" fill="#94a3b8"/>
    <circle cx="430" cy="260" r="35" fill="#1e293b" stroke="#64748b" stroke-width="5"/>
    <circle cx="430" cy="260" r="18" fill="#94a3b8"/>

    <rect x="200" y="195" width="180" height="35" rx="6" fill="#1e3a8a"/>
    <text x="290" y="218" font-family="Arial, sans-serif" font-size="14" font-weight="900" text-anchor="middle" fill="#ffffff">SJT TRAVELS FLEET</text>

    <rect x="460" y="215" width="95" height="30" rx="4" fill="#facc15" stroke="#0f172a" stroke-width="2"/>
    <text x="507" y="235" font-family="Courier, monospace" font-size="11" font-weight="900" text-anchor="middle" fill="#0f172a">${vehicleReg}</text>

    <rect x="20" y="15" width="280" height="40" rx="8" fill="#0f172a" opacity="0.85"/>
    <text x="160" y="32" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#38bdf8">VEHICLE VERIFICATION PHOTO</text>
    <text x="160" y="47" font-family="Arial, sans-serif" font-size="10" fill="#ffffff">${model}</text>
  </svg>`;
  return encodeSvg(svg);
}

// Aggregator that returns the full 14 induction documents map
export function getDefaultInductionDocuments(driverName = 'Anand Gowda', vehicleReg = 'KA 05 AU 1234') {
  return {
    dl: {
      file_name: 'driving_licence_front.jpg',
      data: generateDlFront(driverName, 'KA-04-2018-0091823', '2018-05-20', '2038-05-19'),
      expires_at: '2038-05-19',
      status: 'APPROVED' as const
    },
    dl_back: {
      file_name: 'driving_licence_back.jpg',
      data: generateDlBack(driverName, 'KA-04-2018-0091823'),
      expires_at: '2038-05-19',
      status: 'APPROVED' as const
    },
    badge: {
      file_name: 'commercial_psv_badge.jpg',
      data: generateBadge(driverName, 'PSV-BLR-88392'),
      expires_at: '2029-02-09',
      status: 'APPROVED' as const
    },
    aadhaar: {
      file_name: 'aadhaar_card.jpg',
      data: generateAadhaar(driverName, '5421 8892 1045'),
      expires_at: 'Lifetime',
      status: 'APPROVED' as const
    },
    police_certificate: {
      file_name: 'police_clearance_certificate.jpg',
      data: generatePoliceCert(driverName, '2026-01-15', '2027-01-14'),
      expires_at: '2027-01-14',
      status: 'APPROVED' as const
    },
    medical_certificate: {
      file_name: 'medical_fitness_form_1a.jpg',
      data: generateMedicalCert(driverName, '2026-02-20', '2027-02-19'),
      expires_at: '2027-02-19',
      status: 'APPROVED' as const
    },
    passport_photo: {
      file_name: 'chauffeur_passport_photo.jpg',
      data: generateDriverPhoto(driverName),
      expires_at: '2028-11-14',
      status: 'APPROVED' as const
    },
    rc: {
      file_name: 'registration_certificate_rc.jpg',
      data: generateRcBook(vehicleReg),
      expires_at: '2038-03-11',
      status: 'APPROVED' as const
    },
    insurance: {
      file_name: 'commercial_vehicle_insurance.jpg',
      data: generateInsurance(vehicleReg),
      expires_at: '2027-08-15',
      status: 'APPROVED' as const
    },
    fitness: {
      file_name: 'fitness_certificate_form38.jpg',
      data: generateFitnessCert(vehicleReg),
      expires_at: '2026-02-28',
      status: 'APPROVED' as const
    },
    permit: {
      file_name: 'commercial_permit_form46.jpg',
      data: generatePermit(vehicleReg),
      expires_at: '2028-06-30',
      status: 'APPROVED' as const
    },
    road_tax: {
      file_name: 'karnataka_road_tax_receipt.jpg',
      data: generateRoadTax(vehicleReg),
      expires_at: '2027-03-31',
      status: 'APPROVED' as const
    },
    emissions: {
      file_name: 'puc_emission_certificate.jpg',
      data: generateEmissionCert(vehicleReg),
      expires_at: '2026-12-14',
      status: 'APPROVED' as const
    },
    vehicle_photo: {
      file_name: 'vehicle_exterior_plate_photo.jpg',
      data: generateVehiclePhoto(vehicleReg),
      expires_at: '2028-11-14',
      status: 'APPROVED' as const
    }
  };
}

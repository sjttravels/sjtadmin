export type TripType = 'POINT_TO_POINT' | 'LOCAL' | 'OUTSTATION' | 'AIRPORT' | 'ROUND_TRIP' | 'CORPORATE' | 'WEDDING';

export type BookingStatus = 
  | 'REQUESTED' 
  | 'CONFIRMED' 
  | 'ASSIGNED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED';

export type DriverMode = 'REGULAR' | 'COMPANY_DUTY' | 'BOTH';

export type DutyStatus = 'ON_DUTY' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'VERIFIED_BY_ADMIN';

export type UserRole = 'ADMIN' | 'EMPLOYEE' | 'DRIVER' | 'CUSTOMER';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  designation?: string;
  permissions?: string[];
  salary?: number;
  assigned_vehicle?: string | null;
  duty_mode?: string;
  kyc_status?: 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'N/A';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'EMPLOYEE';
  designation: string;
  permissions: string[];
  salary?: number;
  status: 'ACTIVE' | 'SUSPENDED';
  created_at?: string;
}

export interface RevenueAnalytics {
  daily: {
    todayRevenue: number;
    todayBookingsCount: number;
    todayDutiesCount: number;
    yesterdayRevenue: number;
    trend7Days: Array<{
      date: string;
      label: string;
      revenue: number;
      bookingsCount: number;
      dutiesCount: number;
    }>;
  };
  monthly: {
    currentMonthName: string;
    currentMonthRevenue: number;
    currentMonthTrips: number;
    currentMonthNetMargin: number;
    monthlyBreakdown: Array<{
      month: string;
      key: string;
      bookingsRevenue: number;
      dutyRevenue: number;
      totalRevenue: number;
      driverExpense: number;
      netMargin: number;
      tripsCount: number;
    }>;
  };
  yearly: {
    currentYear: number;
    currentYearTotal: number;
    annualComparison: Record<string, number>;
  };
  financialSummary: {
    totalGrossRevenue: number;
    totalBookingsRevenue: number;
    totalDutyRevenue: number;
    totalAdvanceCollected: number;
    totalPendingBalances: number;
    totalDriverPayouts: number;
    estimatedNetProfit: number;
    profitMarginPercent: number;
  };
}

export interface DriverAttendanceRecord {
  driver_id: string;
  driver_name: string;
  phone: string;
  email: string;
  assigned_vehicle: string;
  month: string;
  days_present: number;
  total_duties_completed: number;
  total_passenger_trips: number;
  total_km: number;
  base_salary: number;
  attendance_bonus: number;
  km_incentive: number;
  per_km_rate?: number;
  per_duty_allowance?: number;
  daily_allowances: number;
  deductions: number;
  gross_salary: number;
  net_payable: number;
  salary_status: string;
  duty_dates: string[];
}

export interface DriverKycApplication {
  id: string;
  driver_id: string;
  driver_name: string;
  driver_phone: string;
  driver_email: string;
  vendor_name?: string;
  father_name?: string;
  dob?: string;
  education?: string;
  experience_years: number;
  inducted_date?: string;
  photo_url?: string;
  license_number: string;
  license_issue_date?: string;
  license_expiry_date?: string;
  badge_number: string;
  badge_issue_date?: string;
  badge_expiry_date?: string;
  govt_id_type?: 'Aadhaar' | 'PAN' | 'Voter ID' | string;
  govt_id_number?: string;
  govt_id_issue_date?: string;
  govt_id_expiry_date?: string;
  aadhar_number?: string;
  pan_number?: string;
  police_verification_date?: string;
  police_verification_expiry?: string;
  medical_cert_date?: string;
  medical_cert_expiry?: string;
  bgv_agency_name?: string;
  duties_per_day?: number | string;
  companies_serving?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  reference_1_name?: string;
  reference_1_phone?: string;
  reference_2_name?: string;
  reference_2_phone?: string;
  fingerprint_acknowledged?: boolean;
  driver_signature_acknowledged?: boolean;
  inspected_by?: string;
  approved_by?: string;
  
  // Vehicle details from Vehicle Induction Form
  vehicle_vendor_name?: string;
  vehicle_reg?: string;
  vehicle_type?: string;
  vehicle_model?: string;
  seating_capacity?: number | string;
  vehicle_ownership?: 'ATTACHED' | 'OWNED' | string;
  fuel_type?: 'Diesel' | 'Petrol' | 'CNG' | 'EV' | string;
  
  // Vehicle document dates
  rc_number?: string;
  rc_issue_date?: string;
  rc_expiry_date?: string;
  insurance_number?: string;
  insurance_issue_date?: string;
  insurance_expiry_date?: string;
  fc_number?: string;
  fc_issue_date?: string;
  fc_expiry_date?: string;
  permit_number?: string;
  permit_issue_date?: string;
  permit_expiry_date?: string;
  tax_issue_date?: string;
  tax_expiry_date?: string;
  emission_issue_date?: string;
  emission_expiry_date?: string;
  
  // Accessories checklist (9 items from Form)
  accessories?: {
    fire_ext: boolean;
    first_aid_kit: boolean;
    co_sticker: boolean;
    torch: boolean;
    umbrella: boolean;
    music_system: boolean;
    mobile_handsfree: boolean;
    fixed_gps: boolean;
    fixed_panic_button: boolean;
  };
  
  // Vehicle condition checklist (9 items from Form)
  vehicle_condition?: {
    head_lights: boolean;
    indicators: boolean;
    body_rattle: boolean;
    tyres: boolean;
    spare_wheel: boolean;
    interior_cleanliness: boolean;
    seats_condition: boolean;
    seat_belts: boolean;
    tool_kit: boolean;
  };

  vehicle_preference?: string;
  license_doc_url?: string;
  license_back_doc_url?: string;
  aadhar_doc_url?: string;
  aadhar_back_doc_url?: string;
  psv_badge_doc_url?: string;
  police_verification_url?: string;
  medical_fitness_doc_url?: string;
  rc_doc_url?: string;
  insurance_doc_url?: string;
  fc_doc_url?: string;
  permit_doc_url?: string;
  tax_doc_url?: string;
  emission_doc_url?: string;
  vehicle_photo_url?: string;
  live_face_photo_url?: string;
  face_match_score?: number;
  face_verified?: boolean;
  govt_verified?: boolean;
  rto_dl_status?: string;
  uidai_aadhar_status?: string;
  police_clearance_status?: string;
  kyc_status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejection_reason?: string;
  assigned_vehicle_reg?: string;
  submitted_at: string;
  verified_at?: string;
  address?: string;
  vehicle_details?: {
    make_model?: string;
    year?: number;
    color?: string;
    seats?: number;
  };
  documents?: Record<string, {
    file_name: string;
    storage_key?: string;
    data?: string;
    expires_at?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    rejection_reason?: string;
  }>;
  face_document?: {
    file_name: string;
    storage_key?: string;
    data?: string;
    expires_at?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    rejection_reason?: string;
  };
}

export interface Vehicle {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  seats: string | number;
  ac: boolean;
  regNumber: string;
  reg_number?: string;
  image: string;
  ratePerDay: number;
  rate_per_day?: number;
  ratePerKm: number;
  rate_per_km?: number;
  minKmPerDay: number;
  min_km_per_day?: number;
  driverAllowancePerDay: number;
  driver_allowance_per_day?: number;
  status: 'AVAILABLE' | 'ON_TRIP' | 'COMPANY_DUTY' | 'MAINTENANCE';
  assignedDriverId?: string;
  features: string[];
}

export interface Booking {
  _id?: string;
  id?: string;
  bookingCode: string;
  booking_code?: string;
  customerName: string;
  customer_name?: string;
  customerPhone: string;
  customer_phone?: string;
  customerEmail?: string;
  customer_email?: string;
  tripType?: TripType;
  trip_type?: string;
  pickup: string;
  destination: string;
  journeyDate: string;
  journey_date?: string;
  journeyTime?: string;
  journey_time?: string;
  pickupTime?: string;
  pickup_time?: string;
  returnDate?: string;
  return_date?: string;
  vehicleId?: string;
  vehicle_id?: string;
  vehicleName: string;
  vehicle_name?: string;
  vehicleReg?: string;
  vehicle_reg?: string;
  passengers: number;
  quotedAmount: number;
  quoted_amount?: number;
  advancePaid: number;
  advance_paid?: number;
  balance_amount?: number;
  paymentMethod?: string;
  payment_method?: string;
  paymentStatus?: string;
  payment_status?: string;
  razorpayPaymentId?: string;
  status: BookingStatus | string;
  assignedDriverId?: string;
  assigned_driver_id?: string;
  assignedDriverName?: string;
  assigned_driver_name?: string;
  assigned_driver_phone?: string;
  admin_message?: string;
  admin_message_time?: string;
  dispatch?: { available_driver_count: number; status: 'OFFERED_TO_DRIVERS' | 'NO_DRIVER_AVAILABLE' | 'CHECK_FAILED' };
  createdAt?: string;
  created_at?: string;
  notes?: string;
  source?: 'WEBSITE' | 'CUSTOMER_APP' | 'ADMIN';
}

export interface CompanyDutyLog {
  _id?: string;
  id?: string;
  duty_code?: string;
  shift_name?: string;
  shiftName?: string;
  dutyDate?: string;
  duty_date?: string;
  driverId: string;
  driver_id?: string;
  driverName: string;
  driver_name?: string;
  companyName: string;
  company_name?: string;
  externalTripId: string;
  external_trip_id?: string;
  vehicleReg: string;
  vehicle_reg?: string;
  pickupLocation?: string;
  pickup_location?: string;
  destinationLocation?: string;
  destination_location?: string;
  routeDetails?: string;
  route_details?: string;
  vehicleName?: string;
  loginTime: string;
  login_time?: string;
  logoutTime?: string;
  logout_time?: string;
  startKm: number;
  start_km?: number;
  endKm?: number;
  end_km?: number;
  dailyKm?: number;
  daily_km?: number;
  startLocation?: string;
  currentLocation?: string;
  odometerPhotoUrl?: string;
  allowances: number;
  toll_parking_allowance?: number;
  food_allowance?: number;
  overtimeHours?: number;
  status: DutyStatus | string;
  adminNote?: string;
  admin_note?: string;
  createdAt?: string;
  created_at?: string;
  duty_selfie_url?: string;
  duty_face_verified?: boolean;
  duty_face_match_score?: number;
}

export interface DriverProfile {
  _id?: string;
  id?: string;
  name: string;
  phone: string;
  email: string;
  driverMode: DriverMode;
  status: 'AVAILABLE' | 'ON_TRIP' | 'OFF_DUTY';
  isOnline?: boolean;
  serviceArea?: string;
  kycStatus?: string;
  assignedVehicleReg: string;
  rating: number;
  experienceYears: number;
  totalTripsCompleted?: number;
  monthlySalarySettings?: {
    baseSalary: number;
    perKmRate: number;
    perDutyAllowance: number;
    overtimeHourly: number;
  };
}

export interface DriverPayrollRecord {
  id?: string;
  _id?: string;
  driverId: string;
  driver_id?: string;
  driverName?: string;
  driver_name?: string;
  month?: string;
  dutyDays: number;
  total_duties?: number;
  approvedKm: number;
  total_km?: number;
  baseSalary: number;
  base_pay?: number;
  kmAllowance?: number;
  per_km_incentive?: number;
  dutyAllowances: number;
  total_allowance?: number;
  overtimePay: number;
  overtimeHours?: number;
  deductions: number;
  advances: number;
  netPayout: number;
  gross_salary?: number;
  status: 'PREPARED' | 'PAID';
  paymentDate?: string;
  // Shift & Salary Settlement Fields (Handwritten Formula: Shifts × Rate - CNT - Other - TDS = Net)
  totalShifts?: number;
  ratePerShift?: number;
  shiftEarnings?: number;
  companyRentDeduction?: number; // CHT / CNT (Company vehicle rent cut)
  otherDeductions?: number;
  tdsDeduction?: number;
  vehicleReg?: string;
  driverPhone?: string;
  driverLicense?: string;
  bankAccountNo?: string;
  bankIfsc?: string;
}

export interface CorporateInvoice {
  _id?: string;
  id?: string;
  invoiceNumber: string;
  invoice_number?: string;
  companyName: string;
  company_name?: string;
  companyGstin?: string;
  client_gstin?: string;
  client_address?: string;
  client_phone?: string;
  billingPeriod: string;
  billing_period?: string;
  invoiceDate?: string;
  invoice_date?: string;
  invoiceTime?: string;
  invoice_time?: string;
  dueDate?: string;
  due_date?: string;
  place_of_supply?: string;
  vehicle_name?: string;
  vehicle_reg?: string;
  vehicle_type?: string;
  vehicle_model?: string;
  supervisor_name?: string;
  indication_date?: string;
  transport_company_name?: string;
  payment_method?: string;
  notes?: string;
  hsn_sac?: string;
  quantity?: number;
  rate_per_unit?: number;
  items: {
    description: string;
    vehicleName?: string;
    hsnSac?: string;
    quantity?: number;
    daysOrKm?: number;
    rate: number;
    amount: number;
    taxableAmount?: number;
    gstRate?: number;
    gstAmount?: number;
  }[];
  driverAllowance?: number;
  tollAndParking?: number;
  total_trips?: number;
  total_km?: number;
  subtotal: number;
  taxable_amount?: number;
  cgst: number;
  cgst_amount?: number;
  sgst: number;
  sgst_amount?: number;
  cgst_rate?: number;
  sgst_rate?: number;
  total_tax?: number;
  gst_rate?: number;
  totalAmount: number;
  grand_total?: number;
  // Vyapar Deductions & Adjustments
  gsp_rent?: number;
  tds_cgst?: number;
  tds_amount?: number;
  round_off?: number;
  received_amount?: number;
  balance_amount?: number;
  invoice_value_before_tds?: number;
  amount_in_words?: string;
  // Seller & Bank Details
  seller_company_name?: string;
  seller_address?: string;
  seller_gstin?: string;
  seller_state?: string;
  seller_phone?: string;
  seller_email?: string;
  bank_name?: string;
  bank_account_no?: string;
  bank_ifsc?: string;
  bank_account_holder?: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'ISSUED' | 'DRAFT';
}

export interface SavedCompanyProfile {
  id: string;
  name: string;
  clientType: 'CORPORATE' | 'CUSTOMER' | string;
  gstin?: string;
  phone?: string;
  address?: string;
  placeOfSupply?: string;
  defaultVehicleType?: string;
  defaultVehicleModel?: string;
  defaultVehicleReg?: string;
  defaultItemName?: string;
  defaultHsnSac?: string;
  defaultRatePerUnit?: number;
  defaultGstRate?: number;
}

export interface DriverPaymentVoucher {
  id: string;
  voucherNumber: string;
  date: string;
  voucherDate?: string;
  billingPeriod: string;
  driverId?: string;
  driverName: string;
  driverPhone?: string;
  vehicleReg?: string;
  vehicleName?: string;
  shiftsCount: number;
  shiftRate: number;
  shiftAmount?: number;
  shiftEarnings?: number;
  totalKm: number;
  kmRate: number;
  kmAmount?: number;
  kmEarnings?: number;
  battaDays: number;
  battaRate: number;
  battaAmount?: number;
  battaTotal?: number;
  tollsParking: number;
  nightHalt: number;
  customEarnings: { id?: string; title: string; amount: number }[];
  companyRent?: number;
  advanceDeduction: number;
  fuelDeduction: number;
  damagePenalty: number;
  tdsDeduction?: number;
  customDeductions: { id?: string; title: string; amount: number }[];
  grossEarnings?: number;
  totalGrossEarnings?: number;
  totalDeductions: number;
  netPayable: number;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolder?: string;
  paymentMode: string;
  referenceNo?: string;
  utrRefNo?: string;
  status: 'PAID' | 'PENDING';
  notes?: string;
}

export type TransactionType = 'PAY_IN' | 'PAY_OUT';

export interface CompanyTransaction {
  id: string;
  type: TransactionType;
  category: string;
  title: string;
  amount: number;
  payment_mode: string;
  reference_no: string;
  party_name: string;
  party_type: 'CUSTOMER' | 'DRIVER' | 'CORPORATE' | 'VENDOR' | 'INTERNAL' | string;
  related_booking_code?: string;
  related_invoice_no?: string;
  related_duty_code?: string;
  date: string;
  time?: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  notes?: string;
  created_at: string;
}

export interface AccountsSummary {
  totalPayIn: number;
  totalPayOut: number;
  netProfit: number;
  totalInvoiced: number;
  unpaidInvoiced: number;
  pendingPayIn: number;
  pendingPayOut: number;
  transactionCount: number;
  invoiceCount: number;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  type: 'BOOKING' | 'PAYMENT' | 'DUTY_SUBMITTED' | 'DUTY_APPROVED' | 'DRIVER_ASSIGNED' | 'EMAIL_CLIENT' | 'KYC_SUBMITTED' | 'KYC_APPROVED' | 'KYC_REJECTED';
  title: string;
  message: string;
  target: 'ADMIN' | 'DRIVER' | 'CLIENT_MAIL' | 'CUSTOMER';
  meta?: Record<string, any>;
  read: boolean;
}

export interface BloodAppeal {
  id: number;
  user_id: number;
  hospital_id: number;
  patient_initials: string;
  blood_type: BloodType;
  pints_required: number;
  pints_secured: number;
  contact_phone: string;
  verification_document_path: string | null;
  status: BloodAppealStatus;
  created_at: string;
  updated_at: string;
  hospital?: Hospital;
  user?: User;
  donation_claims?: DonationClaim[];
}

export interface Hospital {
  id: number;
  name: string;
  county: string;
  sub_county: string;
  total_icu_beds: number;
  available_icu_beds: number;
  created_at: string;
  updated_at: string;
}

export interface DonorRegistry {
  id: number;
  user_id: number | null;
  phone_number: string | null;
  blood_type: BloodType;
  county: string;
  sub_county: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface DonationClaim {
  id: number;
  blood_appeal_id: number;
  donor_registry_id: number;
  expires_at: string;
  status: DonationClaimStatus;
  created_at: string;
  updated_at: string;
  blood_appeal?: BloodAppeal;
  donor_registry?: DonorRegistry;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type BloodAppealStatus = 'pending_verification' | 'verified' | 'expired' | 'fulfilled';

export type DonationClaimStatus = 'reserved' | 'arrived' | 'cancelled' | 'expired' | 'completed';

export interface Statistics {
  active_appeals: number;
  registered_donors: number;
  lives_saved: number;
  open_icu_beds: number;
}

export interface SupportMetrics {
  api_costs: number;
  monthly_sms_usage: number;
  infrastructure_status: 'operational' | 'degraded' | 'down';
  server_health: 'healthy' | 'warning' | 'critical';
  monthly_donations: number;
}

export interface County {
  name: string;
  sub_counties: string[];
}

export interface BloodAppealFilters {
  county?: string;
  blood_type?: BloodType;
  status?: BloodAppealStatus;
  search?: string;
}

export interface DonationAmount {
  amount: number;
  label: string;
}

export const BLOOD_TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const BLOOD_APPEAL_STATUSES: BloodAppealStatus[] = ['pending_verification', 'verified', 'expired', 'fulfilled'];

export const DONATION_CLAIM_STATUSES: DonationClaimStatus[] = ['reserved', 'arrived', 'cancelled', 'expired', 'completed'];

export const DONATION_PRESETS: DonationAmount[] = [
  { amount: 50, label: '50' },
  { amount: 100, label: '100' },
  { amount: 250, label: '250' },
  { amount: 500, label: '500' },
  { amount: 1000, label: '1000' },
];

export const KENYA_COUNTIES: string[] = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Kiambu', 'Turkana', 'Machakos', 'Kajiado', 'Makueni',
  'Kitui', 'Meru', 'Tharaka Nithi', 'Embu', 'Kirinyaga',
  'Muranga', 'Nyandarua', 'Nyeri', 'Laikipia', 'Samburu',
  'Trans Nzoia', 'West Pokot', 'Bungoma', 'Busia', 'Kakamega',
  'Vihiga', 'Baringo', 'Kericho', 'Nandi', 'Uasin Gishu',
  'Elgeyo Marakwet', 'Narok', 'Kajiado', 'Kwale', 'Kilifi',
  'Tana River', 'Lamu', 'Taita Taveta', 'Garissa', 'Wajir',
  'Mandera', 'Marsabit', 'Isiolo', 'Homa Bay', 'Migori',
  'Kisii', 'Nyamira', 'Siaya', 'Busia',
];

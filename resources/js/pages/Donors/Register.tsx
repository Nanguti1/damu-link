import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, Shield, Bell, Check, ArrowRight, User, Phone, MapPin, Droplet } from 'lucide-react';
import { BloodType, BLOOD_TYPES, KENYA_COUNTIES } from '@/types';
import GlassCard from '@/components/Shared/GlassCard';
import BloodBadge from '@/components/Shared/BloodBadge';

interface RegisterDonorProps {
  counties: string[];
}

export default function RegisterDonor({ counties = KENYA_COUNTIES }: RegisterDonorProps) {
  const [formData, setFormData] = useState({
    phone_number: '',
    blood_type: '' as BloodType | '',
    county: '',
    sub_county: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    }

    if (!formData.blood_type) {
      newErrors.blood_type = 'Blood type is required';
    }

    if (!formData.county) {
      newErrors.county = 'County is required';
    }

    if (!formData.sub_county) {
      newErrors.sub_county = 'Sub-county is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Form submission would happen here via Inertia
      console.log('Form submitted:', formData);
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-100 dark:bg-rose-900/20 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-rose-600 dark:text-rose-500" />
            <span className="text-sm font-medium text-rose-700 dark:text-rose-400">
              Join Our Life-Saving Network
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Become a Life Saver
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Register as a blood donor and help save lives across Kenya. Get notified when your blood type is needed nearby.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Register in Under 30 Seconds
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Blood Type
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, blood_type: type })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.blood_type === type
                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700'
                        }`}
                      >
                        <BloodBadge bloodType={type} size="sm" showIcon={false} />
                      </button>
                    ))}
                  </div>
                  {errors.blood_type && (
                    <p className="text-red-500 text-sm mt-1">{errors.blood_type}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      County
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <select
                        value={formData.county}
                        onChange={(e) => setFormData({ ...formData, county: e.target.value, sub_county: '' })}
                        className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
                      >
                        <option value="">Select county</option>
                        {counties.map((county) => (
                          <option key={county} value={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.county && (
                      <p className="text-red-500 text-sm mt-1">{errors.county}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Sub-County
                    </label>
                    <input
                      type="text"
                      value={formData.sub_county}
                      onChange={(e) => setFormData({ ...formData, sub_county: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
                      placeholder="Enter sub-county"
                    />
                    {errors.sub_county && (
                      <p className="text-red-500 text-sm mt-1">{errors.sub_county}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                  />
                  <label htmlFor="consent" className="text-sm text-slate-600 dark:text-slate-400">
                    I agree to receive SMS notifications about blood donation requests and consent to the privacy policy.
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-red-500 text-sm">{errors.consent}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5" />
                      <span>Become a Life Saver</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Why Register?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
                    <Bell className="h-5 w-5 text-rose-600 dark:text-rose-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">SMS Alerts</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get instant notifications when your blood type is needed in your area.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                    <Shield className="h-5 w-5 text-teal-600 dark:text-teal-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Emergency Response</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Connect directly with hospitals during critical blood shortages.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <User className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Privacy Protected</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Your information is secure and only shared when you consent.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-green-200 dark:border-green-800">
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                    Make a Difference
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-500">
                    One blood donation can save up to 3 lives. Join thousands of Kenyans making a real impact.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Upload, Check, AlertCircle } from 'lucide-react';
import { BloodType, BLOOD_TYPES } from '@/types';
import GlassCard from '@/components/Shared/GlassCard';
import BloodBadge from '@/components/Shared/BloodBadge';

interface CreateAppealProps {
  hospitals: Array<{ id: number; name: string; county: string; sub_county: string }>;
}

type Step = 'patient' | 'hospital' | 'verification' | 'review';

export default function CreateAppeal({ hospitals }: CreateAppealProps) {
  const [currentStep, setCurrentStep] = useState<Step>('patient');
  const [formData, setFormData] = useState({
    patient_initials: '',
    blood_type: '' as BloodType | '',
    hospital_id: '',
    pints_required: 1,
    contact_phone: '',
    verification_document: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 'patient') {
      if (!formData.patient_initials.trim()) {
        newErrors.patient_initials = 'Patient initials are required';
      }
      if (!formData.blood_type) {
        newErrors.blood_type = 'Blood type is required';
      }
    }

    if (step === 'hospital') {
      if (!formData.hospital_id) {
        newErrors.hospital_id = 'Hospital is required';
      }
      if (formData.pints_required < 1) {
        newErrors.pints_required = 'At least 1 pint is required';
      }
    }

    if (step === 'verification') {
      if (!formData.contact_phone.trim()) {
        newErrors.contact_phone = 'Contact phone is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      const steps: Step[] = ['patient', 'hospital', 'verification', 'review'];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    }
  };

  const prevStep = () => {
    const steps: Step[] = ['patient', 'hospital', 'verification', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep('review')) {
      // Form submission would happen here via Inertia
      console.log('Form submitted:', formData);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, verification_document: file });
    }
  };

  const progress = ((['patient', 'hospital', 'verification', 'review'].indexOf(currentStep) + 1) / 4) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Create Blood Appeal
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Complete the steps below to create an emergency blood appeal.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-400">Step {['patient', 'hospital', 'verification', 'review'].indexOf(currentStep) + 1} of 4</span>
            <span className="text-slate-900 dark:text-slate-100 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Patient Information */}
            {currentStep === 'patient' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Patient Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Patient Initials
                      </label>
                      <input
                        type="text"
                        value={formData.patient_initials}
                        onChange={(e) => setFormData({ ...formData, patient_initials: e.target.value })}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
                        placeholder="JD"
                        maxLength={20}
                      />
                      {errors.patient_initials && (
                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.patient_initials}</span>
                        </p>
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
                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.blood_type}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Hospital Information */}
            {currentStep === 'hospital' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Hospital Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Select Hospital
                      </label>
                      <select
                        value={formData.hospital_id}
                        onChange={(e) => setFormData({ ...formData, hospital_id: e.target.value })}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100 appearance-none cursor-pointer"
                      >
                        <option value="">Select a hospital</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital.id} value={hospital.id}>
                            {hospital.name} - {hospital.county}
                          </option>
                        ))}
                      </select>
                      {errors.hospital_id && (
                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.hospital_id}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Pints Required
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={formData.pints_required}
                        onChange={(e) => setFormData({ ...formData, pints_required: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
                      />
                      {errors.pints_required && (
                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.pints_required}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {currentStep === 'verification' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Verification Documents
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.contact_phone}
                        onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-slate-900 dark:text-slate-100"
                        placeholder="+254 700 000 000"
                      />
                      {errors.contact_phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.contact_phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Medical Verification Document (Optional)
                      </label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-rose-500 dark:hover:border-rose-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          accept="image/*,.pdf"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          {formData.verification_document ? (
                            <div className="space-y-2">
                              <Check className="h-8 w-8 text-green-500 mx-auto" />
                              <p className="text-slate-900 dark:text-slate-100 font-medium">
                                {formData.verification_document.name}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-slate-900 dark:text-slate-100 font-medium mb-1">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-slate-600 dark:text-slate-400 text-sm">
                                PNG, JPG, PDF up to 10MB
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Review & Submit
                  </h2>
                  <div className="space-y-4">
                    <GlassCard className="p-4">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Patient Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Initials</p>
                          <p className="text-slate-900 dark:text-slate-100 font-medium">{formData.patient_initials}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Blood Type</p>
                          <BloodBadge bloodType={formData.blood_type} size="sm" />
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard className="p-4">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Hospital Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Hospital</p>
                          <p className="text-slate-900 dark:text-slate-100 font-medium">
                            {hospitals.find(h => h.id === parseInt(formData.hospital_id))?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Pints Required</p>
                          <p className="text-slate-900 dark:text-slate-100 font-medium">{formData.pints_required}</p>
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard className="p-4">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Contact Information</h3>
                      <div className="text-sm">
                        <p className="text-slate-600 dark:text-slate-400">Phone</p>
                        <p className="text-slate-900 dark:text-slate-100 font-medium">{formData.contact_phone}</p>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 'patient'}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              {currentStep === 'review' ? (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-medium flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Submit Appeal</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-medium flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

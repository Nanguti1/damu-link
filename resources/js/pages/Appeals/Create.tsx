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

export default function CreateAppeal({ hospitals = [] }: CreateAppealProps) {
  const [currentStep, setCurrentStep] = useState<Step>('patient');
  const { data, setData, post, processing, errors, transform } = useForm({
    patient_initials: '',
    blood_type: '' as BloodType | '',
    hospital_id: '',
    pints_required: 1,
    contact_phone: '',
    verification_document: null as File | null,
  });

  const validateStep = (step: Step): boolean => {
    if (step === 'patient') return Boolean(data.patient_initials.trim() && data.blood_type);
    if (step === 'hospital') return Boolean(data.hospital_id && data.pints_required >= 1);
    if (step === 'verification') return Boolean(data.contact_phone.trim());
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    const steps: Step[] = ['patient', 'hospital', 'verification', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) setCurrentStep(steps[currentIndex + 1]);
  };

  const prevStep = () => {
    const steps: Step[] = ['patient', 'hospital', 'verification', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) setCurrentStep(steps[currentIndex - 1]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    transform((formData) => ({ ...formData, _method: 'post' }));
    post('/appeals', { forceFormData: true });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('verification_document', e.target.files?.[0] ?? null);
  };

  const selectedHospital = hospitals.find((hospital) => hospital.id === Number(data.hospital_id));
  const progress = ((['patient', 'hospital', 'verification', 'review'].indexOf(currentStep) + 1) / 4) * 100;
  const localStepInvalid = !validateStep(currentStep);

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="mb-4 inline-flex items-center space-x-2 text-slate-600 transition-colors hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-500">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Create Blood Appeal</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Complete the steps below to create an emergency blood appeal.</p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Step {['patient', 'hospital', 'verification', 'review'].indexOf(currentStep) + 1} of 4</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit}>
            {currentStep === 'patient' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Patient Information</h2>
                <div>
                  <label htmlFor="patient_initials" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Patient Initials</label>
                  <input id="patient_initials" type="text" value={data.patient_initials} onChange={(e) => setData('patient_initials', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100" placeholder="JD" maxLength={20} aria-invalid={Boolean(errors.patient_initials)} />
                  {errors.patient_initials && <p className="mt-1 flex items-center space-x-1 text-sm text-red-500"><AlertCircle className="h-4 w-4" /><span>{errors.patient_initials}</span></p>}
                </div>
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Blood Type</span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Blood type">
                    {BLOOD_TYPES.map((type) => (
                      <button key={type} type="button" onClick={() => setData('blood_type', type)} aria-pressed={data.blood_type === type} className={`rounded-xl border-2 p-3 transition-all ${data.blood_type === type ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-slate-200 hover:border-rose-300 dark:border-slate-800 dark:hover:border-rose-700'}`}>
                        <BloodBadge bloodType={type} size="sm" showIcon={false} />
                      </button>
                    ))}
                  </div>
                  {errors.blood_type && <p className="mt-1 flex items-center space-x-1 text-sm text-red-500"><AlertCircle className="h-4 w-4" /><span>{errors.blood_type}</span></p>}
                </div>
              </div>
            )}

            {currentStep === 'hospital' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Hospital Information</h2>
                <div>
                  <label htmlFor="hospital_id" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Select Hospital</label>
                  <select id="hospital_id" value={data.hospital_id} onChange={(e) => setData('hospital_id', e.target.value)} className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100">
                    <option value="">Select a hospital</option>
                    {hospitals.map((hospital) => <option key={hospital.id} value={hospital.id}>{hospital.name} - {hospital.county}</option>)}
                  </select>
                  {errors.hospital_id && <p className="mt-1 flex items-center space-x-1 text-sm text-red-500"><AlertCircle className="h-4 w-4" /><span>{errors.hospital_id}</span></p>}
                </div>
                <div>
                  <label htmlFor="pints_required" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pints Required</label>
                  <input id="pints_required" type="number" min="1" max="50" value={data.pints_required} onChange={(e) => setData('pints_required', Number(e.target.value) || 1)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100" />
                  {errors.pints_required && <p className="mt-1 flex items-center space-x-1 text-sm text-red-500"><AlertCircle className="h-4 w-4" /><span>{errors.pints_required}</span></p>}
                </div>
              </div>
            )}

            {currentStep === 'verification' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Verification Documents</h2>
                <div>
                  <label htmlFor="contact_phone" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Contact Phone</label>
                  <input id="contact_phone" type="tel" value={data.contact_phone} onChange={(e) => setData('contact_phone', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100" placeholder="+254 700 000 000" />
                  {errors.contact_phone && <p className="mt-1 flex items-center space-x-1 text-sm text-red-500"><AlertCircle className="h-4 w-4" /><span>{errors.contact_phone}</span></p>}
                </div>
                <div>
                  <label htmlFor="file-upload" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Medical Verification Document (Optional)</label>
                  <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-rose-500 dark:border-slate-700 dark:hover:border-rose-500">
                    <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" accept="image/*,.pdf" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                      {data.verification_document ? <p className="font-medium text-slate-900 dark:text-slate-100">{data.verification_document.name}</p> : <p className="text-slate-600 dark:text-slate-400">PNG, JPG, PDF up to 10MB</p>}
                    </label>
                  </div>
                  {errors.verification_document && <p className="mt-1 flex items-center space-x-1 text-sm text-red-500"><AlertCircle className="h-4 w-4" /><span>{errors.verification_document}</span></p>}
                </div>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Review & Submit</h2>
                <GlassCard className="p-4"><p className="text-sm text-slate-600 dark:text-slate-400">Patient</p><p className="font-medium text-slate-900 dark:text-slate-100">{data.patient_initials} · {data.blood_type}</p></GlassCard>
                <GlassCard className="p-4"><p className="text-sm text-slate-600 dark:text-slate-400">Hospital</p><p className="font-medium text-slate-900 dark:text-slate-100">{selectedHospital?.name} · {data.pints_required} pint(s)</p></GlassCard>
                <GlassCard className="p-4"><p className="text-sm text-slate-600 dark:text-slate-400">Contact</p><p className="font-medium text-slate-900 dark:text-slate-100">{data.contact_phone}</p></GlassCard>
              </div>
            )}

            {localStepInvalid && currentStep !== 'review' && <p className="mt-6 text-sm text-amber-600 dark:text-amber-400">Complete required fields to continue.</p>}

            <div className="mt-8 flex justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
              <button type="button" onClick={prevStep} disabled={currentStep === 'patient'} className="flex items-center space-x-2 rounded-xl bg-slate-100 px-6 py-3 font-medium text-slate-700 transition-all hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"><ArrowLeft className="h-4 w-4" /><span>Previous</span></button>
              {currentStep === 'review' ? (
                <button type="submit" disabled={processing} className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-rose-500/25 disabled:opacity-60 dark:from-rose-500 dark:to-rose-600"><Check className="h-4 w-4" /><span>{processing ? 'Submitting…' : 'Submit Appeal'}</span></button>
              ) : (
                <button type="button" onClick={nextStep} className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-rose-500/25 dark:from-rose-500 dark:to-rose-600"><span>Next</span><ArrowRight className="h-4 w-4" /></button>
              )}
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

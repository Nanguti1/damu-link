import React from 'react';
import { Link } from '@inertiajs/react';
import { Heart, FileText, AlertTriangle, Users, Gavel, XCircle } from 'lucide-react';
import GlassCard from '@/components/Shared/GlassCard';

export default function Terms() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-100 dark:bg-rose-900/20 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-rose-600 dark:text-rose-500" />
            <span className="text-sm font-medium text-rose-700 dark:text-rose-400">
              Terms of Service
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Last updated: August 2, 2026
          </p>
        </div>

        {/* Introduction */}
        <GlassCard className="p-8 mb-8">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Welcome to DamuLink. By accessing or using our blood donation platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
          </p>
        </GlassCard>

        {/* Acceptance of Terms */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/20 rounded-xl">
              <FileText className="h-6 w-6 text-rose-600 dark:text-rose-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Acceptance of Terms
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>By using DamuLink, you signify that you have read, understood, and agreed to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.</p>
          </div>
        </GlassCard>

        {/* Description of Service */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-xl">
              <Heart className="h-6 w-6 text-teal-600 dark:text-teal-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Description of Service
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>DamuLink provides a platform connecting blood donors with patients in need. Our services include:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Blood donor registration and management</li>
              <li>Blood appeal creation and matching</li>
              <li>Real-time notification system</li>
              <li>Hospital and donor verification</li>
              <li>Emergency blood coordination</li>
            </ul>
          </div>
        </GlassCard>

        {/* User Responsibilities */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <Users className="h-6 w-6 text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              User Responsibilities
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>As a user of DamuLink, you agree to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Keep your contact information up to date</li>
              <li>Respond promptly to donation requests when able</li>
              <li>Respect the privacy of other users</li>
              <li>Use the platform only for its intended purpose</li>
              <li>Follow all applicable laws and regulations</li>
            </ul>
          </div>
        </GlassCard>

        {/* Prohibited Activities */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
              <XCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Prohibited Activities
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>You may not use DamuLink for any of the following:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Submitting false or misleading information</li>
              <li>Impersonating any person or entity</li>
              <li>Using the platform for commercial gain</li>
              <li>Harassing or abusing other users</li>
              <li>Attempting to compromise system security</li>
              <li>Creating fake blood appeals or donor profiles</li>
            </ul>
          </div>
        </GlassCard>

        {/* Medical Disclaimer */}
        <GlassCard className="p-8 mb-8 border-amber-200 dark:border-amber-800">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Medical Disclaimer
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-amber-700 dark:text-amber-500">
              DamuLink is a coordination platform and does not provide medical advice or services.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Always consult with healthcare professionals for medical decisions</li>
              <li>Blood donation eligibility is determined by medical professionals</li>
              <li>We are not responsible for medical outcomes</li>
              <li>Follow all medical guidelines and protocols</li>
            </ul>
          </div>
        </GlassCard>

        {/* Limitation of Liability */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <Gavel className="h-6 w-6 text-purple-600 dark:text-purple-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Limitation of Liability
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p> DamuLink shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Loss of data or information</li>
              <li>Medical complications or outcomes</li>
              <li>Service interruptions or delays</li>
              <li>Third-party actions or content</li>
            </ul>
          </div>
        </GlassCard>

        {/* Termination */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Termination
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>We reserve the right to suspend or terminate your access to DamuLink at any time, with or without cause, with or without notice. Upon termination, your right to use the service will immediately cease.</p>
          </div>
        </GlassCard>

        {/* Contact */}
        <GlassCard className="p-8 border-rose-200 dark:border-rose-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Contact Us
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-slate-600 dark:text-slate-400">
            <p>Email: legal@damulink.ke</p>
            <p>Phone: +254 700 000 000</p>
            <p>Address: Nairobi, Kenya</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

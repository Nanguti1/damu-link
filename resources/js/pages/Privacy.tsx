import React from 'react';
import { Link } from '@inertiajs/react';
import { Heart, Shield, Eye, Lock, Trash2, Server } from 'lucide-react';
import GlassCard from '@/components/Shared/GlassCard';

export default function Privacy() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-100 dark:bg-rose-900/20 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-rose-600 dark:text-rose-500" />
            <span className="text-sm font-medium text-rose-700 dark:text-rose-400">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Last updated: August 2, 2026
          </p>
        </div>

        {/* Introduction */}
        <GlassCard className="p-8 mb-8">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            DamuLink ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blood donation platform. Please read this policy carefully.
          </p>
        </GlassCard>

        {/* Information We Collect */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/20 rounded-xl">
              <Eye className="h-6 w-6 text-rose-600 dark:text-rose-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Information We Collect
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Name and contact information</li>
                <li>Phone number for SMS notifications</li>
                <li>Blood type and medical information</li>
                <li>Location data (county level)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Technical Information</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* How We Use Your Information */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-xl">
              <Server className="h-6 w-6 text-teal-600 dark:text-teal-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              How We Use Your Information
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <ul className="list-disc list-inside space-y-2">
              <li>Match blood donors with patients in need</li>
              <li>Send emergency SMS notifications</li>
              <li>Verify donor and hospital identities</li>
              <li>Improve our platform's functionality</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </div>
        </GlassCard>

        {/* Data Security */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <Lock className="h-6 w-6 text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Data Security
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication systems</li>
              <li>Secure data storage practices</li>
            </ul>
          </div>
        </GlassCard>

        {/* Data Retention */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
              <Trash2 className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Data Retention
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>We retain your personal information only as long as necessary for the purposes outlined in this policy:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Donor registration data: Until account deletion</li>
              <li>Blood appeal records: 7 years for medical compliance</li>
              <li>Communication logs: 2 years for service improvement</li>
              <li>Usage analytics: Aggregated and anonymized</li>
            </ul>
          </div>
        </GlassCard>

        {/* Your Rights */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Your Rights
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>
          </div>
        </GlassCard>

        {/* Contact */}
        <GlassCard className="p-8 border-rose-200 dark:border-rose-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Contact Us
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-slate-600 dark:text-slate-400">
            <p>Email: privacy@damulink.ke</p>
            <p>Phone: +254 700 000 000</p>
            <p>Address: Nairobi, Kenya</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

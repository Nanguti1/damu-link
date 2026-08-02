import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, Heart, Phone, Mail } from 'lucide-react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-rose-200/20 dark:border-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Heart className="h-8 w-8 text-rose-600 dark:text-rose-500 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-rose-600/20 dark:bg-rose-500/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-teal-600 dark:from-rose-500 dark:to-teal-500 bg-clip-text text-transparent">
                DamuLink
              </span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-500 transition-colors font-medium">
                  Home
                </Link>
                <Link href="/appeals/create" className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-500 transition-colors font-medium">
                  Create Appeal
                </Link>
                <Link href="/donors/register" className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-500 transition-colors font-medium">
                  Register as Donor
                </Link>
                <Link href="/support" className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-500 transition-colors font-medium">
                  Support
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all font-medium"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="px-4 py-4 space-y-2 border-t border-rose-200/20 dark:border-slate-800/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/appeals/create"
              className="block px-4 py-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Appeal
            </Link>
            <Link
              href="/donors/register"
              className="block px-4 py-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register as Donor
            </Link>
            <Link
              href="/support"
              className="block px-4 py-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 dark:from-rose-500 dark:to-rose-600 text-white text-center font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-t border-rose-200/20 dark:border-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-rose-600 dark:text-rose-500" />
                <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-teal-600 dark:from-rose-500 dark:to-teal-500 bg-clip-text text-transparent">
                  DamuLink
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Saving lives through faster blood connections across Kenya.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/appeals/create" className="text-sm text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors">
                    Create Appeal
                  </Link>
                </li>
                <li>
                  <Link href="/donors/register" className="text-sm text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors">
                    Register as Donor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4" />
                  <span>+254 700 000 000</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span>info@damulink.ke</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-rose-200/20 dark:border-slate-800/20 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>&copy; 2026 DamuLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

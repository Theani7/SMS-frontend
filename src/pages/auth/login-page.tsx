import { BookOpen, CheckCircle, Users, Calendar, DollarSign } from 'lucide-react';
import { LoginForm } from '../../features/auth/components/login-form';

export function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding (40%, hidden on mobile) */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100 relative overflow-hidden">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 w-full">
          {/* Logo area */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">School App</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Education Platform
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            Streamline your school management with our comprehensive platform designed for modern educators.
          </p>

          {/* Abstract SVG illustration */}
          <div className="mb-10 flex justify-center">
            <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Central node */}
              <circle cx="140" cy="100" r="30" fill="#4f46e5" fillOpacity="0.2" stroke="#4f46e5" strokeWidth="2"/>
              <circle cx="140" cy="100" r="16" fill="#4f46e5"/>

              {/* Connected nodes */}
              <circle cx="60" cy="50" r="20" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
              <circle cx="60" cy="50" r="10" fill="#6366f1"/>

              <circle cx="220" cy="50" r="20" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1.5"/>
              <circle cx="220" cy="50" r="10" fill="#818cf8"/>

              <circle cx="60" cy="150" r="20" fill="#a5b4fc" fillOpacity="0.15" stroke="#a5b4fc" strokeWidth="1.5"/>
              <circle cx="60" cy="150" r="10" fill="#a5b4fc"/>

              <circle cx="220" cy="150" r="20" fill="#c7d2fe" fillOpacity="0.15" stroke="#c7d2fe" strokeWidth="1.5"/>
              <circle cx="220" cy="150" r="10" fill="#c7d2fe"/>

              <circle cx="140" cy="20" r="16" fill="#7c3aed" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="1.5"/>
              <circle cx="140" cy="20" r="8" fill="#7c3aed"/>

              <circle cx="140" cy="180" r="16" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="1.5"/>
              <circle cx="140" cy="180" r="8" fill="#8b5cf6"/>

              {/* Connecting lines */}
              <line x1="115" y1="85" x2="75" y2="60" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="165" y1="85" x2="205" y2="60" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="115" y1="115" x2="75" y2="140" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="165" y1="115" x2="205" y2="140" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="130" y1="80" x2="130" y2="32" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="150" y1="120" x2="150" y2="172" stroke="#4f46e5" strokeWidth="1.5" strokeOpacity="0.4"/>

              {/* Small decorative nodes */}
              <circle cx="100" cy="35" r="6" fill="#c7d2fe"/>
              <circle cx="180" cy="35" r="6" fill="#c7d2fe"/>
              <circle cx="100" cy="165" r="6" fill="#c7d2fe"/>
              <circle cx="180" cy="165" r="6" fill="#c7d2fe"/>
            </svg>
          </div>

          {/* Feature list */}
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-slate-700">Streamlined student management</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-slate-700">Real-time attendance tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-slate-700">Automated fees management</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-slate-700">Smart class scheduling</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Login Form (60%, full on mobile) */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 bg-muted/50">
        {/* Mobile logo (hidden on desktop) */}
        <div className="lg:hidden flex items-center gap-2 mb-8 absolute top-8 left-1/2 -translate-x-1/2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">School App</span>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

import { BookOpen, ClipboardCheck, Users, DollarSign, Calendar } from 'lucide-react';
import { LoginForm } from '../../features/auth/components/login-form';

export function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding (40%, hidden on mobile) */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl gradient-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl gradient-blob" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl gradient-blob" />

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 w-full">
          {/* Logo area */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Corporate Trust</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Education Platform
          </h1>
          <p className="text-lg text-white/80 mb-10">
            Streamline your school management with our comprehensive platform designed for modern educators.
          </p>

          {/* Abstract SVG illustration */}
          <div className="mb-10 flex justify-center">
            <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Central node */}
              <circle cx="140" cy="100" r="30" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
              <circle cx="140" cy="100" r="16" fill="white"/>

              {/* Connected nodes */}
              <circle cx="60" cy="50" r="20" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              <circle cx="60" cy="50" r="10" fill="white"/>

              <circle cx="220" cy="50" r="20" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              <circle cx="220" cy="50" r="10" fill="white"/>

              <circle cx="60" cy="150" r="20" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              <circle cx="60" cy="150" r="10" fill="white"/>

              <circle cx="220" cy="150" r="20" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              <circle cx="220" cy="150" r="10" fill="white"/>

              <circle cx="140" cy="20" r="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              <circle cx="140" cy="20" r="8" fill="white"/>

              <circle cx="140" cy="180" r="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              <circle cx="140" cy="180" r="8" fill="white"/>

              {/* Connecting lines */}
              <line x1="115" y1="85" x2="75" y2="60" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="165" y1="85" x2="205" y2="60" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="115" y1="115" x2="75" y2="140" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="165" y1="115" x2="205" y2="140" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="130" y1="80" x2="130" y2="32" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="150" y1="120" x2="150" y2="172" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>

              {/* Small decorative nodes */}
              <circle cx="100" cy="35" r="6" fill="rgba(255,255,255,0.5)"/>
              <circle cx="180" cy="35" r="6" fill="rgba(255,255,255,0.5)"/>
              <circle cx="100" cy="165" r="6" fill="rgba(255,255,255,0.5)"/>
              <circle cx="180" cy="165" r="6" fill="rgba(255,255,255,0.5)"/>
            </svg>
          </div>

          {/* Feature list */}
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">Streamlined student management</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">Real-time attendance tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">Automated fees management</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">Smart class scheduling</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Login Form (60%, full on mobile) */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 bg-slate-50">
        {/* Mobile logo (hidden on desktop) */}
        <div className="lg:hidden absolute top-8 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Corporate Trust</span>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
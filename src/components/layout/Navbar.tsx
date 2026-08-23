import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  Bell, 
  Flame, 
  Award, 
  User, 
  LogOut, 
  ChevronDown, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Video, 
  FileText, 
  Briefcase,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Google Campus Drive Open', time: '10m ago', unread: true },
    { id: 2, title: 'Aptitude Test Score: 80% (Passed)', time: '2h ago', unread: true },
    { id: 3, title: 'AI Resume ATS Score Updated', time: '1d ago', unread: false }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Placement<span className="text-indigo-600">Genius</span>
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-indigo-100 text-indigo-700 rounded-md border border-indigo-200/60">
                    AI
                  </span>
                </span>
                <span className="text-[11px] font-medium text-slate-400 tracking-wide">Campus Prep & Hiring Portal</span>
              </div>
            </Link>

            {/* Quick Navigation Links (if logged in) */}
            {user && (
              <nav className="hidden lg:flex items-center gap-1 ml-4 text-sm font-medium text-slate-600">
                <Link to="/dashboard" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition">Dashboard</Link>
                <Link to="/aptitude" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition">Aptitude</Link>
                <Link to="/coding" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition">Coding</Link>
                <Link to="/interviews" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition">Mock Interview</Link>
                <Link to="/resume" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition">ATS Resume</Link>
                <Link to="/drives" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition">Drives</Link>
              </nav>
            )}
          </div>

          {/* Right Header Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                {/* Readiness Badge */}
                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100/80 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-sm">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Readiness: <strong className="text-indigo-900">{user.readinessScore}%</strong></span>
                  <div className="w-12 h-2 bg-indigo-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${user.readinessScore}%` }} />
                  </div>
                </div>

                {/* Daily Streak */}
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/70 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold" title={`${user.streakDays} Day Preparation Streak!`}>
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>{user.streakDays}d Streak</span>
                </div>

                {/* Notifications Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-ping" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 mb-2">
                        <span className="font-bold text-sm text-slate-800">Placement Updates</span>
                        <Link to="/notifications" onClick={() => setNotificationsOpen(false)} className="text-xs text-indigo-600 hover:underline">View All</Link>
                      </div>
                      <div className="space-y-1">
                        {notifications.map((n) => (
                          <div key={n.id} className={`p-2.5 rounded-xl text-xs flex flex-col gap-0.5 ${n.unread ? 'bg-indigo-50/70 text-slate-800 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-slate-900">{n.title}</span>
                              <span className="text-[10px] text-slate-400">{n.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Pill & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pl-2 rounded-full border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div className="hidden md:flex flex-col text-left pr-1">
                      <span className="text-xs font-bold text-slate-800 leading-tight">{user.name.split(' ')[0]}</span>
                      <span className="text-[10px] font-medium text-slate-400 capitalize">{user.role}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2">
                      <div className="p-3">
                        <p className="font-bold text-sm text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                          {user.education.degree} • {user.education.graduationYear}
                        </div>
                      </div>

                      <div className="py-1">
                        <Link 
                          to="/profile" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition"
                        >
                          <User className="w-4 h-4 text-indigo-500" />
                          <span>Student Profile & Resume</span>
                        </Link>
                        <Link 
                          to="/analytics" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition"
                        >
                          <Award className="w-4 h-4 text-cyan-500" />
                          <span>Placement Readiness Analytics</span>
                        </Link>
                      </div>

                      <div className="py-1">
                        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Switch Role
                        </div>
                        <div className="grid grid-cols-2 gap-1 px-2">
                          <button
                            onClick={() => { switchRole('student'); setProfileDropdownOpen(false); }}
                            className={`px-2.5 py-1 text-xs rounded-lg font-medium text-center transition ${user.role === 'student' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                          >
                            Student
                          </button>
                          <button
                            onClick={() => { switchRole('admin'); setProfileDropdownOpen(false); }}
                            className={`px-2.5 py-1 text-xs rounded-lg font-medium text-center transition ${user.role === 'admin' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                          >
                            TPO / Admin
                          </button>
                        </div>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-md shadow-indigo-200 transition"
                >
                  Student Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

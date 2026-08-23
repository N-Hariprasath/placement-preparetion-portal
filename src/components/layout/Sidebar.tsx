import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  Code2,
  Video,
  FileCheck2,
  Building2,
  BookOpenCheck,
  LineChart,
  UserCircle2,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Aptitude Tests', path: '/aptitude', icon: Brain, badge: '5 Free' },
    { name: 'Coding Arena', path: '/coding', icon: Code2, badge: 'LeetCode' },
    { name: 'AI Mock Interview', path: '/interviews', icon: Video, badge: 'AI Live' },
    { name: 'AI Resume ATS', path: '/resume', icon: FileCheck2, badge: 'Hot' },
    { name: 'Core CS & Notes', path: '/technical', icon: BookOpenCheck, badge: null },
    { name: 'Campus Drives', path: '/drives', icon: Building2, badge: '5 Open' },
    { name: 'Skill Analytics', path: '/analytics', icon: LineChart, badge: null },
    { name: 'Student Profile', path: '/profile', icon: UserCircle2, badge: null },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4 transition-all">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2">
            Preparation Suite
          </p>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-indigo-100 text-indigo-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* AI Quick Coach Banner */}
        <div className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 p-3.5 rounded-2xl border border-indigo-100/90 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">AI Career Coach</h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
            Ask any question regarding TCS NQT, Amazon DSA patterns, or resume improvements.
          </p>
          <NavLink
            to="/ai-mentor"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch AI Mentor</span>
          </NavLink>
        </div>
      </div>

      {/* Footer Info inside Sidebar */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between px-2 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Placement Ready
          </span>
          <span className="font-semibold text-slate-500">v2.4 Pro</span>
        </div>
      </div>
    </aside>
  );
};

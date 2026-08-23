import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Sparkles, ShieldCheck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-slate-900">
                Placement<span className="text-indigo-600">Genius</span> AI
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Empowering college engineers to land their dream job offers with real-time AI mock interviews, LeetCode style practice, and ATS resume intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Campus Verified Curriculum</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Preparation Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/aptitude" className="hover:text-indigo-600 transition">Quantitative & Logical Aptitude</Link></li>
              <li><Link to="/coding" className="hover:text-indigo-600 transition">Company Coding Problems</Link></li>
              <li><Link to="/interviews" className="hover:text-indigo-600 transition">Live AI Mock Interview Room</Link></li>
              <li><Link to="/resume" className="hover:text-indigo-600 transition">ATS Resume Optimizer</Link></li>
              <li><Link to="/technical" className="hover:text-indigo-600 transition">Core CS Subject Flashcards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Campus Placement</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/drives" className="hover:text-indigo-600 transition">Active Company Hiring Drives</Link></li>
              <li><Link to="/analytics" className="hover:text-indigo-600 transition">Readiness Score Radar</Link></li>
              <li><Link to="/ai-mentor" className="hover:text-indigo-600 transition">30-Day Placement Roadmap</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-600 transition">Placement Profile Portfolio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Dream Companies</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Google', 'Amazon', 'Microsoft', 'TCS Digital', 'Infosys SP', 'Zoho', 'Accenture', 'Cognizant', 'Adobe', 'Oracle'].map((c) => (
                <span key={c} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 94% Placement Success Rate
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PlacementGenius AI. Designed for ambitious engineers.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for campus champions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

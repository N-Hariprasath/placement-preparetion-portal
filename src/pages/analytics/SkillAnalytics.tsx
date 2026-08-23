import React from 'react';
import { 
  LineChart, 
  Award, 
  TrendingUp, 
  Brain, 
  Code2, 
  Video, 
  FileCheck2, 
  Target, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SkillAnalytics: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const companyFits = [
    { company: 'Google', match: 84, targetScore: 90, status: 'Strong Fit' },
    { company: 'Amazon', match: 88, targetScore: 85, status: 'Ready for SDE-1' },
    { company: 'TCS Digital', match: 94, targetScore: 80, status: 'Direct Qualifier' },
    { company: 'Infosys SP', match: 89, targetScore: 82, status: 'Qualified' },
    { company: 'Microsoft', match: 82, targetScore: 88, status: 'Revise System Design' }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <LineChart className="w-4 h-4 text-indigo-600" />
            <span>AI Placement Readiness & Velocity Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Analytics & Company Fit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Understand your strengths, identify critical skill gaps, and view your calculated hiring match percentage for target dream companies.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-5 py-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-center">
            <span className="text-2xl font-extrabold text-indigo-700">{user.readinessScore}%</span>
            <span className="block text-[10px] font-bold uppercase text-indigo-600">Aggregate Readiness</span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillar Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Quantitative Aptitude', score: 86, color: 'text-blue-600', icon: Brain, bg: 'bg-blue-50' },
          { label: 'DSA & Coding Arena', score: 78, color: 'text-indigo-600', icon: Code2, bg: 'bg-indigo-50' },
          { label: 'Mock Interview Voice', score: 88, color: 'text-purple-600', icon: Video, bg: 'bg-purple-50' },
          { label: 'ATS Resume Match', score: user.atsScore, color: 'text-emerald-600', icon: FileCheck2, bg: 'bg-emerald-50' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xl font-extrabold ${item.color}`}>{item.score}%</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{item.label}</h4>
                <p className="text-[11px] text-slate-400">Percentile: Top 8%</p>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-indigo-600 rounded-full`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dream Company Fit Percentage Calculator */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <span>Calculated Hiring Fit by Dream Company</span>
        </h3>

        <div className="space-y-3">
          {companyFits.map((cf, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-slate-900">{cf.company}</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700">
                    {cf.status}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-700">
                  Fit Index: <strong className="text-indigo-600 text-sm">{cf.match}%</strong> (Cutoff: {cf.targetScore}%)
                </span>
              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${cf.match >= cf.targetScore ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${cf.match}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

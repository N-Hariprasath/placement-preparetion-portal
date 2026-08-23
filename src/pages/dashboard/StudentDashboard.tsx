import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Flame, 
  Sparkles, 
  Brain, 
  Code2, 
  Video, 
  FileCheck2, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Zap, 
  Target, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockCampusDrives, mockAptitudeQuizzes, mockCodingProblems } from '../../data/mockData';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const quickArenas = [
    {
      title: 'Aptitude Mock Drill',
      subtitle: `${user.quizzesCompletedCount} Completed`,
      desc: 'Quantitative, Logical, & Verbal drills with AI shortcut tricks',
      icon: Brain,
      path: '/aptitude',
      color: 'from-blue-600 to-indigo-600',
      badge: '5 Available'
    },
    {
      title: 'Coding Arena',
      subtitle: `${user.solvedProblemsCount} Solved`,
      desc: 'Top Amazon, Google, & TCS hiring problems with live AI code tips',
      icon: Code2,
      path: '/coding',
      color: 'from-indigo-600 to-violet-600',
      badge: 'LeetCode Tracks'
    },
    {
      title: 'AI Mock Interview',
      subtitle: `${user.interviewsTakenCount} Sessions`,
      desc: 'Realistic AI Voice & Technical interviewer with STAR scorecards',
      icon: Video,
      path: '/interviews',
      color: 'from-violet-600 to-purple-600',
      badge: 'Live AI Room'
    },
    {
      title: 'AI Resume ATS',
      subtitle: `${user.atsScore}/100 Score`,
      desc: 'Keyword scanner, bullet point rewriter, and campus ATS check',
      icon: FileCheck2,
      path: '/resume',
      color: 'from-emerald-500 to-teal-600',
      badge: 'High Impact'
    }
  ];

  const upcomingDrives = mockCampusDrives.slice(0, 3);

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Banner with Readiness Gauge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-cyan-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Hiring Sprint 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user.name.split(' ')[0]}! 🚀
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Targeting: <strong className="text-white">{user.targetCompanies.slice(0, 4).join(', ')}</strong>. You are currently on track for Tier-1 Super Dream placements!
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold">
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>{user.streakDays} Days Daily Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold">
                <Target className="w-4 h-4 text-emerald-300" />
                <span>CGPA: {user.education.cgpa} / 10.0</span>
              </div>
            </div>
          </div>

          {/* Readiness Score Card */}
          <div className="w-full md:w-auto shrink-0 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-5 shadow-lg">
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/20"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-cyan-300"
                  fill="transparent"
                  strokeDasharray={238.76}
                  strokeDashoffset={238.76 - (238.76 * user.readinessScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-extrabold text-white">{user.readinessScore}%</span>
                <span className="block text-[9px] uppercase font-bold text-cyan-200">Ready</span>
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Tier-1 Qualified
              </span>
              <h4 className="text-sm font-bold text-white">Placement Index</h4>
              <p className="text-[11px] text-indigo-100">Top 5% in your batch</p>
              <Link
                to="/analytics"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 hover:text-white transition"
              >
                <span>View Full Radar</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Arena Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickArenas.map((arena, idx) => {
          const Icon = arena.icon;
          return (
            <Link
              key={idx}
              to={arena.path}
              className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-card hover:border-indigo-300 transition duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${arena.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {arena.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                    {arena.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-indigo-600 mb-1">{arena.subtitle}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{arena.desc}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Enter Arena</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recommended Plan & Upcoming Campus Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Recommended Daily Drill & Weak Areas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personalized Daily Drill Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Today's Recommended Placement Drill</h3>
                  <p className="text-xs text-slate-500">AI customized based on your recent accuracy</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                3 / 3 Tasks
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-indigo-50/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Solve "Merge Intervals" (Arrays & Sorting)</h4>
                    <p className="text-[11px] text-slate-500">Frequently asked in Amazon & Google SDE-1</p>
                  </div>
                </div>
                <Link
                  to="/coding"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Solve Now
                </Link>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-indigo-50/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Aptitude: Time & Work Speed Drill (5 Qs)</h4>
                    <p className="text-[11px] text-slate-500">TCS NQT & Infosys Foundation Pattern</p>
                  </div>
                </div>
                <Link
                  to="/aptitude"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Start Quiz
                </Link>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-indigo-50/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Review Flashcards: DBMS ACID & Indexing</h4>
                    <p className="text-[11px] text-slate-500">Core CS interview rounds essential</p>
                  </div>
                </div>
                <Link
                  to="/technical"
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
                >
                  Review
                </Link>
              </div>
            </div>
          </div>

          {/* Skill Breakdown & Subject Accuracy */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>Round-wise Proficiency Breakdown</span>
              </h3>
              <Link to="/analytics" className="text-xs font-bold text-indigo-600 hover:underline">
                Detailed Analytics
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Quantitative & Logical Aptitude', score: 84, color: 'bg-blue-600', status: 'High' },
                { name: 'Data Structures & Algorithms', score: 78, color: 'bg-indigo-600', status: 'Good' },
                { name: 'Core CS (DBMS, OS, CN)', score: 80, color: 'bg-emerald-600', status: 'Solid' },
                { name: 'HR & STAR Communication', score: 88, color: 'bg-purple-600', status: 'Excellent' },
              ].map((skill, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">{skill.name}</span>
                    <span className="font-bold text-slate-900">{skill.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Campus Drives & Deadlines */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Campus Drives Alert</h3>
              </div>
              <Link to="/drives" className="text-xs font-bold text-indigo-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingDrives.map((drive) => (
                <div
                  key={drive.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-indigo-300 bg-slate-50/50 hover:bg-indigo-50/30 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{drive.companyName}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                      {drive.ctc}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-1">{drive.role}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" /> Deadline: {drive.deadline}
                    </span>
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {drive.userApplicationStatus || 'Open'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/drives"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Track All Campus Applications</span>
            </Link>
          </div>

          {/* Quick AI Resume ATS Review Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-5 rounded-3xl border border-emerald-200/80 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-xs text-slate-900">Your Resume ATS Score</h4>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                {user.atsScore} / 100
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Your resume matches <strong>88%</strong> of keywords for campus SDE roles. Add 2 more cloud keywords to reach 95%.
            </p>
            <Link
              to="/resume"
              className="w-full flex items-center justify-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Analyze & Optimize Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

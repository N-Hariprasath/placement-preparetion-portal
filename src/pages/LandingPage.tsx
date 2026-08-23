import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  Brain, 
  Code2, 
  Video, 
  FileCheck2, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Award,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'Quantitative & Logical Aptitude',
      desc: 'Master 1000+ placement-pattern aptitude questions with step-by-step AI solutions, shortcut formulas, and timed mock assessments.',
      badge: 'Cognitive Test Ready',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Code2,
      title: 'Coding Arena & Company Problems',
      desc: 'Practice DSA problems asked in Amazon, Google, TCS Digital, and Microsoft. Multi-language editor with real-time AI code analysis & hints.',
      badge: 'LeetCode & Hackerrank Style',
      color: 'from-indigo-600 to-violet-600'
    },
    {
      icon: Video,
      title: 'Live AI Mock Interview Room',
      desc: 'Simulate high-pressure technical and HR interviews with our conversational AI interviewer. Receive instant STAR-method scorecards.',
      badge: 'Voice & Adaptive AI',
      color: 'from-violet-600 to-purple-600'
    },
    {
      icon: FileCheck2,
      title: 'AI Resume Analyzer & ATS Score',
      desc: 'Scan your resume against campus hiring filters. Get instant feedback on missing keywords, action verbs, and bullet point impact.',
      badge: '85%+ ATS Pass Rate',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Building2,
      title: 'Campus Drives & Placement Tracker',
      desc: 'Track on-campus and off-campus recruitment drives, eligibility rules (CGPA, backlogs), CTC packages, and interview stages.',
      badge: 'Direct Campus Pipeline',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Sparkles,
      title: '24/7 AI Career Mentor',
      desc: 'Personalized placement roadmaps, cold email templates, salary negotiation strategies, and core CS concept refreshers on demand.',
      badge: 'Instant Mentorship',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const stats = [
    { label: 'College Students Prepared', value: '45,000+' },
    { label: 'Campus Placement Rate', value: '94.8%' },
    { label: 'Partner Tech Companies', value: '180+' },
    { label: 'Average Package (CTC)', value: '₹12.4 LPA' }
  ];

  const companies = ['Google', 'Amazon', 'Microsoft', 'TCS Digital', 'Infosys SP', 'Zoho', 'Adobe', 'Oracle', 'Wipro Turbo', 'Accenture'];

  const testimonials = [
    {
      name: 'Pooja Sundaram',
      role: 'Placed at Google (SDE-1) • ₹32 LPA',
      college: 'CEG, Anna University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      comment: 'The AI Mock Interview room was a game changer! It simulated real technical follow-up questions that I actually faced during my Google rounds.'
    },
    {
      name: 'Aditya Sharma',
      role: 'Placed at Amazon (SDE) • ₹28 LPA',
      college: 'NIT Trichy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      comment: 'PlacementGenius helped me optimize my resume ATS score from 62 to 91 and prepared me with company-specific coding tracks. Truly the best platform for campus prep.'
    },
    {
      name: 'Rithika R',
      role: 'Placed at TCS Prime • ₹11.5 LPA',
      college: 'PSG Tech, Coimbatore',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      comment: 'The Quantitative and Logical aptitude drills with shortcut tips saved me huge time in the TCS NQT exam. Cracked Prime on my first attempt!'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-3xl bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border border-slate-200/80 shadow-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide animate-pulse-subtle">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Next-Gen AI Campus Placement Platform 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Land Your Dream <span className="text-gradient">Campus Job Offer</span> with AI-Powered Preparation
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
            All-in-one preparation portal for engineering students: Practice aptitude, solve company coding problems, take live AI mock interviews, boost your ATS resume score, and track top campus hiring drives.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 transition transform hover:-translate-y-0.5"
              >
                <span>Go to Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 transition transform hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start Free Preparation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm rounded-2xl shadow-sm transition"
                >
                  <span>Student Login</span>
                </Link>
              </>
            )}
          </div>

          {/* Key Trust Signals */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Free Mock Assessments
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Instant AI Speech & Code Feedback
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Company Specific Question Banks
            </span>
          </div>
        </div>

        {/* Company Logos Banner */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 max-w-6xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Prepare for hiring drives at top global product & IT companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 opacity-80">
            {companies.map((comp) => (
              <div
                key={comp}
                className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs text-xs font-bold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition"
              >
                {comp}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Platform Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((st, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{st.value}</div>
            <div className="text-xs font-semibold text-slate-500">{st.label}</div>
          </div>
        ))}
      </section>

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Everything You Need to Crack <span className="text-indigo-600">Every Hiring Round</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            From the initial online aptitude screening to the final technical & HR interview, our AI platform coaches you at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card hover:border-indigo-300 transition duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <span>Explore Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive AI Preview Banner */}
      <section className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-indigo-100 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AI Real-Time Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
            Practice AI Mock Interviews with Live Question Adaptations
          </h2>
          <p className="text-sm text-indigo-100 leading-relaxed">
            Our smart voice AI dynamically changes its questions based on how you answer, just like a senior Google or Amazon hiring manager!
          </p>
          <div className="pt-2">
            <Link
              to="/interviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm rounded-xl shadow-md transition"
            >
              <Video className="w-4 h-4 text-indigo-600" />
              <span>Try Live AI Mock Interview</span>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-96 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-cyan-200">AI Interviewer Evaluation</span>
            <span className="bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded font-bold">88 / 100</span>
          </div>
          <div className="space-y-1 text-slate-100">
            <p className="font-semibold text-white">Question: "Explain Floyd's cycle algorithm."</p>
            <p className="text-indigo-100 opacity-90 italic">"You clearly identified slow and fast pointers and accurately stated O(1) space complexity."</p>
          </div>
          <div className="pt-2 flex items-center justify-between text-[11px] text-cyan-200">
            <span>Communication: <strong>92%</strong></span>
            <span>Accuracy: <strong>88%</strong></span>
            <span>STAR Method: <strong>85%</strong></span>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Success Stories from <span className="text-indigo-600">Top Engineers</span>
          </h2>
          <p className="text-slate-500 text-sm">
            Read how college seniors transformed their placement preparation and secured high-paying dream packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] font-semibold text-indigo-600">{t.role}</p>
                  <p className="text-[10px] text-slate-400">{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-white border border-indigo-200/80 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-soft">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ready to Ace Your Campus Placement?
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Create your free student account now, check your placement readiness score, and start preparing with AI precision.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/signup"
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/20 transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

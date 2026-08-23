import React, { useState } from 'react';
import { 
  FileCheck2, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  Copy, 
  Check, 
  FileText, 
  RefreshCw, 
  TrendingUp, 
  Award,
  Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export const ResumeAnalyzer: React.FC = () => {
  const { user } = useAuth();

  const [targetRole, setTargetRole] = useState('Software Development Engineer (SDE-1)');
  const [resumeText, setResumeText] = useState(`HARIPRASATH N
Chennai, India | +91 98765 43210 | hari.prasath@college.edu | linkedin.com/in/hariprasath | github.com/hariprasath

EDUCATION
B.Tech in Computer Science and Engineering - Anna University (CGPA: 8.84) | 2022 - 2026

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, C++, Java, SQL
Web & Cloud: React.js, Node.js, Express, Docker, AWS (EC2, S3), Redis, PostgreSQL, Git

EXPERIENCE & PROJECTS
Distributed Cloud Task Scheduler (Node.js, Redis, Docker)
• Engineered a high-throughput async task queue that handled 5000+ jobs/sec with sub-50ms latency.
• Implemented distributed locking mechanisms to eliminate race conditions across worker pools.

AI Resume Parser & Scoring Engine (FastAPI, React, TailwindCSS)
• Built an NLP pipeline to parse candidate resumes and compute cosine similarity against job descriptions.
• Designed responsive UI resulting in 99.4% user satisfaction in campus beta testing.

CERTIFICATIONS & AWARDS
• AWS Certified Cloud Practitioner (2024)
• 150+ Problems Solved on LeetCode (Top 15% in Campus Coding Contest)`);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const matchedKeywords = [
    'Data Structures', 'JavaScript', 'TypeScript', 'Node.js', 'React.js',
    'Docker', 'AWS', 'Redis', 'PostgreSQL', 'SQL', 'FastAPI', 'Algorithms'
  ];

  const missingKeywords = [
    'System Design', 'Kubernetes', 'CI/CD Pipelines', 'GraphQL', 'Microservices Architecture', 'Unit Testing (Jest)'
  ];

  const bulletPointSuggestions = [
    {
      original: 'Worked on building the backend API and database schemas for task management.',
      improved: 'Architected and deployed RESTful microservices using Node.js and PostgreSQL, improving API response times by 35% across 10,000+ daily queries.',
      reason: 'Replaces passive verb "Worked on" with strong action verb "Architected" and quantifies impact with concrete metrics.'
    },
    {
      original: 'Helped in fixing bugs and improving UI design in React.',
      improved: 'Refactored frontend component tree with React 18 and TailwindCSS, cutting bundle size by 28% and boosting Lighthouse performance score to 98/100.',
      reason: 'Adds measurable performance metric and highlights specific modern libraries.'
    }
  ];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 700);
  };

  const handleCopyBullet = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-bold text-emerald-700">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>AI Resume Scanner & ATS Compatibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Resume Analyzer & Optimizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Scan your resume against campus hiring filters used by Amazon, Google, TCS, and Infosys. Identify missing keywords and enhance bullet points with action verbs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-5 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <span className="text-2xl font-extrabold text-emerald-700">88 / 100</span>
            <span className="block text-[10px] font-bold uppercase text-emerald-600">Current ATS Score</span>
          </div>
        </div>
      </div>

      {/* Target Role & Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Target Role:</span>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-indigo-700 focus:outline-none"
          >
            <option>Software Development Engineer (SDE-1)</option>
            <option>Full Stack Web Developer</option>
            <option>Data Analyst & AI Associate</option>
            <option>Cloud / DevOps Engineer</option>
            <option>QA & Automation Engineer</option>
          </select>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning Resume...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Re-analyze ATS Score</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Resume Editor Left | ATS Breakdown Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Resume Text Area */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-soft space-y-3 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Resume Content (Text / Markdown)</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Editable</span>
          </div>

          <textarea
            rows={18}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed resize-none min-h-[440px]"
          />
        </div>

        {/* Right: ATS Score Breakdown & Keyword Insights */}
        <div className="space-y-6">
          {/* ATS Metric Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>ATS Quality Radar</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Tier-1 Ready
              </span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Technical Keywords Match', score: 85, color: 'bg-emerald-500' },
                { label: 'Action Verbs & Impact Metrics', score: 92, color: 'bg-indigo-600' },
                { label: 'Formatting & Section Headers', score: 95, color: 'bg-blue-600' },
                { label: 'Length & Readability (1 Page)', score: 90, color: 'bg-purple-600' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-slate-900">{item.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Match Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Campus ATS Keyword Analysis</h3>

            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Found Keywords ({matchedKeywords.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {matchedKeywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1.5 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> High-Value Missing Keywords ({missingKeywords.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missingKeywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-semibold">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Bullet Point Enhancer */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">AI Bullet Point Transformations</h3>
            </div>

            <div className="space-y-3">
              {bulletPointSuggestions.map((sug, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                  <div className="text-slate-500 line-through">
                    <strong>Before:</strong> "{sug.original}"
                  </div>
                  <div className="p-2.5 bg-white border border-indigo-200 rounded-xl text-indigo-950 font-medium space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-indigo-700">AI Enhanced:</strong>
                      <button
                        onClick={() => handleCopyBullet(idx, sug.improved)}
                        className="p-1 text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-[10px]"
                        title="Copy improved bullet"
                      >
                        {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="leading-relaxed">"{sug.improved}"</p>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    💡 Why: {sug.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

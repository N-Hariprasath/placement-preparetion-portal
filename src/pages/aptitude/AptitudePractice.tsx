import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  Search, 
  Layers, 
  Target, 
  Zap,
  HelpCircle 
} from 'lucide-react';
import { mockAptitudeQuizzes } from '../../data/mockData';

export const AptitudePractice: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Assessments' },
    { id: 'quantitative', name: 'Quantitative Aptitude' },
    { id: 'logical', name: 'Logical Reasoning' },
    { id: 'core_cs', name: 'Core CS Subjects' },
  ];

  const filteredQuizzes = mockAptitudeQuizzes.filter((quiz) => {
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (quiz.companyTag && quiz.companyTag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span>Campus Placement Cognitive Round Practice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Aptitude & Assessment Drills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Timed interactive test environment matching actual TCS NQT, Infosys Cognitive, and Amazon assessment patterns with instant AI solutions.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <span className="text-xl font-extrabold text-emerald-700">84%</span>
            <span className="block text-[10px] font-bold uppercase text-emerald-600">Avg. Accuracy</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. Work, Blood Relations)..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-card hover:border-indigo-300 transition duration-200 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {quiz.difficulty}
                </span>
                {quiz.companyTag && (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {quiz.companyTag}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition">
                {quiz.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {quiz.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                  {quiz.questionsCount} Questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {quiz.durationMinutes} Minutes
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                to={`/aptitude/quiz/${quiz.id}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips Box */}
      <div className="bg-gradient-to-r from-indigo-50 to-sky-50 p-6 rounded-3xl border border-indigo-200/80 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shrink-0 mt-0.5">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Aptitude Speed Formula Cheat Sheet</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never solve using linear algebraic equations in online tests. Use unitary shortcuts and elimination for 3x speed!
            </p>
          </div>
        </div>
        <Link
          to="/technical"
          className="shrink-0 px-4 py-2 bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-xl transition"
        >
          View Shortcuts
        </Link>
      </div>
    </div>
  );
};

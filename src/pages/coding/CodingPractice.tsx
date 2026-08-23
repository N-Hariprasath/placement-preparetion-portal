import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  Zap, 
  BookOpen 
} from 'lucide-react';
import { mockCodingProblems } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export const CodingPractice: React.FC = () => {
  const { user } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const companies = ['all', 'Amazon', 'Google', 'TCS Digital', 'Microsoft', 'Infosys SP', 'Adobe'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = mockCodingProblems.filter((p) => {
    const matchesDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    const matchesComp = selectedCompany === 'all' || p.companyTags.some((c) => c.toLowerCase().includes(selectedCompany.toLowerCase()));
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesComp && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <Code2 className="w-4 h-4 text-indigo-600" />
            <span>LeetCode & HackerRank Style Practice Arena</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Coding & DSA Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            High-frequency data structures and algorithm challenges asked in product & service-based technical rounds. Includes multi-language editor & instant AI code feedback.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-2xl text-center">
            <span className="text-xl font-extrabold text-indigo-700">{user?.solvedProblemsCount || 148}</span>
            <span className="block text-[10px] font-bold uppercase text-indigo-600">Problems Solved</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by name, category, or algorithm..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  selectedDifficulty === diff
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {diff === 'all' ? 'All Diff.' : diff}
              </button>
            ))}
          </div>

          {/* Company filter */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">🏢 All Companies</option>
            {companies.filter(c => c !== 'all').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problem Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Title & Category</th>
                <th className="py-3.5 px-6">Difficulty</th>
                <th className="py-3.5 px-6">Company Tags</th>
                <th className="py-3.5 px-6">Acceptance</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProblems.map((p, idx) => (
                <tr key={p.id} className="hover:bg-indigo-50/40 transition">
                  <td className="py-4 px-6">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/coding/${p.slug}`}
                      className="font-bold text-slate-900 hover:text-indigo-600 text-sm block"
                    >
                      {idx + 1}. {p.title}
                    </Link>
                    <span className="text-[11px] text-slate-500">{p.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      p.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : p.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {p.companyTags.slice(0, 3).map((comp) => (
                        <span key={comp} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold">
                          {comp}
                        </span>
                      ))}
                      {p.companyTags.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-bold">
                          +{p.companyTags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-600">
                    {p.acceptanceRate}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/coding/${p.slug}`}
                      className="inline-flex items-center gap-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      <span>Solve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

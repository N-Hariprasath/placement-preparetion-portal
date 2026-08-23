import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  Filter, 
  ExternalLink, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockCampusDrives } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { CampusDrive } from '../../types';

export const CampusDrives: React.FC = () => {
  const { user } = useAuth();
  const [drives, setDrives] = useState<CampusDrive[]>(mockCampusDrives);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Applied' | 'Open'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedDriveModal, setAppliedDriveModal] = useState<CampusDrive | null>(null);

  const handleApplyDrive = (driveId: string) => {
    setDrives((prev) =>
      prev.map((d) => {
        if (d.id === driveId) {
          const nextStatus = d.userApplicationStatus === 'Not Applied' ? 'Applied' : 'Tech Round';
          return { ...d, userApplicationStatus: nextStatus };
        }
        return d;
      })
    );

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const filteredDrives = drives.filter((d) => {
    const matchesFilter =
      selectedFilter === 'All'
        ? true
        : selectedFilter === 'Applied'
        ? d.userApplicationStatus && d.userApplicationStatus !== 'Not Applied'
        : d.status === 'Open';

    const matchesSearch =
      d.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Official Campus Recruitment & Drive Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Placement Drives
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Directly apply to visiting company recruitment drives, check eligibility cutoffs (CGPA, backlogs), and track each interview round in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-5 py-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-center">
            <span className="text-2xl font-extrabold text-indigo-700">{drives.length}</span>
            <span className="block text-[10px] font-bold uppercase text-indigo-600">Active Drives</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
          {(['All', 'Open', 'Applied'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${
                selectedFilter === filter
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter === 'All' ? 'All Company Drives' : filter}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, role or city..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDrives.map((drive) => {
          const isEligible = (user?.education.cgpa || 8.5) >= drive.eligibility.minCgpa;

          return (
            <div
              key={drive.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-card hover:border-indigo-300 transition duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      {drive.companyName}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-700">{drive.role}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-xl border border-emerald-200 shrink-0">
                    {drive.ctc}
                  </span>
                </div>

                {/* Details Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{drive.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{drive.jobType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Deadline: {drive.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Drive: {drive.driveDate}</span>
                  </div>
                </div>

                {/* Eligibility Check */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Eligibility Criteria:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      isEligible ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {isEligible ? '✓ You are Eligible' : 'CGPA Below Cutoff'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Min CGPA: <strong>{drive.eligibility.minCgpa}</strong> • Branches: {drive.eligibility.branches.join(', ')} • Max Arrears: {drive.eligibility.maxBacklogs}
                  </p>
                </div>

                {/* Hiring Rounds */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hiring Pipeline:</span>
                  <div className="flex flex-wrap gap-1">
                    {drive.rounds.map((rnd, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">
                        {i + 1}. {rnd}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button & Application Status */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400 font-medium">Status: </span>
                  <strong className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {drive.userApplicationStatus || 'Not Applied'}
                  </strong>
                </div>

                <button
                  onClick={() => handleApplyDrive(drive.id)}
                  disabled={!isEligible}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition shadow-xs ${
                    drive.userApplicationStatus === 'Applied' || drive.userApplicationStatus === 'Tech Round' || drive.userApplicationStatus === 'OA Scheduled'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {drive.userApplicationStatus === 'Not Applied' ? '1-Click Apply' : 'Update Stage'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Award, 
  Sparkles, 
  Trash2, 
  Check 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'drive' | 'test' | 'ai' | 'general';
  unread: boolean;
  link?: string;
}

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Google Campus Recruitment Drive 2026 Open',
      description: 'Google SDE-1 applications are now officially open for 2026 Batch with 8.0+ CGPA cutoff.',
      time: '15 mins ago',
      type: 'drive',
      unread: true,
      link: '/drives'
    },
    {
      id: 'n2',
      title: 'Aptitude Assessment Result: 85% Score',
      description: 'You completed Quantitative Aptitude Master Drill and ranked in the top 5% of test takers.',
      time: '3 hours ago',
      type: 'test',
      unread: true,
      link: '/aptitude'
    },
    {
      id: 'n3',
      title: 'AI Resume ATS Score Boosted to 88/100',
      description: 'Your recent bullet-point optimizations have increased your campus ATS match by 12 points.',
      time: '1 day ago',
      type: 'ai',
      unread: false,
      link: '/resume'
    },
    {
      id: 'n4',
      title: 'TCS Digital Technical Round Scheduled',
      description: 'Your application status moved to Tech Round 1. Revisit Core CS flashcards and arrays.',
      time: '2 days ago',
      type: 'drive',
      unread: false,
      link: '/drives'
    }
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>Placement Alerts & Announcements</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notifications & Updates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Stay on top of campus drive registration deadlines, online assessment results, and AI coaching recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition"
          >
            <Check className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={clearAll}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft divide-y divide-slate-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Bell className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold">No notifications right now.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 flex items-start justify-between gap-4 transition ${
                n.unread ? 'bg-indigo-50/40' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-2xl shrink-0 mt-0.5 ${
                  n.type === 'drive' ? 'bg-amber-100 text-amber-800' :
                  n.type === 'test' ? 'bg-blue-100 text-blue-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {n.type === 'drive' ? <Building2 className="w-5 h-5" /> :
                   n.type === 'test' ? <Award className="w-5 h-5" /> :
                   <Sparkles className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900">{n.title}</h3>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.description}</p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                    <span>{n.time}</span>
                    {n.link && (
                      <Link to={n.link} className="text-indigo-600 font-bold hover:underline">
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

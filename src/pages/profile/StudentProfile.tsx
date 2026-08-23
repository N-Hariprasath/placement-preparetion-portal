import React, { useState } from 'react';
import { 
  UserCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Award, 
  Code2, 
  FolderGit2, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Sparkles, 
  ExternalLink, 
  Save, 
  Download, 
  Edit3 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export const StudentProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  if (!user) return null;

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    headline: user.headline,
    bio: user.bio,
    location: user.location,
    cgpa: user.education.cgpa,
    college: user.education.college,
    degree: user.education.degree,
    branch: user.education.branch,
    graduationYear: user.education.graduationYear,
    github: user.socialLinks.github || '',
    linkedin: user.socialLinks.linkedin || '',
    leetcode: user.socialLinks.leetcode || ''
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState(85);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      headline: formData.headline,
      bio: formData.bio,
      location: formData.location,
      education: {
        ...user.education,
        college: formData.college,
        degree: formData.degree,
        branch: formData.branch,
        cgpa: Number(formData.cgpa),
        graduationYear: Number(formData.graduationYear)
      },
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        leetcode: formData.leetcode
      }
    });

    setIsSaved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const updatedSkills = [
      ...user.skills,
      { name: newSkillName.trim(), category: 'Custom', proficiency: Number(newSkillProficiency) }
    ];
    updateProfile({ skills: updatedSkills });
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillIndex: number) => {
    const updatedSkills = user.skills.filter((_, i) => i !== skillIndex);
    updateProfile({ skills: updatedSkills });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner & Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                Verified Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">{user.headline}</p>
            <p className="text-xs text-slate-400">
              {user.education.college} • {user.education.branch} ({user.education.graduationYear})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            <span>Export Placement Card</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully! Readiness index updated.</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Basic Details & Academics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <UserCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Personal Information</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">About / Summary</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Academic Records */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-600" />
              <span>Campus Academic Credentials</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">College / Institute</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branch</label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current CGPA (out of 10)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Passing Out Batch</label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Matrix & Proficiency */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <span>Technical Skills & Proficiency</span>
            </h3>
            <span className="text-xs text-slate-400">{user.skills.length} Skills Listed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {user.skills.map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800">{s.name}</span>
                    <span className="text-indigo-600">{s.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.proficiency}%` }} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(idx)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Skill Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g. Next.js, Kubernetes)..."
              className="flex-1 min-w-[200px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
            <input
              type="number"
              min="1"
              max="100"
              value={newSkillProficiency}
              onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
              className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              placeholder="Prof %"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs rounded-xl transition"
            >
              + Add Skill
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
};

/* ApexHire AI - State Management & Persistence */

const AppStore = {
  // Key names in LocalStorage
  STORAGE_KEYS: {
    PROFILE: 'apex_user_profile',
    ROLE: 'apex_user_role',
    THEME: 'apex_user_theme',
    SOLVED_PROBLEMS: 'apex_solved_problems',
    ASSESSMENT_RESULTS: 'apex_assessment_results',
    INTERVIEW_SESSIONS: 'apex_interview_sessions',
    RESUME_DATA: 'apex_resume_data',
    BOOKMARKS: 'apex_bookmarks'
  },

  // Default User State
  defaultProfile: {
    name: "Alex Morgan",
    email: "alex.morgan@university.edu",
    college: "Institute of Technology",
    branch: "Computer Science & Engineering",
    cgpa: "8.9 / 10",
    gradYear: "2026",
    skills: ["Python", "JavaScript", "React", "Data Structures", "SQL", "Git"],
    targetRoles: ["Software Development Engineer", "Full Stack Developer"],
    certifications: ["AWS Certified Developer", "Meta Frontend Specialization"],
    projects: [
      { title: "E-Commerce Cloud Engine", tech: "Node.js, MongoDB, React" },
      { title: "AI Placement Predictor", tech: "Python, Scikit-Learn" }
    ],
    streakCount: 7
  },

  // Get current active user role
  getRole() {
    return localStorage.getItem(this.STORAGE_KEYS.ROLE) || 'student';
  },

  setRole(role) {
    localStorage.setItem(this.STORAGE_KEYS.ROLE, role);
  },

  // Get current profile
  getProfile() {
    const data = localStorage.getItem(this.STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : this.defaultProfile;
  },

  saveProfile(profileData) {
    localStorage.setItem(this.STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
  },

  // Solved coding problems
  getSolvedProblems() {
    const data = localStorage.getItem(this.STORAGE_KEYS.SOLVED_PROBLEMS);
    return data ? JSON.parse(data) : ["prob-1"]; // Default 1 solved
  },

  markProblemSolved(problemId) {
    const solved = this.getSolvedProblems();
    if (!solved.includes(problemId)) {
      solved.push(problemId);
      localStorage.setItem(this.STORAGE_KEYS.SOLVED_PROBLEMS, JSON.stringify(solved));
    }
  },

  // Assessment results history
  getAssessmentResults() {
    const data = localStorage.getItem(this.STORAGE_KEYS.ASSESSMENT_RESULTS);
    return data ? JSON.parse(data) : [
      { id: "apt-1", score: 3, total: 3, date: new Date().toLocaleDateString(), percentage: 100 }
    ];
  },

  saveAssessmentResult(result) {
    const results = this.getAssessmentResults();
    results.unshift(result);
    localStorage.setItem(this.STORAGE_KEYS.ASSESSMENT_RESULTS, JSON.stringify(results));
  },

  // Interview Sessions
  getInterviewSessions() {
    const data = localStorage.getItem(this.STORAGE_KEYS.INTERVIEW_SESSIONS);
    return data ? JSON.parse(data) : [
      { role: "Frontend Dev", score: 85, feedback: "Great articulation of async concepts. Work on STAR method phrasing." }
    ];
  },

  saveInterviewSession(session) {
    const sessions = this.getInterviewSessions();
    sessions.unshift(session);
    localStorage.setItem(this.STORAGE_KEYS.INTERVIEW_SESSIONS, JSON.stringify(sessions));
  },

  // Calculate Overall Placement Readiness Index (0-100%)
  calculateReadinessScore() {
    const solvedCount = this.getSolvedProblems().length;
    const totalProblems = AppData.codingProblems.length;
    const codingScore = Math.min(100, Math.round((solvedCount / totalProblems) * 35));

    const assessments = this.getAssessmentResults();
    let avgQuizPct = 70;
    if (assessments.length > 0) {
      const sum = assessments.reduce((acc, curr) => acc + curr.percentage, 0);
      avgQuizPct = Math.round(sum / assessments.length);
    }
    const quizScore = Math.round((avgQuizPct / 100) * 35);

    const interviews = this.getInterviewSessions();
    let interviewScore = 20;
    if (interviews.length > 0) {
      interviewScore = Math.round((interviews[0].score / 100) * 20);
    }

    const profile = this.getProfile();
    const profileCompleteness = (profile.skills.length >= 3 && profile.projects.length >= 1) ? 10 : 5;

    const totalReadiness = Math.min(98, codingScore + quizScore + interviewScore + profileCompleteness);
    return totalReadiness;
  }
};

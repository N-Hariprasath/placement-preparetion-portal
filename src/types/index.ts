export type UserRole = 'student' | 'admin' | 'recruiter';

export interface Education {
  college: string;
  degree: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  tenthPercentage: number;
  twelfthPercentage: number;
  standingArrears: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  headline: string;
  bio: string;
  location: string;
  education: Education;
  skills: { name: string; category: string; proficiency: number }[]; // 1-100
  projects: Project[];
  certifications: Certification[];
  targetCompanies: string[];
  targetRoles: string[];
  readinessScore: number;
  streakDays: number;
  solvedProblemsCount: number;
  quizzesCompletedCount: number;
  interviewsTakenCount: number;
  atsScore: number;
  resumeUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    leetcode?: string;
    portfolio?: string;
  };
}

export interface AptitudeQuestion {
  id: string;
  category: 'quantitative' | 'logical' | 'verbal' | 'core_cs';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  shortcutTip?: string;
  timeLimitSeconds?: number;
}

export interface AptitudeQuiz {
  id: string;
  title: string;
  description: string;
  category: 'quantitative' | 'logical' | 'verbal' | 'core_cs' | 'comprehensive';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Company-Specific';
  companyTag?: string;
  questionsCount: number;
  durationMinutes: number;
  questions: AptitudeQuestion[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companyTags: string[];
  acceptanceRate: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  solutionExplanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  testCases: TestCase[];
  hints: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Technical' | 'Behavioral' | 'System Design' | 'Core CS' | 'HR';
  difficulty: 'Junior' | 'Mid-Level' | 'Senior';
  expectedKeywords: string[];
  idealAnswer: string;
  followUpPrompt?: string;
}

export interface MockInterviewSession {
  id: string;
  title: string;
  type: 'Technical DSA' | 'Core CS & OOPs' | 'System Design' | 'HR & STAR Behavioral' | 'Company Specific';
  companyTarget?: string;
  durationMinutes: number;
  questions: InterviewQuestion[];
}

export interface InterviewFeedback {
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  starAdherenceScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  actionableTips: string[];
  questionEvaluations: {
    questionId: string;
    userTranscript: string;
    score: number;
    feedback: string;
    modelAnswer: string;
  }[];
}

export interface CampusDrive {
  id: string;
  companyName: string;
  companyLogo: string;
  role: string;
  jobType: 'Full-Time' | 'Internship' | 'Intern + FTE';
  location: string;
  ctc: string; // e.g. "12 LPA", "7.5 LPA"
  deadline: string;
  driveDate: string;
  eligibility: {
    minCgpa: number;
    branches: string[];
    maxBacklogs: number;
    batch: number;
  };
  description: string;
  rounds: string[];
  status: 'Open' | 'Upcoming' | 'Closed';
  userApplicationStatus?: 'Not Applied' | 'Applied' | 'OA Scheduled' | 'Tech Round' | 'HR Round' | 'Selected' | 'Rejected';
}

export interface TechnicalFlashcard {
  id: string;
  subject: 'DBMS' | 'Operating Systems' | 'Computer Networks' | 'OOP' | 'System Design';
  topic: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  keyPoints: string[];
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface ResumeAnalysisResult {
  atsScore: number;
  summary: string;
  keywordMatchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  bulletPointSuggestions: {
    original: string;
    improved: string;
    reason: string;
  }[];
  formattingFeedback: string[];
  recommendedRoles: string[];
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, UserRole } from '../types';
import { initialStudentProfile } from '../data/mockData';

interface AuthContextType {
  user: StudentProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  signup: (userData: Partial<StudentProfile>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  incrementSolvedCount: () => void;
  incrementQuizCount: () => void;
  incrementInterviewCount: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('placement_portal_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return initialStudentProfile;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('placement_portal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('placement_portal_user');
    }
  }, [user]);

  const login = async (email: string, role: UserRole = 'student'): Promise<boolean> => {
    // Simulate API network latency
    await new Promise((res) => setTimeout(res, 500));
    
    if (user && user.email === email) {
      setUser({ ...user, role });
      return true;
    }

    // Default fallback to mock profile
    const loggedUser: StudentProfile = {
      ...initialStudentProfile,
      email,
      role
    };
    setUser(loggedUser);
    return true;
  };

  const signup = async (userData: Partial<StudentProfile>): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 600));
    
    const newUser: StudentProfile = {
      ...initialStudentProfile,
      ...userData,
      id: 'std_' + Math.floor(Math.random() * 10000),
      readinessScore: 70,
      streakDays: 1,
      solvedProblemsCount: 0,
      quizzesCompletedCount: 0,
      interviewsTakenCount: 0,
      atsScore: 75
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...updated };
    });
  };

  const incrementSolvedCount = () => {
    setUser((prev) => {
      if (!prev) return null;
      const newSolved = prev.solvedProblemsCount + 1;
      const newScore = Math.min(100, prev.readinessScore + 1);
      return { ...prev, solvedProblemsCount: newSolved, readinessScore: newScore };
    });
  };

  const incrementQuizCount = () => {
    setUser((prev) => {
      if (!prev) return null;
      const newQuiz = prev.quizzesCompletedCount + 1;
      const newScore = Math.min(100, prev.readinessScore + 1);
      return { ...prev, quizzesCompletedCount: newQuiz, readinessScore: newScore };
    });
  };

  const incrementInterviewCount = () => {
    setUser((prev) => {
      if (!prev) return null;
      const newInt = prev.interviewsTakenCount + 1;
      const newScore = Math.min(100, prev.readinessScore + 2);
      return { ...prev, interviewsTakenCount: newInt, readinessScore: newScore };
    });
  };

  const switchRole = (role: UserRole) => {
    setUser((prev) => (prev ? { ...prev, role } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        incrementSolvedCount,
        incrementQuizCount,
        incrementInterviewCount,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

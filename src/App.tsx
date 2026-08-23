import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Protected Student Pages
import { StudentDashboard } from './pages/dashboard/StudentDashboard';
import { StudentProfile } from './pages/profile/StudentProfile';
import { AptitudePractice } from './pages/aptitude/AptitudePractice';
import { AptitudeQuiz } from './pages/aptitude/AptitudeQuiz';
import { CodingPractice } from './pages/coding/CodingPractice';
import { CodingArena } from './pages/coding/CodingArena';
import { TechnicalPrep } from './pages/technical/TechnicalPrep';
import { MockInterviews } from './pages/interview/MockInterviews';
import { ResumeAnalyzer } from './pages/resume/ResumeAnalyzer';
import { CampusDrives } from './pages/drives/CampusDrives';
import { SkillAnalytics } from './pages/analytics/SkillAnalytics';
import { AICareerAssistant } from './pages/ai/AICareerAssistant';
import { NotificationsPage } from './pages/notifications/NotificationsPage';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude"
              element={
                <ProtectedRoute>
                  <AptitudePractice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/quiz/:quizId"
              element={
                <ProtectedRoute>
                  <AptitudeQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coding"
              element={
                <ProtectedRoute>
                  <CodingPractice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coding/:slug"
              element={
                <ProtectedRoute>
                  <CodingArena />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interviews"
              element={
                <ProtectedRoute>
                  <MockInterviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <ResumeAnalyzer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/technical"
              element={
                <ProtectedRoute>
                  <TechnicalPrep />
                </ProtectedRoute>
              }
            />
            <Route
              path="/drives"
              element={
                <ProtectedRoute>
                  <CampusDrives />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <SkillAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-mentor"
              element={
                <ProtectedRoute>
                  <AICareerAssistant />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

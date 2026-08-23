import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  Play, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockInterviewSessions } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export const MockInterviews: React.FC = () => {
  const { incrementInterviewCount, user } = useAuth();
  const [selectedSessionId, setSelectedSessionId] = useState<string>('interview-sde-1');
  const [inLiveRoom, setInLiveRoom] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [answersList, setAnswersList] = useState<{ question: string; answer: string; feedback?: string }[]>([]);
  const [voiceMuted, setVoiceMuted] = useState(false);

  const activeSession = mockInterviewSessions.find((s) => s.id === selectedSessionId) || mockInterviewSessions[0];
  const currentQuestion = activeSession.questions[currentQuestionIdx];

  // Speech synthesis for AI Interviewer voice
  const speakAIQuestion = (text: string) => {
    if (voiceMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (inLiveRoom && currentQuestion) {
      speakAIQuestion(currentQuestion.question);
    }
  }, [inLiveRoom, currentQuestionIdx]);

  const handleStartSession = () => {
    setInLiveRoom(true);
    setSessionCompleted(false);
    setCurrentQuestionIdx(0);
    setAnswersList([]);
    setUserAnswer('');
  };

  const handleToggleMic = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate live voice recognition typing
      setTimeout(() => {
        setUserAnswer((prev) => 
          prev ? prev + ' I focused on optimizing time complexity to O(N) by using a hash map and ensured edge cases were handled gracefully.'
               : 'In my project, I implemented a distributed queue to decouple workers. We handled race conditions with Redis locks and improved throughput by 40%.'
        );
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleNextQuestion = () => {
    if (!userAnswer.trim()) {
      alert('Please provide your response either via mic or by typing before proceeding.');
      return;
    }

    const newAnswerItem = {
      question: currentQuestion.question,
      answer: userAnswer,
      feedback: 'Strong technical clarity. Good mention of metrics and time complexity trade-offs.'
    };

    setAnswersList((prev) => [...prev, newAnswerItem]);
    setUserAnswer('');

    if (currentQuestionIdx < activeSession.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Completed interview
      setInLiveRoom(false);
      setSessionCompleted(true);
      incrementInterviewCount();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <Video className="w-4 h-4 text-indigo-600" />
            <span>AI Real-Time Voice & Behavioral Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Mock Interview Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Practice live technical & HR rounds with our conversational AI interviewer. Receive instant STAR-method scorecards and speech delivery analysis.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-2xl text-center">
            <span className="text-xl font-extrabold text-purple-700">{user?.interviewsTakenCount || 6}</span>
            <span className="block text-[10px] font-bold uppercase text-purple-600">Interviews Completed</span>
          </div>
        </div>
      </div>

      {!inLiveRoom && !sessionCompleted && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-slate-900">Select Interview Track:</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockInterviewSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSessionId(session.id)}
                className={`cursor-pointer p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                  selectedSessionId === session.id
                    ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300 shadow-soft'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-indigo-700 border border-indigo-200">
                      {session.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {session.durationMinutes} Mins
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{session.title}</h3>
                  <p className="text-xs text-slate-500">
                    Target Companies: <strong className="text-slate-700">{session.companyTarget}</strong>
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Sample Questions:</p>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                      {session.questions.map((q, i) => (
                        <li key={i} className="line-clamp-1">{q.question}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600">
                    {selectedSessionId === session.id ? '✓ Selected Track' : 'Click to select'}
                  </span>
                  <button
                    onClick={handleStartSession}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Start AI Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live AI Interview Room */}
      {inLiveRoom && currentQuestion && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
          {/* Room Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{activeSession.title}</h3>
                <p className="text-xs text-slate-500">Question {currentQuestionIdx + 1} of {activeSession.questions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceMuted(!voiceMuted)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                  voiceMuted ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
                <span className="hidden sm:inline">{voiceMuted ? 'Muted' : 'AI Voice On'}</span>
              </button>
              <button
                onClick={() => setInLiveRoom(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                End Session
              </button>
            </div>
          </div>

          {/* AI Interviewer Avatar & Question Box */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className={`w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl transition-transform ${
                isSpeaking ? 'scale-105 ring-4 ring-indigo-300 animate-pulse' : ''
              }`}>
                <Bot className="w-12 h-12" />
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                {isSpeaking ? 'AI Speaking...' : 'AI Interviewer'}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-3 text-center md:text-left flex-1">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-100 text-indigo-800">
                {currentQuestion.category} • {currentQuestion.difficulty}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                "{currentQuestion.question}"
              </h2>
              <div className="flex flex-wrap gap-1.5 items-center justify-center md:justify-start pt-1">
                <span className="text-[11px] font-bold text-slate-400">Keywords Expected:</span>
                {currentQuestion.expectedKeywords.map((kw) => (
                  <span key={kw} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[10px] font-semibold text-slate-700">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Student Response Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Your Answer:</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleMic}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                  }`}
                >
                  {isRecording ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span>{isRecording ? 'Listening (Speaking)...' : 'Use Microphone'}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Speak via microphone or type your response using the STAR format (Situation, Task, Action, Result)..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed"
            />
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-500/20 transition"
            >
              <span>Submit Answer & Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Post-Interview Comprehensive AI Scorecard */}
      {sessionCompleted && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>AI Interview Evaluation Generated</span>
              </div>
              <h2 className="text-2xl font-extrabold">Interview Performance Scorecard</h2>
              <p className="text-xs text-indigo-100">
                Detailed assessment for <strong>{activeSession.title}</strong>
              </p>
            </div>

            <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
              <span className="text-3xl font-extrabold text-cyan-300">88%</span>
              <span className="block text-[10px] uppercase font-bold text-white">Overall Readiness</span>
            </div>
          </div>

          {/* Metric Ratings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Technical Depth', score: 86, color: 'text-indigo-600' },
              { label: 'Communication Fluency', score: 92, color: 'text-emerald-600' },
              { label: 'STAR Method Adherence', score: 84, color: 'text-purple-600' },
              { label: 'Problem Solving Speed', score: 90, color: 'text-blue-600' },
            ].map((metric, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center space-y-1">
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.score}%</div>
                <div className="text-xs font-semibold text-slate-600">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Detailed Question Reviews */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Question-by-Question AI Feedback</h3>
            {answersList.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                <p className="font-bold text-slate-900">Q{idx + 1}: {item.question}</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700">
                  <strong>Your Response:</strong> {item.answer}
                </div>
                <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>AI Feedback:</strong> {item.feedback}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Retake Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                setSessionCompleted(false);
                setInLiveRoom(false);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Mock Interview</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

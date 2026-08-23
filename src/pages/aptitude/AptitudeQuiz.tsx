import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Calculator, 
  X, 
  ArrowLeft,
  Award,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockAptitudeQuizzes } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export const AptitudeQuiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { incrementQuizCount } = useAuth();

  const quiz = mockAptitudeQuizzes.find((q) => q.id === quizId) || mockAptitudeQuizzes[0];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [questionId: string]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // Timer logic
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    const currentQ = quiz.questions[currentIdx];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleToggleReview = () => {
    const currentQ = quiz.questions[currentIdx];
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    incrementQuizCount();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const currentQuestion = quiz.questions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  // Calculate score
  let correctCount = 0;
  quiz.questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });
  const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);

  // Simple Calculator function
  const handleCalcClick = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === '=') {
      try {
        // Safe evaluation of basic numbers and arithmetic
        const clean = calcInput.replace(/[^0-9+\-*/.]/g, '');
        const res = Function(`'use strict'; return (${clean})`)();
        setCalcResult(String(res));
      } catch {
        setCalcResult('Error');
      }
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/aptitude"
            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{quiz.title}</h1>
            <p className="text-xs text-slate-500">{quiz.category.toUpperCase()} • {quiz.questions.length} Questions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Virtual Calculator Toggle */}
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {/* Countdown Timer */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${
            timeLeft < 120
              ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleSubmitQuiz}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>

      {/* Main Assessment Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Cols: Question & Options */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6 min-h-[420px] flex flex-col justify-between">
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-600 text-white font-bold text-xs rounded-lg">
                    Q {currentIdx + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {currentQuestion.topic}
                  </span>
                </div>

                {!isSubmitted && (
                  <button
                    onClick={handleToggleReview}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition ${
                      markedForReview[currentQuestion.id]
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentQuestion.id] ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                )}
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {currentQuestion.question}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                  const isCorrect = optIdx === currentQuestion.correctAnswer;
                  
                  let optionStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';

                  if (isSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold ring-2 ring-indigo-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-xs sm:text-sm">{opt}</span>
                      </div>

                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* AI Explanation Box if Submitted */}
              {isSubmitted && (
                <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200/90 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>AI Step-by-Step Solution:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
                  {currentQuestion.shortcutTip && (
                    <div className="p-2.5 bg-white rounded-xl border border-indigo-100 text-indigo-700 font-semibold">
                      💡 Pro Trick: {currentQuestion.shortcutTip}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Nav Controls */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                disabled={currentIdx === quiz.questions.length - 1}
                onClick={() => setCurrentIdx((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Question Palette & Scorecard */}
        <div className="space-y-6">
          {/* Post Submission Scorecard */}
          {isSubmitted && (
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-5 rounded-3xl shadow-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-cyan-200">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-3xl font-extrabold">{scorePercentage}%</span>
                <p className="text-xs text-indigo-100 font-medium">
                  {correctCount} / {quiz.questions.length} Correct Answers
                </p>
              </div>
              <div className="text-xs font-semibold py-1.5 px-3 bg-white/10 rounded-xl">
                {scorePercentage >= 75 ? '🎉 Assessment Passed with Distinction!' : 'Keep practicing with AI shortcuts!'}
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedAnswers({});
                  setMarkedForReview({});
                  setTimeLeft(quiz.durationMinutes * 60);
                  setCurrentIdx(0);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-white text-indigo-700 font-bold text-xs rounded-xl shadow-sm hover:bg-indigo-50 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
            </div>
          )}

          {/* Question Palette Grid */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Question Palette
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {quiz.questions.map((q, idx) => {
                const isCurrent = currentIdx === idx;
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];

                let bg = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isCurrent) {
                  bg = 'ring-2 ring-indigo-600 bg-indigo-50 text-indigo-700 font-extrabold border-indigo-300';
                } else if (isSubmitted) {
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  bg = isCorrect ? 'bg-emerald-500 text-white font-bold' : 'bg-rose-500 text-white font-bold';
                } else if (isMarked) {
                  bg = 'bg-amber-400 text-amber-950 font-bold';
                } else if (isAnswered) {
                  bg = 'bg-indigo-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-xl border text-xs font-bold flex items-center justify-center transition ${bg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Answered ({answeredCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> In Review
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Unvisited
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full ring-2 ring-indigo-600"></span> Current
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Calculator Modal */}
      {showCalculator && (
        <div className="fixed bottom-6 left-6 z-50 w-72 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Assessment Calculator</span>
            </span>
            <button onClick={() => setShowCalculator(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-right">
            <div className="text-xs text-slate-500 font-mono min-h-[16px]">{calcInput || '0'}</div>
            <div className="text-lg font-bold text-slate-900 font-mono">{calcResult || ' '}</div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                className={`py-2 rounded-lg transition ${
                  btn === '='
                    ? 'bg-indigo-600 text-white'
                    : btn === 'C'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

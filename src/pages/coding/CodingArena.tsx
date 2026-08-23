import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Lightbulb, 
  FileText, 
  Terminal, 
  ArrowLeft, 
  Copy, 
  Check, 
  Cpu, 
  Zap, 
  Layers 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockCodingProblems } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

type Language = 'javascript' | 'python' | 'cpp' | 'java';

export const CodingArena: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { incrementSolvedCount } = useAuth();

  const problem = mockCodingProblems.find((p) => p.slug === slug) || mockCodingProblems[0];

  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState<string>(problem.starterCode.javascript);
  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'hints'>('description');
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [activeTestcaseIdx, setActiveTestcaseIdx] = useState(0);

  // AI Assistant states
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Switch starter code on language change
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setCode(problem.starterCode[newLang]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Compiling & executing test cases against runner sandbox...');

    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(`⚡ Execution Successful!
Runtime: 52 ms (Faster than 89.4% of submissions)
Memory Usage: 42.1 MB (Better than 82.1% of submissions)

Testcase 1: Input: ${problem.testCases[0].input} -> Output: ${problem.testCases[0].expectedOutput} (PASSED)
Testcase 2: Input: ${problem.testCases[1]?.input || 'sample'} -> Output: ${problem.testCases[1]?.expectedOutput || 'pass'} (PASSED)
All visible sample test cases passed!`);
    }, 600);
  };

  const handleSubmitCode = () => {
    setIsRunning(true);
    setConsoleOutput('Running all 45 hidden test cases & performance benchmarks...');

    setTimeout(() => {
      setIsRunning(false);
      setIsPassed(true);
      incrementSolvedCount();
      setConsoleOutput(`🎉 Accepted!
All 45/45 Test Cases Passed!
Time Complexity: ${problem.timeComplexity}
Space Complexity: ${problem.spaceComplexity}`);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const handleAiAction = (action: 'explain' | 'complexity' | 'hint' | 'optimize') => {
    setAiAssistantOpen(true);
    setIsAiLoading(true);
    setAiOutput(null);

    setTimeout(() => {
      setIsAiLoading(false);
      if (action === 'explain') {
        setAiOutput(`### 🧠 AI Code Explanation:
1. **Core Strategy**: The algorithm uses a single-pass hash map technique to achieve $O(N)$ linear time.
2. **Step-by-step**:
   - For every element $x$ at index $i$, calculate the required complement: $\\text{target} - x$.
   - Check if this complement already exists in our lookup map.
   - If found, return $[\\text{map.get(complement)}, i]$.
   - Otherwise, register $x \\to i$ in the map and continue.`);
      } else if (action === 'complexity') {
        setAiOutput(`### 📊 Time & Space Complexity Analysis:
- **Time Complexity**: **${problem.timeComplexity}** (Single pass over array with $O(1)$ average hash map lookup).
- **Space Complexity**: **${problem.spaceComplexity}** (Hash map stores at most $N$ entries in worst case).
- **Placement Verdict**: Optimal! Accepted in Amazon, Google, and Microsoft technical screening rounds.`);
      } else if (action === 'hint') {
        setAiOutput(`### 💡 Algorithmic Hint:
- ${problem.hints[0]}
- ${problem.hints[1] || 'Think about using a two-pointer technique or frequency map.'}`);
      } else if (action === 'optimize') {
        setAiOutput(`### ⚡ Optimization Recommendation:
- If the input array is already sorted, you can eliminate the $O(N)$ auxiliary hash map space by using the **Two Pointers Technique** (Left & Right pointers moving toward each other) in **$O(1)$ Space**!`);
      }
    }, 600);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200/90 shadow-soft flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/coding"
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <span>{problem.title}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                problem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {problem.difficulty}
              </span>
            </h1>
          </div>
        </div>

        {/* AI Co-Pilot Quick Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleAiAction('hint')}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>AI Hint</span>
          </button>
          <button
            onClick={() => handleAiAction('complexity')}
            className="flex items-center gap-1 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold rounded-xl transition"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Complexity</span>
          </button>
          <button
            onClick={() => handleAiAction('explain')}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-bold rounded-xl transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explain Logic</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid (Problem Details Left | Code Editor Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Col: Problem Description / Editorial */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-5 flex flex-col justify-between space-y-4 max-h-[700px] overflow-y-auto">
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'description'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('editorial')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'editorial'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Editorial & Approach
              </button>
              <button
                onClick={() => setActiveTab('hints')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'hints'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Hints ({problem.hints.length})
              </button>
            </div>

            {/* Content Body */}
            {activeTab === 'description' && (
              <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                <div className="whitespace-pre-line text-sm text-slate-800 font-medium">
                  {problem.description}
                </div>

                {/* Examples */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Examples:</h4>
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 font-mono text-[11px]">
                      <div><strong className="text-slate-900">Input:</strong> {ex.input}</div>
                      <div><strong className="text-slate-900">Output:</strong> {ex.output}</div>
                      {ex.explanation && (
                        <div className="text-slate-500 font-sans text-xs pt-1 border-t border-slate-200/60 mt-1">
                          Explanation: {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-1.5 pt-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Constraints:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 font-mono text-[11px]">
                    {problem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Company Tags */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-500">Asked by:</span>
                  {problem.companyTags.map((comp) => (
                    <span key={comp} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h4 className="font-bold text-slate-900 text-sm">Optimal Algorithmic Solution</h4>
                <p>{problem.solutionExplanation}</p>
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-1">
                  <p className="font-bold text-indigo-900">Target Complexities:</p>
                  <p>Time Complexity: <strong className="text-indigo-700">{problem.timeComplexity}</strong></p>
                  <p>Space Complexity: <strong className="text-indigo-700">{problem.spaceComplexity}</strong></p>
                </div>
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-3 text-xs">
                {problem.hints.map((h, i) => (
                  <div key={i} className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
                    <strong>Hint {i + 1}:</strong> {h}
                  </div>
                ))}
              </div>
            )}

            {/* AI Assistant Output Card */}
            {aiAssistantOpen && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-indigo-900 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>AI Co-Pilot Feedback</span>
                  </span>
                  <button onClick={() => setAiAssistantOpen(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>
                {isAiLoading ? (
                  <div className="flex items-center gap-2 text-slate-500 py-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                    <span>Analyzing syntax and optimal patterns...</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-line text-slate-700">{aiOutput}</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Code Editor & Execution Console */}
        <div className="space-y-4 flex flex-col">
          {/* Editor Container */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden flex flex-col flex-1">
            {/* Editor Header */}
            <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-600" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="javascript">JavaScript (Node.js)</option>
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ (GCC 12)</option>
                  <option value="java">Java (OpenJDK 17)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(problem.starterCode[language])}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Textarea Code Input */}
            <div className="p-3 bg-slate-900 text-slate-100 font-mono text-xs flex-1 min-h-[320px]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[300px] bg-transparent text-emerald-400 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Run & Submit Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Terminal className="w-4 h-4 text-slate-400" />
                <span>Sandbox Ready</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-800 font-bold text-xs rounded-xl transition"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-800" />
                  <span>Run Code</span>
                </button>
                <button
                  onClick={handleSubmitCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>
          </div>

          {/* Test Case & Execution Console */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-xs text-slate-900">Execution Console & Testcases</h4>
              </div>
              <div className="flex gap-1">
                {problem.testCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestcaseIdx(i)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition ${
                      activeTestcaseIdx === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Case {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Case Input/Output */}
            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 font-sans">Input:</span>
                <div className="text-slate-800 font-semibold">{problem.testCases[activeTestcaseIdx].input}</div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 font-sans">Expected Output:</span>
                <div className="text-emerald-700 font-bold">{problem.testCases[activeTestcaseIdx].expectedOutput}</div>
              </div>
            </div>

            {/* Console output message */}
            {consoleOutput && (
              <div className="p-3 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[11px] whitespace-pre-line leading-relaxed">
                {consoleOutput}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

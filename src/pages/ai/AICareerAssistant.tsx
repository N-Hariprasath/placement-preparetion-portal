import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Zap, 
  BookOpen, 
  FileText, 
  Briefcase, 
  Flame 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AICareerAssistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello ${user ? user.name.split(' ')[0] : 'there'}! I am your Dedicated 24/7 AI Placement Mentor. 🎓\n\nHow can I help you today? You can ask for customized 30-day study roadmaps, cold email drafts for campus referrals, behavioral interview answers, or deep-dive technical concept explanations.`,
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    { title: 'Cold Email Template', query: 'Draft a high-converting LinkedIn referral message for an SDE-1 role at Amazon.' },
    { title: '30-Day TCS Roadmap', query: 'Create a day-by-day 30-day preparation schedule for TCS Digital and NQT.' },
    { title: 'STAR Method Example', query: 'Give me a winning STAR format answer for: Tell me about a conflict in your team.' },
    { title: 'System Design Basics', query: 'Explain Load Balancers vs Reverse Proxies with real-world architecture examples.' }
  ];

  const handleSend = (text?: string) => {
    const q = text || inputVal.trim();
    if (!q) return;

    const userM = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userM]);
    if (!text) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('referral') || lower.includes('cold email')) {
        reply = `### 📩 High-Converting LinkedIn / Cold Email Referral Template:

**Subject**: Application for SDE-1 (Job ID: #12345) | [Your Name] - [Your College]

Hi [Employee Name],

I hope you're having a great week!

I came across your profile while researching [Company]'s engineering work on [Specific Team/Product, e.g., AWS DynamoDB / Payments], and I am deeply inspired by the scale of your systems.

I am a Final-year Computer Science undergraduate at [College Name] (CGPA: 8.8) with experience building high-throughput distributed systems in Node.js, Redis, and Docker. I've also solved 150+ DSA problems on LeetCode.

I noticed an open SDE-1 position (Req ID: [Job ID]) that aligns closely with my backend skills. If you feel my background is a good fit, would you be open to referring me?

• **Resume Link**: [Google Drive Link]
• **GitHub**: [github.com/yourhandle]
• **LinkedIn**: [linkedin.com/in/yourhandle]

Thank you so much for your time and guidance!

Best regards,
**[Your Name]**`;
      } else if (lower.includes('tcs') || lower.includes('30-day')) {
        reply = `### 🚀 30-Day Placement Sprint Plan for TCS Digital & Prime:

- **Days 1-7 (Cognitive Foundation)**: Focus on Speed, Time & Work, Percentages, and Blood Relations. Solve 20 questions daily.
- **Days 8-15 (DSA Core)**: Arrays, Strings, HashMaps, and Two Pointers. Target 2 coding problems every evening.
- **Days 16-22 (Advanced Algorithms)**: Recursion, Dynamic Programming on grids, and Greedy techniques.
- **Days 23-28 (Core CS Revisions)**: DBMS normalization, ACID properties, Operating Systems scheduling, and SQL joins.
- **Days 29-30 (Full Mock Simulation)**: Take 2 full-length timed mock tests on our Aptitude Simulator and review mistakes.`;
      } else {
        reply = `### 💡 Placement Strategy & Key Insights on "${q}":

1. **Structured Delivery**: In both technical and behavioral rounds, always begin with a 10-second summary before diving into implementation details.
2. **Handle Edge Cases**: Interviewers test your engineering maturity through empty inputs, null pointers, and extreme scale limits.
3. **Practice Next Step**: You can practice this concept interactively in our **Coding Arena** or **Aptitude Simulator**!`;
      }

      const aiM = {
        id: 'a-' + Date.now(),
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiM]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>24/7 AI Career Mentor & Placement Coach</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Placement Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Get personalized interview strategies, custom daily study schedules, salary negotiation guidance, and direct answers for any technical query.
          </p>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft flex flex-col h-[650px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/60">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-none shadow-soft whitespace-pre-line'
                }`}
              >
                <p>{m.text}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] opacity-70">
                  <span>{m.time}</span>
                  {m.sender === 'ai' && (
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="hover:text-indigo-600 flex items-center gap-1 font-bold"
                    >
                      {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp.query)}
              className="shrink-0 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-semibold transition"
            >
              {qp.title}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white border-t border-slate-100 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask anything about placement prep, resumes, HR questions..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl shadow-sm transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

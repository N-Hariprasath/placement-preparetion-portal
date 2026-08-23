import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Lightbulb, 
  Zap, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIChatbotModal: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: `Hello ${user ? user.name.split(' ')[0] : 'there'}! 👋 I am your AI Placement Coach. Ask me anything about DSA, aptitude formulas, mock interview answers, or company-specific preparation patterns for Google, Amazon, TCS, Infosys, and more!`,
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    '🎯 Give me a 30-day placement roadmap',
    '💡 How to crack TCS NQT & Digital?',
    '💼 Tell me about yourself (STAR format)',
    '⚡ Explain CAP theorem with a simple example'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('30-day') || lower.includes('roadmap')) {
        reply = `### 📅 30-Day Campus Placement Sprint Roadmap:

**Week 1: Quantitative & Logical Aptitude Foundation**
- Master high-frequency topics: *Time & Work, Speed-Distance, Profit/Loss, Syllogisms, Blood Relations*.
- Practice 20 questions daily on our Aptitude Simulator.

**Week 2: Core Data Structures (Arrays, Strings, HashMaps)**
- Two Pointers & Sliding Window techniques.
- Practice 25 curated LeetCode Easy/Medium problems in our Coding Arena.

**Week 3: Advanced DSA & Core CS Revisions**
- Trees, Binary Search, Linked Lists, and dynamic programming basics.
- Revise DBMS (ACID, Normalization, SQL Joins), Operating Systems (Paging, Deadlocks), and Networks (OSI, TCP Handshake).

**Week 4: Mock Interviews & ATS Resume Polish**
- Run at least 3 AI Mock Technical & HR Interviews.
- Optimize your resume with quantified bullet points and 85%+ ATS score.`;
      } else if (lower.includes('tcs') || lower.includes('nqt')) {
        reply = `### 🚀 TCS NQT & Digital Crack Strategy:

1. **Cognitive Skills (Aptitude & Reasoning)**: Speed is king! Focus on shortcuts for Percentages, Work-Time, and Seating Arrangements.
2. **Advanced Coding**: 2 Coding problems. Usually 1 Easy (Array manipulation/String parsing) and 1 Medium (Dynamic Programming/Matrix/Greedy).
3. **Important Focus Areas**:
   - Time Complexity must be strictly O(N) or O(N log N).
   - Watch out for corner cases (empty strings, large integers $> 10^9$).
   - Revisit C/C++/Java/Python standard library syntax.`;
      } else if (lower.includes('tell me about yourself') || lower.includes('star') || lower.includes('introduce')) {
        reply = `### 🎤 Winning Formula for "Tell Me About Yourself":

Structure your answer in 4 parts (90 seconds total):

1. **The Hook (Present)**: "I am a Final-year CSE student at [College] specializing in full-stack web applications and distributed systems."
2. **The Core Strength (Past & Projects)**: "Over the past 2 years, I've built projects like [Key Project], where I implemented [Specific Tech/Architecture] to solve [Real Problem], achieving [Measurable Metric]."
3. **The Proof (DSA & Achievements)**: "I've solved 150+ algorithmic problems across LeetCode and attained [Certifications/Badges]."
4. **The Fit (Future)**: "I admire [Target Company]'s engineering culture and high-scale impact, and I'm excited to bring my problem-solving energy to your SDE team."`;
      } else if (lower.includes('cap theorem') || lower.includes('cap')) {
        reply = `### ⚙️ CAP Theorem Explained Simply:

In any distributed data store, you can only guarantee **2 out of 3** properties simultaneously:

1. **C - Consistency**: Every read receives the most recent write or an error. (e.g., Bank balance must be exact everywhere).
2. **A - Availability**: Every non-failing node returns a response, but it might not be the newest data.
3. **P - Partition Tolerance**: The cluster continues operating despite network drops or packet loss between servers.

> **Key Takeaway**: Since network partitions are unavoidable in real-world clouds, systems must choose between **CP (Consistency + Partition Tolerance)** like PostgreSQL/MongoDB or **AP (Availability + Partition Tolerance)** like Cassandra/DynamoDB.`;
      } else {
        reply = `Great question regarding **"${query}"**! 

Here are the key takeaways for campus interviews:
- **Core Principle**: Always clarify assumptions and state time/space complexity before coding or answering.
- **Action Step**: You can practice this directly in our **Aptitude Drill** or **Coding Arena** modules.
- **Pro Tip**: Use the STAR method (Situation, Task, Action, Result) for behavioral questions and explain tradeoffs for system design!`;
      }

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full ring-2 ring-indigo-600 animate-pulse" />
          </div>
          <span className="text-sm font-bold tracking-tight">AI Placement Coach</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col transition-all duration-300 ${
            isExpanded
              ? 'bottom-4 right-4 left-4 top-4 md:left-auto md:w-[600px] md:h-[85vh]'
              : 'bottom-6 right-6 w-[92vw] sm:w-[420px] h-[580px]'
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-700 text-white rounded-t-3xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  PlacementGenius AI Coach
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h3>
                <p className="text-[11px] text-indigo-100 font-medium">24/7 Interview & Placement Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                title={isExpanded ? 'Minimize' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[84%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-soft whitespace-pre-line'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="mt-1 flex items-center justify-between gap-2 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-indigo-600 transition flex items-center gap-0.5"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-bl-none shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 pt-2 pb-1 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-full border border-slate-200/80 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white rounded-b-3xl flex items-center gap-2 border-t border-slate-100"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about coding, aptitude, HR rounds..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

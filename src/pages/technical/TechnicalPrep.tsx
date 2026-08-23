import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Database, 
  Cpu, 
  Network, 
  Layers, 
  RotateCw, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Tag 
} from 'lucide-react';
import { mockTechnicalFlashcards } from '../../data/mockData';

export const TechnicalPrep: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const subjects = [
    { id: 'all', name: 'All Subjects', icon: BookOpenCheck },
    { id: 'DBMS', name: 'DBMS & SQL', icon: Database },
    { id: 'Operating Systems', name: 'Operating Systems', icon: Cpu },
    { id: 'Computer Networks', name: 'Computer Networks', icon: Network },
    { id: 'OOP', name: 'OOPs Concepts', icon: Layers },
  ];

  const filteredCards = mockTechnicalFlashcards.filter((card) => {
    return selectedSubject === 'all' || card.subject === selectedSubject;
  });

  const activeCard = filteredCards[currentFlashcardIdx] || mockTechnicalFlashcards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIdx((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const topQuestions = [
    {
      id: 'tq1',
      subject: 'DBMS',
      question: 'What is the difference between Clustered and Non-Clustered Index in SQL?',
      answer: 'A Clustered index physically sorts and stores the data rows in the table based on its key values (only 1 clustered index per table, typically the Primary Key). A Non-Clustered index has a separate structure from the data rows that contains pointers (Row IDs) back to the actual data, allowing multiple non-clustered indexes per table.'
    },
    {
      id: 'tq2',
      subject: 'Operating Systems',
      question: 'Explain Virtual Memory, Paging, and Thrashing.',
      answer: 'Virtual memory creates an illusion of a large, contiguous memory space using secondary storage. Paging is a memory management scheme that divides physical memory into fixed-size frames and virtual memory into pages. Thrashing occurs when the system spends more time swapping pages in and out of disk than executing instructions, causing CPU utilization to plummet.'
    },
    {
      id: 'tq3',
      subject: 'Computer Networks',
      question: 'What is the difference between TCP and UDP? When would you use UDP?',
      answer: 'TCP is connection-oriented, reliable, orders packets, and performs congestion control (used for HTTP, Email, File Transfer). UDP is connectionless, lightweight, and does not guarantee delivery or packet ordering. UDP is used for real-time applications where low latency matters more than occasional packet drop (Video streaming, VoIP, Gaming, DNS queries).'
    },
    {
      id: 'tq4',
      subject: 'OOPs',
      question: 'Explain the 4 pillars of Object-Oriented Programming with practical examples.',
      answer: '1. Encapsulation: Bundling data and methods that operate on it, hiding internal state (private variables + getters/setters).\n2. Abstraction: Hiding implementation details and exposing only essential interfaces (Abstract classes, Interfaces).\n3. Inheritance: Reusing code from a parent class (Dog extends Animal).\n4. Polymorphism: Performing a single action in different ways (Compile-time via overloading, Runtime via overriding).'
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            <BookOpenCheck className="w-4 h-4 text-indigo-600" />
            <span>Core Computer Science Revision & Flashcards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Technical Interview Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Quick revision flashcards and top 100 interview concepts for DBMS, Operating Systems, Computer Networks, and OOPs tested in product engineering interviews.
          </p>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {subjects.map((sub) => {
          const Icon = sub.icon;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubject(sub.id);
                setCurrentFlashcardIdx(0);
                setIsFlipped(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                selectedSubject === sub.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive 3D Flip Flashcard Section */}
      <div className="bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/60 rounded-3xl border border-indigo-100 p-6 sm:p-8 space-y-4 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            Card {currentFlashcardIdx + 1} of {filteredCards.length}
          </span>
          <span className="px-3 py-1 bg-white border border-indigo-200 rounded-full text-xs font-bold text-indigo-700">
            {activeCard.subject} • {activeCard.topic}
          </span>
        </div>

        {/* Flashcard Body */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="cursor-pointer min-h-[260px] bg-white rounded-3xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-all duration-300 transform hover:scale-[1.01]"
        >
          {!isFlipped ? (
            <div className="space-y-4 my-auto text-center">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700">
                QUESTION (Click card to flip)
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                "{activeCard.question}"
              </h2>
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> Tap anywhere to reveal technical answer
              </p>
            </div>
          ) : (
            <div className="space-y-4 my-auto">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700">
                TECHNICAL ANSWER & KEY POINTS
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {activeCard.answer}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeCard.keyPoints.map((pt) => (
                  <span key={pt} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md">
                    ✓ {pt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevCard}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition"
          >
            ← Previous Card
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Show Question' : 'Show Answer'}</span>
          </button>
          <button
            onClick={handleNextCard}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            Next Card →
          </button>
        </div>
      </div>

      {/* Top Campus Interview Questions Accordion */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
        <h3 className="font-bold text-base text-slate-900">
          Top Asked Campus Technical Interview Questions
        </h3>

        <div className="space-y-3">
          {topQuestions.map((q) => {
            const isOpen = openFaqId === q.id;
            return (
              <div
                key={q.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : q.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50 hover:bg-indigo-50/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-md">
                      {q.subject}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{q.question}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 whitespace-pre-line">
                    {q.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

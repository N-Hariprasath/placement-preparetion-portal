/* ==========================================================================
   PLACEMENT PREPARATION PORTAL - APPLICATION LOGIC
   ========================================================================== */

// Embedded Fallback Data in case JSON fetch is blocked by CORS (e.g. file:// protocol)
const FALLBACK_DATA = {
  companies: [
    {
      id: "tcs",
      name: "TCS (NQT / Digital)",
      logo: "🏢",
      badge: "Mass Recruiter",
      difficulty: "Easy - Medium",
      hiringRounds: ["Online Test (Aptitude, Verbal, Reasoning, Coding)", "Technical Interview", "Managerial & HR Round"],
      syllabus: "Numerical Ability (26 Qs), Verbal (24 Qs), Reasoning (30 Qs), Hands-on Coding (2 Qs)",
      cutoffTip: "Maintain high accuracy in Foundation section. TCS test has no negative marking in NQT.",
      recommendedQuestions: ["apt-1", "apt-2", "tech-1"]
    },
    {
      id: "infosys",
      name: "Infosys (DSE / SP)",
      logo: "💻",
      badge: "Service & Product",
      difficulty: "Medium",
      hiringRounds: ["Online Assessment (Pseudocode, Mathematical, Verbal, Puzzle)", "Technical & HR Round"],
      syllabus: "Pseudocode (5 Qs), Cryptarithmetic & Puzzles (4 Qs), Mathematical Ability (10 Qs), Verbal (20 Qs)",
      cutoffTip: "Focus heavily on Pseudocode debugging and Cryptarithmetic logic puzzles.",
      recommendedQuestions: ["apt-3", "tech-2", "tech-4"]
    },
    {
      id: "amazon",
      name: "Amazon (SDE 1)",
      logo: "📦",
      badge: "Product / Tier 1",
      difficulty: "Hard",
      hiringRounds: ["Online Assessment (2 Coding + Leadership Survey)", "Technical Round 1 (DSA)", "Technical Round 2 (System Design)", "Bar Raiser Round"],
      syllabus: "Arrays, Trees, Graphs, Dynamic Programming, Amazon 16 Leadership Principles",
      cutoffTip: "Every answer in technical and HR rounds MUST highlight Amazon's Leadership Principles using STAR method.",
      recommendedQuestions: ["tech-1", "tech-5", "hr-1"]
    },
    {
      id: "zoho",
      name: "Zoho Corporation",
      logo: "⚡",
      badge: "Product Enterprise",
      difficulty: "Medium - Hard",
      hiringRounds: ["Written Test (C/Java Output & Aptitude)", "Basic Programming Round", "Advanced System Design Round", "Tech & HR Interview"],
      syllabus: "Pointers in C, Recursion output, Matrix operations, OOPS & System Architecture",
      cutoffTip: "Avoid using built-in library functions in Round 2. Implement arrays and algorithms from scratch.",
      recommendedQuestions: ["tech-2", "tech-3", "tech-6"]
    },
    {
      id: "accenture",
      name: "Accenture (ASE / FSE)",
      logo: "🚀",
      badge: "Consulting",
      difficulty: "Easy - Medium",
      hiringRounds: ["Cognitive & Technical Assessment", "Coding Assessment (2 Qs)", "Communication Assessment", "One-on-One Interview"],
      syllabus: "MS Office knowledge, Pseudocode, Fundamentals of Networking & Security, Logical Reasoning",
      cutoffTip: "Communication Assessment is an elimination round! Practice clear English pronunciation.",
      recommendedQuestions: ["apt-1", "apt-2", "hr-2"]
    }
  ],
  questions: [
    {
      id: "apt-1",
      category: "Aptitude",
      topic: "Time & Work",
      difficulty: "Medium",
      title: "A and B together can complete a project in 12 days...",
      question: "A and B together can complete a project in 12 days. B and C together can complete it in 15 days, while C and A together can do it in 20 days. How many days will A alone take to finish the work?",
      options: ["20 days", "30 days", "40 days", "60 days"],
      correctIndex: 1,
      explanation: "Work rate equation: 2(A + B + C) = 1/12 + 1/15 + 1/20 = (5 + 4 + 3)/60 = 12/60 = 1/5.\nSo A + B + C = 1/10 per day.\nA's 1-day work = (A + B + C) - (B + C) = 1/10 - 1/15 = 1/30.\nTherefore, A alone takes 30 days."
    },
    {
      id: "apt-2",
      category: "Aptitude",
      topic: "Profit & Loss",
      difficulty: "Easy",
      title: "Calculating Selling Price with consecutive discounts",
      question: "An item priced at ₹2,000 is sold with two successive discounts of 20% and 10%. What is the final selling price?",
      options: ["₹1,400", "₹1,440", "₹1,500", "₹1,600"],
      correctIndex: 1,
      explanation: "Price after 1st discount (20%): 2000 - (0.20 × 2000) = ₹1,600.\nPrice after 2nd discount (10%): 1600 - (0.10 × 1600) = ₹1,440."
    },
    {
      id: "apt-3",
      category: "Reasoning",
      topic: "Logical Sequence",
      difficulty: "Hard",
      title: "Find the missing number in the sequence",
      question: "In a given sequence: 4, 18, 48, 100, 180, ? . What is the next number?",
      options: ["294", "252", "216", "343"],
      correctIndex: 0,
      explanation: "Pattern formula: n² × (n + 1). Term 6 (n=6): 6² × 5 = 180. Term 7 (n=7): 7² × 6 = 49 × 6 = 294."
    },
    {
      id: "tech-1",
      category: "DSA",
      topic: "Arrays & Two Pointers",
      difficulty: "Medium",
      title: "Two Sum - Target Pair in an Array",
      question: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. What is the optimal time complexity using a Hash Map?",
      options: ["O(N²)", "O(N log N)", "O(N)", "O(1)"],
      correctIndex: 2,
      explanation: "By storing elements in a HashMap as key-value pairs (element -> index), we check target - nums[i] in O(1) time. Traversing once yields O(N) complexity.",
      codeSnippet: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}"
    },
    {
      id: "tech-2",
      category: "CS Fundamentals",
      topic: "DBMS & SQL",
      difficulty: "Medium",
      title: "Difference between WHERE and HAVING clause",
      question: "Which statement correctly distinguishes between the WHERE and HAVING clauses in SQL?",
      options: [
        "WHERE filters rows before grouping; HAVING filters groups created by GROUP BY.",
        "HAVING can be used without GROUP BY, but WHERE cannot.",
        "WHERE is used only with aggregate functions like SUM().",
        "There is no functional difference."
      ],
      correctIndex: 0,
      explanation: "WHERE filters individual record rows before aggregation occurs. HAVING is specifically used to filter summarized aggregate results after GROUP BY is applied."
    },
    {
      "id": "tech-3",
      "category": "CS Fundamentals",
      "topic": "Operating Systems",
      "difficulty": "Medium",
      "title": "Deadlock Conditions (Coffman Conditions)",
      "question": "Which of the following is NOT one of the four necessary Coffman conditions for a system deadlock to occur?",
      "options": ["Mutual Exclusion", "Hold and Wait", "Preemption Allowed", "Circular Wait"],
      "correctIndex": 2,
      "explanation": "The Coffman conditions are: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Preemption Allowed prevents deadlocks."
    },
    {
      "id": "tech-4",
      "category": "DSA",
      "topic": "Trees & BST",
      "difficulty": "Hard",
      "title": "Lowest Common Ancestor in Binary Search Tree",
      "question": "In a BST, if nodes p and q both have values smaller than the root value, where does their Lowest Common Ancestor lie?",
      "options": ["In the right subtree", "In the left subtree", "It is the root node itself", "Cannot be determined"],
      "correctIndex": 1,
      explanation: "Since both values are smaller than root, LCA must reside in the left subtree."
    },
    {
      "id": "tech-5",
      "category": "DSA",
      "topic": "Dynamic Programming",
      "difficulty": "Hard",
      "title": "0/1 Knapsack Problem Complexity",
      "question": "What is the time complexity of the classic 0/1 Knapsack dynamic programming solution with N items and maximum capacity W?",
      "options": ["O(N × W)", "O(2^N)", "O(N²)", "O(W²)"],
      "correctIndex": 0,
      explanation: "The DP table has (N+1) × (W+1) states, making the time complexity O(N × W)."
    },
    {
      "id": "tech-6",
      "category": "CS Fundamentals",
      "topic": "Networking",
      "difficulty": "Easy",
      "title": "TCP vs UDP Protocol Differences",
      "question": "Which network protocol is connection-oriented, guarantees ordered packet delivery, and provides error checking via acknowledgment?",
      "options": ["UDP", "TCP", "ICMP", "IP"],
      "correctIndex": 1,
      explanation: "TCP is connection-oriented with 3-way handshake, packet sequencing, and acknowledgments."
    }
  ],
  dsaRoadmap: [
    { step: 1, topic: "Array & Strings Mastery", status: "Essential", description: "Two Pointers, Sliding Window, Prefix Sums", keyProblems: 15, estimatedHours: "12 hrs" },
    { step: 2, topic: "Recursion & Backtracking", status: "Core", description: "Subsets, Permutations, N-Queens", keyProblems: 10, estimatedHours: "10 hrs" },
    { step: 3, topic: "Linked Lists, Stacks & Queues", status: "Core", description: "Cycle Detection, Monotonic Stack", keyProblems: 12, estimatedHours: "8 hrs" },
    { step: 4, topic: "Trees & Binary Search Trees", status: "Advanced", description: "Traversals, LCA, BFS Level Order", keyProblems: 18, estimatedHours: "15 hrs" },
    { step: 5, topic: "Graphs & Algorithms", status: "High Priority", description: "BFS, DFS, Dijkstra, Topological Sort", keyProblems: 14, estimatedHours: "16 hrs" },
    { step: 6, topic: "Dynamic Programming", status: "Top Tech Favorite", description: "1D DP, 2D Grid DP, Knapsack, LCS", keyProblems: 20, estimatedHours: "20 hrs" }
  ],
  hrGuide: [
    {
      id: "hr-1",
      question: "Tell me about yourself.",
      tip: "Keep it under 90 seconds. Structure: Past (Background) -> Present (Current skills) -> Future (Why this role).",
      sampleAnswer: "I am a final-year CS student passionate about full-stack web engineering and algorithm design. I built interactive projects using JS and solved 250+ DSA problems on LeetCode. I'm excited about this role because your team builds high-scale user applications."
    },
    {
      id: "hr-2",
      question: "What is your biggest weakness and how do you work on it?",
      tip: "Pick a real technical skill you are actively improving. Never say 'I am a perfectionist'.",
      sampleAnswer: "Earlier, I spent too long trying to solve tricky bugs alone before reaching out. I now follow a 30-minute rule: if stuck after 30 minutes of deep research, I summarize my findings and consult a mentor."
    },
    {
      id: "hr-3",
      question: "Describe a difficult situation you faced during a project (STAR Method).",
      tip: "Situation -> Task -> Action -> Result.",
      sampleAnswer: "Situation: Two days before project submission, database queries timed out. Task: Optimize latency. Action: Added indexes to high-cardinality keys and implemented client caching. Result: Latency reduced by 75%."
    }
  ],
  resumeChecklist: [
    { id: "res-1", item: "ATS-friendly clean single-column format (No graphic rating bars for skills)" },
    { id: "res-2", item: "Quantifiable metrics in project bullet points (e.g. 'Improved speed by 35%')" },
    { id: "res-3", item: "Active hyperlinked GitHub repository links and live project URLs" },
    { id: "res-4", item: "Standard section headers: Education, Technical Skills, Projects, Experience" },
    { id: "res-5", item: "Action verbs starting each bullet point (Developed, Architected, Engineered)" },
    { id: "res-6", item: "Consistent formatting (Font size, margin alignment, date format MM/YYYY)" }
  ]
};

// Application State
const AppState = {
  data: FALLBACK_DATA,
  currentView: 'dashboard',
  searchQuery: '',
  activeCategoryFilter: 'All',
  userProgress: JSON.parse(localStorage.getItem('prep_progress') || '[]'),
  userBookmarks: JSON.parse(localStorage.getItem('prep_bookmarks') || '[]'),
  userNotes: JSON.parse(localStorage.getItem('prep_notes') || '{}'),
  resumeState: JSON.parse(localStorage.getItem('prep_resume') || '{}'),
  currentUser: JSON.parse(localStorage.getItem('prep_user') || 'null')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  setupAuthEventListeners();
  checkMandatoryAuthGate();
  renderHeaderAuthStatus();
  renderCurrentView();
  updateReadinessGauge();
});

// Load JSON Data safely
async function loadData() {
  try {
    const res = await fetch('data/questions.json');
    if (res.ok) {
      const json = await res.json();
      AppState.data = json;
      renderCurrentView();
      updateReadinessGauge();
    }
  } catch (err) {
    console.warn("Using fallback local data due to fetch restriction:", err);
  }
}

// Setup Mandatory Authentication Gate
function checkMandatoryAuthGate() {
  const authModal = document.getElementById('authModal');
  const closeAuthBtn = document.getElementById('closeAuthBtn');
  
  if (!AppState.currentUser) {
    // User is NOT logged in: Lock the portal with mandatory Login/Signup screen
    if (authModal) authModal.classList.add('active', 'mandatory-gate');
    if (closeAuthBtn) closeAuthBtn.style.display = 'none';
  } else {
    // User IS logged in: Unlock portal
    if (authModal) authModal.classList.remove('active', 'mandatory-gate');
    if (closeAuthBtn) closeAuthBtn.style.display = 'block';
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation menu links (Sidebar & Mobile Bottom Bar)
  document.querySelectorAll('[data-view]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      // Block navigation if user is not authenticated
      if (!AppState.currentUser) {
        checkMandatoryAuthGate();
        return;
      }

      const view = item.getAttribute('data-view');
      navigateToView(view);
      closeMobileSidebar();
    });
  });

  // Mobile menu trigger & overlay
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      if (!AppState.currentUser) {
        checkMandatoryAuthGate();
        return;
      }
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
  }

  // Global Search input
  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (!AppState.currentUser) {
        checkMandatoryAuthGate();
        return;
      }
      AppState.searchQuery = e.target.value.toLowerCase();
      if (AppState.currentView !== 'practice') {
        navigateToView('practice');
      } else {
        renderPracticeView();
      }
    });
  }
}

// Setup Login & Sign Up Modal Event Listeners
function setupAuthEventListeners() {
  const authModal = document.getElementById('authModal');
  const openAuthBtn = document.getElementById('openAuthBtn');
  const closeAuthBtn = document.getElementById('closeAuthBtn');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabSignupBtn = document.getElementById('tabSignupBtn');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (openAuthBtn) {
    openAuthBtn.addEventListener('click', () => {
      if (authModal) authModal.classList.add('active');
    });
  }

  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', () => {
      if (AppState.currentUser && authModal) {
        authModal.classList.remove('active');
      }
    });
  }

  // Close modal when clicking backdrop (Only allowed if logged in!)
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal && AppState.currentUser) {
        authModal.classList.remove('active');
      }
    });
  }

  // Tab Switching
  if (tabLoginBtn && tabSignupBtn) {
    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabSignupBtn.classList.remove('active');
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
    });

    tabSignupBtn.addEventListener('click', () => {
      tabSignupBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
    });
  }

  // Handle Login Submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const name = email.split('@')[0];
      const initials = name.substring(0, 2).toUpperCase();

      AppState.currentUser = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        initials: initials,
        dept: 'Computer Science'
      };

      localStorage.setItem('prep_user', JSON.stringify(AppState.currentUser));
      checkMandatoryAuthGate();
      renderHeaderAuthStatus();
      renderCurrentView();
    });
  }

  // Handle Signup Submit
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const dept = document.getElementById('signupDept').value;
      const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

      AppState.currentUser = {
        name: name,
        email: email,
        dept: dept,
        initials: initials
      };

      localStorage.setItem('prep_user', JSON.stringify(AppState.currentUser));
      checkMandatoryAuthGate();
      renderHeaderAuthStatus();
      renderCurrentView();
    });
  }
}

// Render User Profile Badge or Sign In button in Header
function renderHeaderAuthStatus() {
  const container = document.getElementById('authHeaderContainer');
  if (!container) return;

  if (AppState.currentUser) {
    container.innerHTML = `
      <div class="user-profile-badge" title="${AppState.currentUser.name} (${AppState.currentUser.dept})" onclick="handleLogout()">
        <div class="avatar-circle">${AppState.currentUser.initials}</div>
        <span class="user-name-text">${AppState.currentUser.name}</span>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button class="btn-auth-trigger" id="openAuthBtn">Sign In</button>
    `;
    const btn = document.getElementById('openAuthBtn');
    const authModal = document.getElementById('authModal');
    if (btn && authModal) {
      btn.addEventListener('click', () => authModal.classList.add('active'));
    }
  }
}

function handleLogout() {
  if (confirm(`Logged in as ${AppState.currentUser.name}. Do you want to sign out?`)) {
    AppState.currentUser = null;
    localStorage.removeItem('prep_user');
    checkMandatoryAuthGate();
    renderHeaderAuthStatus();
    renderCurrentView();
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (overlay) overlay.classList.remove('active');
}

// View Router
function navigateToView(viewName) {
  if (!AppState.currentUser) {
    checkMandatoryAuthGate();
    return;
  }

  AppState.currentView = viewName;
  
  // Update active states in navigation
  document.querySelectorAll('[data-view]').forEach(el => {
    if (el.getAttribute('data-view') === viewName) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Update page title
  const pageTitleEl = document.getElementById('pageTitle');
  const titles = {
    dashboard: 'Placement Prep Dashboard',
    companies: 'Company Recruitment Tracks',
    practice: 'Practice & Quizzes',
    roadmap: 'DSA & Tech Roadmap',
    hr: 'HR & Resume Guide',
    bookmarks: 'Saved Bookmarks'
  };
  if (pageTitleEl) pageTitleEl.textContent = titles[viewName] || 'Placement Prep Portal';

  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render dynamic main view
function renderCurrentView() {
  const content = document.getElementById('contentContainer');
  if (!content) return;

  switch (AppState.currentView) {
    case 'dashboard':
      content.innerHTML = renderDashboardHTML();
      break;
    case 'companies':
      content.innerHTML = renderCompaniesHTML();
      break;
    case 'practice':
      renderPracticeView();
      return;
    case 'roadmap':
      content.innerHTML = renderRoadmapHTML();
      break;
    case 'hr':
      content.innerHTML = renderHRHTML();
      break;
    case 'bookmarks':
      content.innerHTML = renderBookmarksHTML();
      break;
    default:
      content.innerHTML = renderDashboardHTML();
  }
}

// ==========================================================================
// RENDERERS & VIEW HTML GENERATORS
// ==========================================================================

function updateReadinessGauge() {
  const totalQs = AppState.data.questions.length || 1;
  const completedQs = AppState.userProgress.length;
  const percentage = Math.round((completedQs / totalQs) * 100);
  
  const scoreEl = document.getElementById('readinessScore');
  if (scoreEl) scoreEl.textContent = `${percentage}%`;
}

// Dashboard HTML
function renderDashboardHTML() {
  const totalQs = AppState.data.questions.length;
  const solvedCount = AppState.userProgress.length;
  const bookmarkedCount = AppState.userBookmarks.length;
  const companies = AppState.data.companies.slice(0, 3);
  const featuredQs = AppState.data.questions.slice(0, 2);
  const userName = AppState.currentUser ? AppState.currentUser.name : 'Student';

  return `
    <div class="animate-fade-in">
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main);">Welcome back, ${userName}! 👋</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Track your daily placement goals, target companies, and aptitude practice.</p>
      </div>

      <!-- Stats Overview -->
      <div class="stats-banner">
        <div class="stat-card">
          <div class="stat-icon-wrapper" style="background: var(--primary-light); color: var(--primary);">🎯</div>
          <div class="stat-info">
            <div class="stat-value" id="readinessScore">${Math.round((solvedCount / (totalQs || 1)) * 100)}%</div>
            <div class="stat-label">Placement Readiness Score</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper" style="background: var(--success-light); color: var(--success);">✅</div>
          <div class="stat-info">
            <div class="stat-value">${solvedCount} / ${totalQs}</div>
            <div class="stat-label">Problems Solved</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper" style="background: var(--secondary-light); color: var(--secondary);">⭐</div>
          <div class="stat-info">
            <div class="stat-value">${bookmarkedCount}</div>
            <div class="stat-label">Saved Bookmarks</div>
          </div>
        </div>
      </div>

      <!-- Top Target Companies -->
      <div class="section-header">
        <div class="section-title">🏢 Target IT Companies</div>
        <button class="btn-link" onclick="navigateToView('companies')">View All →</button>
      </div>

      <div class="company-grid">
        ${companies.map(c => `
          <div class="company-card" onclick="filterByCompany('${c.id}')">
            <div class="company-header">
              <div class="company-logo">${c.logo}</div>
              <span class="badge badge-primary">${c.badge}</span>
            </div>
            <div class="company-name">${c.name}</div>
            <div class="company-diff">Difficulty: ${c.difficulty}</div>
            <div class="company-rounds"><strong>Rounds:</strong> ${c.hiringRounds.slice(0, 2).join(' • ')}</div>
            <button class="btn-card-action">Practice Pattern Qs</button>
          </div>
        `).join('')}
      </div>

      <!-- Recommended Practice Questions -->
      <div class="section-header">
        <div class="section-title">⚡ Quick Daily Practice</div>
        <button class="btn-link" onclick="navigateToView('practice')">Open Practice Hub →</button>
      </div>

      <div class="questions-list">
        ${featuredQs.map(q => renderSingleQuestionCard(q)).join('')}
      </div>
    </div>
  `;
}

// Company List HTML
function renderCompaniesHTML() {
  const companies = AppState.data.companies;

  return `
    <div class="animate-fade-in">
      <div class="section-header" style="margin-top: 0;">
        <div class="section-title">🏢 Company Pattern Analysis & Tracks</div>
      </div>
      
      <div class="company-grid">
        ${companies.map(c => `
          <div class="company-card">
            <div class="company-header">
              <div class="company-logo">${c.logo}</div>
              <span class="badge badge-primary">${c.badge}</span>
            </div>
            <div class="company-name">${c.name}</div>
            <div class="company-diff">Difficulty: ${c.difficulty}</div>
            <div class="company-rounds">
              <strong>Selection Rounds:</strong>
              <ul style="margin-left: 16px; margin-top: 4px; font-size: 0.78rem;">
                ${c.hiringRounds.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
              💡 <strong>Cutoff Tip:</strong> ${c.cutoffTip}
            </div>
            <button class="btn-card-action" onclick="filterByCompany('${c.id}')">Start ${c.name} Track</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Filter Qs by specific company
function filterByCompany(companyId) {
  const comp = AppState.data.companies.find(c => c.id === companyId);
  if (!comp) return;
  
  navigateToView('practice');
  const container = document.getElementById('contentContainer');
  if (container) {
    const banner = document.createElement('div');
    banner.className = 'star-tip';
    banner.style.marginBottom = '16px';
    banner.innerHTML = `Showing recommended questions for <strong>${comp.name}</strong>. Cutoff Tip: ${comp.cutoffTip}`;
    container.insertBefore(banner, container.firstChild);
  }
}

// Render Practice View
function renderPracticeView() {
  const content = document.getElementById('contentContainer');
  if (!content) return;

  const categories = ['All', 'Aptitude', 'Reasoning', 'DSA', 'CS Fundamentals'];
  let questions = AppState.data.questions;

  // Filter by category
  if (AppState.activeCategoryFilter !== 'All') {
    questions = questions.filter(q => q.category === AppState.activeCategoryFilter);
  }

  // Filter by search query
  if (AppState.searchQuery) {
    questions = questions.filter(q => 
      q.title.toLowerCase().includes(AppState.searchQuery) ||
      q.topic.toLowerCase().includes(AppState.searchQuery) ||
      q.question.toLowerCase().includes(AppState.searchQuery)
    );
  }

  content.innerHTML = `
    <div class="animate-fade-in">
      <!-- Category Filter Chips -->
      <div class="filters-bar">
        ${categories.map(cat => `
          <button class="filter-chip ${AppState.activeCategoryFilter === cat ? 'active' : ''}" 
                  onclick="setCategoryFilter('${cat}')">
            ${cat}
          </button>
        `).join('')}
      </div>

      <div class="questions-list">
        ${questions.length > 0 ? questions.map(q => renderSingleQuestionCard(q)).join('') : `
          <div style="text-align: center; padding: 40px 16px; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
            No matching practice questions found. Try resetting filters.
          </div>
        `}
      </div>
    </div>
  `;
}

function setCategoryFilter(category) {
  AppState.activeCategoryFilter = category;
  renderPracticeView();
}

// Single Question Card Component
function renderSingleQuestionCard(q) {
  const isSolved = AppState.userProgress.includes(q.id);
  const isBookmarked = AppState.userBookmarks.includes(q.id);
  const diffBadgeClass = q.difficulty === 'Easy' ? 'badge-success' : (q.difficulty === 'Medium' ? 'badge-primary' : 'badge-warning');

  return `
    <div class="question-card" id="qcard-${q.id}">
      <div class="question-meta">
        <div class="meta-tags">
          <span class="badge ${diffBadgeClass}">${q.difficulty}</span>
          <span class="topic-tag">${q.category} • ${q.topic}</span>
          ${isSolved ? '<span class="badge badge-success">Completed</span>' : ''}
        </div>
        <button class="btn-link" onclick="toggleBookmark('${q.id}')" title="Save Bookmark">
          ${isBookmarked ? '⭐ Saved' : '☆ Bookmark'}
        </button>
      </div>

      <div class="question-title-text">${q.title}</div>
      <p style="font-size: 0.88rem; margin-bottom: 12px; color: var(--text-main); line-height: 1.5;">${q.question}</p>

      ${q.codeSnippet ? `<pre class="code-block"><code>${escapeHTML(q.codeSnippet)}</code></pre>` : ''}

      <div class="options-grid">
        ${q.options.map((opt, idx) => `
          <button class="option-btn" onclick="selectOption('${q.id}', ${idx}, ${q.correctIndex})">
            <span>${String.fromCharCode(65 + idx)}. ${opt}</span>
          </button>
        `).join('')}
      </div>

      <div class="explanation-box" id="exp-${q.id}">
        <strong>Solution Explanation:</strong><br/>
        <span style="white-space: pre-line;">${q.explanation}</span>
      </div>
    </div>
  `;
}

// Quiz Option Selection
function selectOption(qId, selectedIdx, correctIdx) {
  const card = document.getElementById(`qcard-${qId}`);
  if (!card) return;

  const buttons = card.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) {
      btn.classList.add('correct');
    } else if (idx === selectedIdx && selectedIdx !== correctIdx) {
      btn.classList.add('wrong');
    }
  });

  // Display explanation box
  const exp = document.getElementById(`exp-${qId}`);
  if (exp) exp.classList.add('visible');

  // Record progress
  if (!AppState.userProgress.includes(qId)) {
    AppState.userProgress.push(qId);
    localStorage.setItem('prep_progress', JSON.stringify(AppState.userProgress));
    updateReadinessGauge();
  }
}

// Toggle Bookmarks
function toggleBookmark(qId) {
  const idx = AppState.userBookmarks.indexOf(qId);
  if (idx > -1) {
    AppState.userBookmarks.splice(idx, 1);
  } else {
    AppState.userBookmarks.push(qId);
  }
  localStorage.setItem('prep_bookmarks', JSON.stringify(AppState.userBookmarks));
  renderCurrentView();
}

// DSA Roadmap HTML
function renderRoadmapHTML() {
  const steps = AppState.data.dsaRoadmap;

  return `
    <div class="animate-fade-in">
      <div class="section-header" style="margin-top: 0;">
        <div class="section-title">🗺️ DSA & Tech Interview Roadmap</div>
      </div>

      <div class="roadmap-timeline">
        ${steps.map(s => `
          <div class="roadmap-card">
            <div class="step-number">${s.step}</div>
            <div class="roadmap-info">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                <h3>${s.topic}</h3>
                <span class="badge badge-primary">${s.status}</span>
              </div>
              <p>${s.description}</p>
              <div style="margin-top: 6px; font-size: 0.78rem; color: var(--text-muted);">
                ⏱️ Est. Time: ${s.estimatedHours} • 📝 ${s.keyProblems} Key Problems
              </div>
            </div>
            <button class="btn-card-action" style="width: auto; padding: 8px 14px;" onclick="setCategoryFilter('DSA'); navigateToView('practice');">
              Practice Qs
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// HR & Resume Guide HTML
function renderHRHTML() {
  const hrQuestions = AppState.data.hrGuide;
  const resumeItems = AppState.data.resumeChecklist;

  return `
    <div class="animate-fade-in">
      <div class="section-header" style="margin-top: 0;">
        <div class="section-title">💬 HR & Behavioral Interview Preparation</div>
      </div>

      <div class="hr-accordion" style="margin-bottom: 28px;">
        ${hrQuestions.map((hr, idx) => `
          <div class="hr-item" id="hr-item-${idx}">
            <div class="hr-header" onclick="toggleHRAccordion(${idx})">
              <span>❓ ${hr.question}</span>
              <span>▼</span>
            </div>
            <div class="hr-body">
              <div class="star-tip">💡 <strong>Strategy Tip:</strong> ${hr.tip}</div>
              <strong>Sample Answer:</strong>
              <p style="margin-top: 6px; font-size: 0.88rem; line-height: 1.5; color: var(--text-main);">${hr.sampleAnswer}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section-header">
        <div class="section-title">📄 ATS Resume Preparation Checklist</div>
      </div>

      <div class="question-card">
        <div class="questions-list">
          ${resumeItems.map(item => {
            const checked = AppState.resumeState[item.id] ? 'checked' : '';
            return `
              <label style="display: flex; align-items: flex-start; gap: 12px; cursor: pointer; font-size: 0.88rem;">
                <input type="checkbox" ${checked} onchange="toggleResumeCheck('${item.id}')" style="width: 18px; height: 18px; margin-top: 2px; accent-color: var(--primary); flex-shrink: 0;">
                <span>${item.item}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function toggleHRAccordion(idx) {
  const item = document.getElementById(`hr-item-${idx}`);
  if (item) item.classList.toggle('open');
}

function toggleResumeCheck(id) {
  AppState.resumeState[id] = !AppState.resumeState[id];
  localStorage.setItem('prep_resume', JSON.stringify(AppState.resumeState));
}

// Bookmarks HTML
function renderBookmarksHTML() {
  const bookmarkedQs = AppState.data.questions.filter(q => AppState.userBookmarks.includes(q.id));

  return `
    <div class="animate-fade-in">
      <div class="section-header" style="margin-top: 0;">
        <div class="section-title">⭐ Saved Bookmarked Questions</div>
      </div>

      <div class="questions-list">
        ${bookmarkedQs.length > 0 ? bookmarkedQs.map(q => renderSingleQuestionCard(q)).join('') : `
          <div style="text-align: center; padding: 36px 16px; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
            No bookmarked questions saved yet. Click the ⭐ Bookmark button on any question to review later!
          </div>
        `}
      </div>
    </div>
  `;
}

// Helper: Escape HTML
function escapeHTML(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

/* ================================================
   ApexHire AI — App Router & Shell
   ================================================ */

const AppRouter = {
  _route: 'dashboard',

  init() {
    this._syncRole();
    this.go('dashboard');
  },

  go(route) {
    this._route = route;
    const el = document.getElementById('pageRoot');
    const role = AppStore.getRole();

    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.route === route);
    });

    if (!el) return;

    switch (route) {
      case 'dashboard':
        role === 'recruiter' ? AdminModule.renderRecruiter(el)
          : role === 'admin' ? AdminModule.renderAdmin(el)
          : DashboardModule.render(el);
        break;
      case 'coding':     CodingModule.render(el); break;
      case 'interview':  InterviewModule.render(el); break;
      case 'assessment': AssessmentModule.render(el); break;
      case 'resume':     ResumeModule.render(el); break;
      case 'tracks':     TracksModule.render(el); break;
      case 'flashcards': FlashcardsModule.render(el); break;
      case 'profile':    AuthModule.renderProfile(el); break;
      default:           DashboardModule.render(el);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  switchRole(role) {
    AppStore.setRole(role);
    this._syncRole();
    AppToast.show(`Switched to ${role.charAt(0).toUpperCase()+role.slice(1)} view`, 'info');
    this.go('dashboard');
  },

  _syncRole() {
    const role = AppStore.getRole();
    const profile = AppStore.getProfile();

    document.querySelectorAll('.role-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.role === role);
    });

    const av = document.getElementById('sideAvatar');
    if (av) av.textContent = profile.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);

    const nm = document.getElementById('sideName');
    if (nm) nm.textContent = profile.name;

    const rl = document.getElementById('sideRole');
    if (rl) rl.textContent = role === 'recruiter' ? 'Recruiter' : role === 'admin' ? 'Placement Cell' : 'Student Candidate';

    const na = document.getElementById('navAvatar');
    if (na) na.textContent = profile.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  }
};

/* ── Toast ── */
const AppToast = {
  show(msg, type = 'info') {
    let c = document.getElementById('toastRoot');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toastRoot';
      c.className = 'toast-container';
      document.body.appendChild(c);
    }

    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icons = { success:'fa-circle-check', warning:'fa-triangle-exclamation', danger:'fa-circle-xmark', info:'fa-circle-info' };
    t.innerHTML = `<i class="fa-solid ${icons[type]||icons.info}"></i> <span>${msg}</span>`;
    c.appendChild(t);

    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(110%)';
      setTimeout(() => t.remove(), 320);
    }, 3200);
  }
};

/* ── Build App Shell ── */
function BootApp() {
  document.body.innerHTML = `
    <div class="bg-canvas">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <div class="app-layout">

      <!-- ── Sidebar ── -->
      <aside class="sidebar" id="sidebar">
        <a class="sidebar-logo" onclick="AppRouter.go('dashboard')">
          <div class="sidebar-logo-mark"><i class="fa-solid fa-brain"></i></div>
          <span class="sidebar-logo-name">ApexHire AI</span>
        </a>

        <nav class="sidebar-nav">
          <div class="nav-section">Core</div>
          <a class="nav-link active" data-route="dashboard" onclick="AppRouter.go('dashboard')">
            <i class="fa-solid fa-chart-pie"></i> Dashboard
          </a>
          <a class="nav-link" data-route="coding" onclick="AppRouter.go('coding')">
            <i class="fa-solid fa-code"></i> Coding Sandbox
          </a>
          <a class="nav-link" data-route="interview" onclick="AppRouter.go('interview')">
            <i class="fa-solid fa-headset"></i> AI Interview
          </a>
          <a class="nav-link" data-route="assessment" onclick="AppRouter.go('assessment')">
            <i class="fa-solid fa-list-check"></i> Mock Tests
          </a>
          <a class="nav-link" data-route="resume" onclick="AppRouter.go('resume')">
            <i class="fa-solid fa-file-circle-check"></i> Resume ATS
          </a>

          <div class="nav-section">Resources</div>
          <a class="nav-link" data-route="tracks" onclick="AppRouter.go('tracks')">
            <i class="fa-solid fa-building-columns"></i> Company Tracks
          </a>
          <a class="nav-link" data-route="flashcards" onclick="AppRouter.go('flashcards')">
            <i class="fa-solid fa-clone"></i> Flashcards
          </a>
          <a class="nav-link" data-route="profile" onclick="AppRouter.go('profile')">
            <i class="fa-solid fa-id-card"></i> My Profile
          </a>

          <div class="nav-section">Account</div>
          <a class="nav-link danger" onclick="AuthPage.renderLogin()">
            <i class="fa-solid fa-right-from-bracket"></i> Sign Out
          </a>
        </nav>

        <div class="sidebar-user">
          <div class="user-card">
            <div class="user-avatar" id="sideAvatar">AM</div>
            <div>
              <div class="user-name" id="sideName">Alex Morgan</div>
              <div class="user-role" id="sideRole">Student Candidate</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- ── Main ── -->
      <div class="main-wrapper">

        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <button class="icon-btn" id="hamburger" style="display:none;"
              onclick="document.getElementById('sidebar').classList.toggle('open')">
              <i class="fa-solid fa-bars"></i>
            </button>
            <span class="topbar-title">Campus Placement Portal</span>
          </div>

          <div class="topbar-right">
            <!-- Role switcher -->
            <div class="role-switcher">
              <button class="role-tab active" data-role="student" onclick="AppRouter.switchRole('student')">
                <i class="fa-solid fa-user-graduate"></i> Student
              </button>
              <button class="role-tab" data-role="recruiter" onclick="AppRouter.switchRole('recruiter')">
                <i class="fa-solid fa-briefcase"></i> Recruiter
              </button>
              <button class="role-tab" data-role="admin" onclick="AppRouter.switchRole('admin')">
                <i class="fa-solid fa-shield-halved"></i> Admin
              </button>
            </div>

            <button class="icon-btn" title="Notifications"
              onclick="AppToast.show('Google India OA — Aug 28. Register before Aug 25!','info')">
              <i class="fa-solid fa-bell"></i>
            </button>

            <div onclick="AppRouter.go('profile')" id="navAvatar"
              style="width:34px;height:34px;border-radius:50%;background:var(--grad-brand);
                     display:flex;align-items:center;justify-content:center;
                     color:#fff;font-weight:800;font-size:0.8rem;cursor:pointer;
                     box-shadow:0 2px 8px rgba(79,70,229,0.28);">AM</div>
          </div>
        </header>

        <!-- Page content -->
        <main class="page-wrap" id="pageRoot"></main>
      </div>
    </div>

    <div id="toastRoot" class="toast-container"></div>
  `;

  AppRouter.init();
}

/* ── Entry Point ── */
document.addEventListener('DOMContentLoaded', () => {
  AuthPage.renderLogin();
});

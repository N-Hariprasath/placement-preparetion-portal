/* ================================================
   ApexHire AI — Auth Pages (Login / Sign-up)
   ================================================ */
const AuthPage = {
  _role: 'student',

  /* ─────────────────────────────────────────
     LOGIN
  ───────────────────────────────────────── */
  renderLogin() {
    document.body.innerHTML = `
      <div class="bg-canvas"><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div></div>

      <div class="auth-page">

        <!-- Left brand panel -->
        <div class="auth-left">
          <div class="auth-logo">
            <div class="auth-logo-mark"><i class="fa-solid fa-brain"></i></div>
            <span class="auth-logo-name">ApexHire AI</span>
          </div>

          <h1 class="auth-headline">
            Land your dream job<br>
            <em>with AI-powered</em><br>
            placement prep.
          </h1>

          <p class="auth-sub">
            The smartest platform for campus placement — AI mock interviews, live coding sandbox, ATS resume scanner, and personalised roadmaps.
          </p>

          <div class="auth-features">
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-headset"></i></div>
              AI Mock Interview with Voice & Instant Scorecard
            </div>
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-code"></i></div>
              Coding Sandbox — Python, Java, C++, JavaScript
            </div>
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-file-circle-check"></i></div>
              ATS Resume Optimizer — Boost Callback Rate
            </div>
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-chart-radar"></i></div>
              Skill Radar & Placement Readiness Index
            </div>
          </div>

          <div class="auth-stats">
            <div>
              <div class="auth-stat-val">40,000+</div>
              <div class="auth-stat-label">Students</div>
            </div>
            <div>
              <div class="auth-stat-val">92%</div>
              <div class="auth-stat-label">Placement Rate</div>
            </div>
            <div>
              <div class="auth-stat-val">250+</div>
              <div class="auth-stat-label">Companies</div>
            </div>
          </div>
        </div>

        <!-- Right form panel -->
        <div class="auth-right">
          <div class="auth-form-box">
            <p class="auth-form-title">Welcome back</p>
            <p class="auth-form-sub">Sign in to continue your preparation journey.</p>

            <div class="auth-socials">
              <button class="btn-social" onclick="AuthPage._social('Google')">
                <i class="fa-brands fa-google" style="color:#ea4335"></i> Google
              </button>
              <button class="btn-social" onclick="AuthPage._social('LinkedIn')">
                <i class="fa-brands fa-linkedin" style="color:#0a66c2"></i> LinkedIn
              </button>
            </div>

            <div class="auth-divider"><span>or continue with email</span></div>

            <form onsubmit="AuthPage._login(event)" novalidate>
              <div class="field">
                <label class="field-label">Email address</label>
                <div class="field-wrap">
                  <i class="fa-solid fa-envelope ico"></i>
                  <input id="l-email" type="email" class="field-input" placeholder="alex@university.edu" required>
                </div>
              </div>

              <div class="field">
                <label class="field-label">Password</label>
                <div class="field-wrap">
                  <i class="fa-solid fa-lock ico"></i>
                  <input id="l-pwd" type="password" class="field-input" placeholder="Enter your password" required>
                  <i class="fa-solid fa-eye ico ico-right" onclick="AuthPage._eye('l-pwd',this)"></i>
                </div>
              </div>

              <div class="auth-meta">
                <label class="auth-check">
                  <input type="checkbox"> Remember me
                </label>
                <button type="button" class="auth-forgot" onclick="AppToast.show('Reset link sent to your email.','info')">Forgot password?</button>
              </div>

              <button type="submit" class="btn-auth" id="l-btn">
                <span id="l-btn-txt"><i class="fa-solid fa-arrow-right-to-bracket"></i> Sign in</span>
                <div class="btn-spinner" id="l-spin"></div>
              </button>
            </form>

            <p class="auth-switch">
              No account yet? <a onclick="AuthPage.renderSignup()">Create one free →</a>
            </p>
          </div>
        </div>

      </div>
      <div id="toastRoot" class="toast-container"></div>
    `;
  },

  /* ─────────────────────────────────────────
     SIGN-UP
  ───────────────────────────────────────── */
  renderSignup() {
    document.body.innerHTML = `
      <div class="bg-canvas"><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div></div>

      <div class="auth-page">

        <!-- Left brand panel -->
        <div class="auth-left">
          <div class="auth-logo">
            <div class="auth-logo-mark"><i class="fa-solid fa-brain"></i></div>
            <span class="auth-logo-name">ApexHire AI</span>
          </div>

          <h1 class="auth-headline">
            Start your placement<br>
            <em>success story</em><br>
            today — for free.
          </h1>

          <p class="auth-sub">
            Join 40,000+ students who prep smarter. Get a personalised dashboard, AI mock interviews, and real-time skill tracking.
          </p>

          <div class="auth-features">
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-star"></i></div>
              Readiness Dashboard & Daily Streak Tracker
            </div>
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-building-columns"></i></div>
              Company Roadmaps — Google, Amazon, TCS & More
            </div>
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-clone"></i></div>
              CS Flashcards — OS, DBMS, Networks, OOPs
            </div>
            <div class="auth-feat">
              <div class="auth-feat-icon"><i class="fa-solid fa-trophy"></i></div>
              Compete on Placement Leaderboard
            </div>
          </div>

          <div class="auth-stats">
            <div>
              <div class="auth-stat-val">₹45 LPA</div>
              <div class="auth-stat-label">Highest Package</div>
            </div>
            <div>
              <div class="auth-stat-val">500+</div>
              <div class="auth-stat-label">Colleges</div>
            </div>
            <div>
              <div class="auth-stat-val">Free</div>
              <div class="auth-stat-label">Forever Plan</div>
            </div>
          </div>
        </div>

        <!-- Right form panel -->
        <div class="auth-right">
          <div class="auth-form-box">
            <p class="auth-form-title">Create account</p>
            <p class="auth-form-sub">Free forever — no credit card required.</p>

            <div class="auth-socials">
              <button class="btn-social" onclick="AuthPage._social('Google')">
                <i class="fa-brands fa-google" style="color:#ea4335"></i> Google
              </button>
              <button class="btn-social" onclick="AuthPage._social('LinkedIn')">
                <i class="fa-brands fa-linkedin" style="color:#0a66c2"></i> LinkedIn
              </button>
            </div>

            <div class="auth-divider"><span>or register with email</span></div>

            <form onsubmit="AuthPage._signup(event)" novalidate>

              <!-- Role -->
              <div class="field">
                <label class="field-label">I am a</label>
                <div class="role-grid">
                  <div class="role-card selected" id="rc-student" onclick="AuthPage._role='student'; AuthPage._roleUI('student')">
                    <i class="fa-solid fa-user-graduate"></i>
                    <span>Student</span>
                  </div>
                  <div class="role-card" id="rc-recruiter" onclick="AuthPage._role='recruiter'; AuthPage._roleUI('recruiter')">
                    <i class="fa-solid fa-briefcase"></i>
                    <span>Recruiter</span>
                  </div>
                  <div class="role-card" id="rc-admin" onclick="AuthPage._role='admin'; AuthPage._roleUI('admin')">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>Admin</span>
                  </div>
                </div>
              </div>

              <!-- Name -->
              <div class="field two-col">
                <div>
                  <label class="field-label">First name</label>
                  <div class="field-wrap">
                    <i class="fa-solid fa-user ico"></i>
                    <input id="s-first" type="text" class="field-input" placeholder="Alex" required>
                  </div>
                </div>
                <div>
                  <label class="field-label">Last name</label>
                  <div class="field-wrap">
                    <i class="fa-solid fa-user ico"></i>
                    <input id="s-last" type="text" class="field-input" placeholder="Morgan" required>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="field">
                <label class="field-label">University email</label>
                <div class="field-wrap">
                  <i class="fa-solid fa-envelope ico"></i>
                  <input id="s-email" type="email" class="field-input" placeholder="alex@university.edu" required>
                </div>
              </div>

              <!-- College -->
              <div class="field">
                <label class="field-label">College / Institution</label>
                <div class="field-wrap">
                  <i class="fa-solid fa-building-columns ico"></i>
                  <input id="s-college" type="text" class="field-input" placeholder="Indian Institute of Technology" required>
                </div>
              </div>

              <!-- Password -->
              <div class="field">
                <label class="field-label">Password</label>
                <div class="field-wrap">
                  <i class="fa-solid fa-lock ico"></i>
                  <input id="s-pwd" type="password" class="field-input" placeholder="Min. 8 characters" required oninput="AuthPage._strength(this.value)">
                  <i class="fa-solid fa-eye ico ico-right" onclick="AuthPage._eye('s-pwd',this)"></i>
                </div>
                <div class="pwd-strength">
                  <div class="pwd-bar-track"><div class="pwd-bar-fill" id="s-bar"></div></div>
                  <div class="pwd-hint" id="s-hint">Enter a password</div>
                </div>
              </div>

              <button type="submit" class="btn-auth" id="s-btn">
                <span id="s-btn-txt"><i class="fa-solid fa-user-plus"></i> Create free account</span>
                <div class="btn-spinner" id="s-spin"></div>
              </button>
            </form>

            <p class="auth-terms">
              By signing up you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>.
            </p>

            <p class="auth-switch">
              Already have an account? <a onclick="AuthPage.renderLogin()">Sign in →</a>
            </p>
          </div>
        </div>

      </div>
      <div id="toastRoot" class="toast-container"></div>
    `;
  },

  /* ─────────────────────────────────────────
     HANDLERS
  ───────────────────────────────────────── */
  _login(e) {
    e.preventDefault();
    const email = document.getElementById('l-email').value.trim();
    const pwd   = document.getElementById('l-pwd').value;
    if (!email || !pwd) { AppToast.show('Please fill in all fields.','warning'); return; }

    this._loading('l', true);
    setTimeout(() => {
      this._loading('l', false);
      const p = AppStore.getProfile(); p.email = email; AppStore.saveProfile(p);
      AppStore.setRole('student');
      AppToast.show('Signed in! Welcome back 👋','success');
      this._launch();
    }, 1100);
  },

  _signup(e) {
    e.preventDefault();
    const fn  = document.getElementById('s-first').value.trim();
    const ln  = document.getElementById('s-last').value.trim();
    const em  = document.getElementById('s-email').value.trim();
    const col = document.getElementById('s-college').value.trim();
    const pwd = document.getElementById('s-pwd').value;

    if (!fn||!ln||!em||!col||!pwd) { AppToast.show('Please complete all fields.','warning'); return; }
    if (pwd.length < 8) { AppToast.show('Password must be at least 8 characters.','danger'); return; }

    this._loading('s', true);
    setTimeout(() => {
      this._loading('s', false);
      AppStore.saveProfile({ name:`${fn} ${ln}`, email:em, college:col, branch:'Computer Science', cgpa:'–', gradYear:'2026', skills:[], targetRoles:[], certifications:[], projects:[], streakCount:0 });
      AppStore.setRole(this._role);
      AppToast.show(`Account created! Welcome, ${fn} 🎉`,'success');
      this._launch();
    }, 1300);
  },

  _social(provider) {
    AppToast.show(`Connecting with ${provider}…`,'info');
    setTimeout(() => { AppStore.setRole('student'); this._launch(); }, 900);
  },

  _roleUI(role) {
    ['student','recruiter','admin'].forEach(r => {
      const el = document.getElementById(`rc-${r}`);
      if (el) el.classList.toggle('selected', r === role);
    });
  },

  _eye(id, ico) {
    const f = document.getElementById(id);
    if (!f) return;
    const show = f.type === 'password';
    f.type = show ? 'text' : 'password';
    ico.className = `fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'} ico ico-right`;
  },

  _strength(val) {
    const bar = document.getElementById('s-bar');
    const hint = document.getElementById('s-hint');
    if (!bar || !hint) return;
    let s = 0;
    if (val.length >= 8) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/\d/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;
    const map = [
      { w:'0%',   c:'#e2e8f0', t:'Enter a password' },
      { w:'25%',  c:'#ef4444', t:'Weak — too simple' },
      { w:'50%',  c:'#f59e0b', t:'Fair — add uppercase' },
      { w:'75%',  c:'#3b82f6', t:'Good — add a symbol' },
      { w:'100%', c:'#10b981', t:'Strong ✓' },
    ];
    const lv = map[s];
    bar.style.width = lv.w; bar.style.background = lv.c;
    hint.textContent = lv.t; hint.style.color = lv.c;
  },

  _loading(prefix, on) {
    const btn  = document.getElementById(`${prefix}-btn`);
    const txt  = document.getElementById(`${prefix}-btn-txt`);
    const spin = document.getElementById(`${prefix}-spin`);
    if (!btn||!txt||!spin) return;
    btn.disabled = on;
    txt.style.display = on ? 'none' : 'flex';
    spin.style.display = on ? 'block' : 'none';
  },

  _launch() {
    document.body.innerHTML = '';
    BootApp();
  }
};

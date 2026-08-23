/* ================================================
   ApexHire AI — Student Dashboard
   ================================================ */
const DashboardModule = {
  _chart: null,

  render(container) {
    const profile  = AppStore.getProfile();
    const score    = AppStore.calculateReadinessScore();
    const solved   = AppStore.getSolvedProblems().length;
    const total    = AppData.codingProblems.length;
    const tests    = AppStore.getAssessmentResults();
    const initials = profile.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);

    container.innerHTML = `
      <div class="grid-12" style="row-gap:20px;">

        <!-- ── Welcome Banner ── -->
        <div class="g-12">
          <div class="card" style="background:var(--grad-brand); border:none; overflow:hidden; position:relative;">
            <div style="position:absolute;top:-60px;right:-60px;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,0.07);"></div>
            <div style="position:absolute;bottom:-40px;left:40%;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.05);"></div>
            <div class="card-body" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:18px;position:relative;">
              <div>
                <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
                  <span class="pill" style="background:rgba(255,255,255,0.18);color:#fff;">
                    <i class="fa-solid fa-graduation-cap"></i> Batch ${profile.gradYear}
                  </span>
                  <span class="pill" style="background:rgba(255,255,255,0.18);color:#fff;">
                    <i class="fa-solid fa-fire"></i> ${profile.streakCount} Day Streak
                  </span>
                </div>
                <h1 style="color:#fff;font-size:1.7rem;margin-bottom:6px;">Welcome back, ${profile.name}! 👋</h1>
                <p style="color:rgba(255,255,255,0.75);max-width:500px;">You're in the <strong style="color:#fff;">Top 12%</strong> of your placement cohort. Your next goal — crack a Google-level problem today.</p>
              </div>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button class="btn btn-lg" style="background:rgba(255,255,255,0.18);color:#fff;border:1px solid rgba(255,255,255,0.3);" onclick="AppRouter.go('interview')">
                  <i class="fa-solid fa-headset"></i> AI Interview
                </button>
                <button class="btn btn-lg" style="background:#fff;color:var(--indigo);" onclick="AppRouter.go('coding')">
                  <i class="fa-solid fa-code"></i> Coding
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── 4 Stat Cards ── -->
        <div class="g-3">
          <div class="card card-hover">
            <div class="stat-widget">
              <div class="stat-icon" style="background:var(--indigo-light);color:var(--indigo);">
                <i class="fa-solid fa-gauge-high"></i>
              </div>
              <div>
                <div class="stat-val">${score}%</div>
                <div class="stat-label">Placement Readiness</div>
              </div>
            </div>
          </div>
        </div>

        <div class="g-3">
          <div class="card card-hover">
            <div class="stat-widget">
              <div class="stat-icon" style="background:var(--sky-light);color:var(--sky);">
                <i class="fa-solid fa-code"></i>
              </div>
              <div>
                <div class="stat-val">${solved} <span style="font-size:1rem;color:var(--text-tertiary);">/ ${total}</span></div>
                <div class="stat-label">Problems Solved</div>
              </div>
            </div>
          </div>
        </div>

        <div class="g-3">
          <div class="card card-hover">
            <div class="stat-widget">
              <div class="stat-icon" style="background:var(--emerald-light);color:var(--emerald);">
                <i class="fa-solid fa-list-check"></i>
              </div>
              <div>
                <div class="stat-val">${tests.length}</div>
                <div class="stat-label">Mock Tests Done</div>
              </div>
            </div>
          </div>
        </div>

        <div class="g-3">
          <div class="card card-hover">
            <div class="stat-widget">
              <div class="stat-icon" style="background:var(--amber-light);color:var(--amber);">
                <i class="fa-solid fa-file-circle-check"></i>
              </div>
              <div>
                <div class="stat-val">88<span style="font-size:1rem;color:var(--text-tertiary);">/100</span></div>
                <div class="stat-label">ATS Resume Score</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Readiness Gauge ── -->
        <div class="g-4">
          <div class="card" style="height:100%;">
            <div class="card-body" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;min-height:280px;">
              <h3 style="margin-bottom:20px;">Readiness Index</h3>
              <div style="position:relative;width:155px;height:155px;margin-bottom:16px;">
                <svg width="155" height="155" style="transform:rotate(-90deg);">
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#4f46e5"/>
                      <stop offset="100%" stop-color="#7c3aed"/>
                    </linearGradient>
                  </defs>
                  <circle cx="77.5" cy="77.5" r="65" fill="none" stroke="#f1f3fb" stroke-width="10"/>
                  <circle id="gaugeRing" cx="77.5" cy="77.5" r="65" fill="none" stroke="url(#g1)"
                    stroke-width="10" stroke-linecap="round"
                    stroke-dasharray="408" stroke-dashoffset="408"/>
                </svg>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                  <span style="font-size:2rem;font-weight:800;color:var(--text-primary);line-height:1;" id="gaugeScore">${score}%</span>
                  <span style="font-size:0.7rem;color:var(--emerald);font-weight:700;text-transform:uppercase;letter-spacing:.04em;">High Chance</span>
                </div>
              </div>
              <p style="font-size:0.82rem;color:var(--text-tertiary);max-width:200px;line-height:1.5;">
                Based on test scores, coding, and resume match.
              </p>
            </div>
          </div>
        </div>

        <!-- ── Skill Radar ── -->
        <div class="g-8">
          <div class="card" style="height:100%;">
            <div class="card-body">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                <h3>Skill Competency Radar</h3>
                <span class="pill pill-indigo">Live</span>
              </div>
              <div style="height:250px;position:relative;">
                <canvas id="radarCanvas"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Action Items ── -->
        <div class="g-8">
          <div class="card">
            <div class="card-body">
              <h3 style="margin-bottom:16px;">Recommended Next Steps</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${this._actionRow('fa-code','var(--indigo-light)','var(--indigo)','Solve: Longest Substring Without Repeating','Sliding Window · Asked at Google & Meta','coding','Practice Now','btn-primary')}
                ${this._actionRow('fa-list-check','var(--sky-light)','var(--sky)','CS Core Mock Test — OS, DBMS, Networks','20 mins · Detailed solution explanations','assessment','Start Test','btn-outline')}
                ${this._actionRow('fa-headset','var(--emerald-light)','var(--emerald)','Backend Engineering AI Interview','Timed · STAR method evaluation','interview','Enter Now','btn-outline')}
              </div>
            </div>
          </div>
        </div>

        <!-- ── Upcoming Drives ── -->
        <div class="g-4">
          <div class="card">
            <div class="card-body">
              <h3 style="margin-bottom:16px;">Upcoming Campus Drives</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${this._driveRow('Google India','SDE-1 · ₹32 LPA','Aug 28','#4285F4')}
                ${this._driveRow('Amazon','Cloud Engineer · ₹28 LPA','Sep 2','#FF9900')}
                ${this._driveRow('TCS Digital','Systems Engineer · ₹11 LPA','Sep 8','#0072C6')}
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    this._initGauge(score);
    this._initRadar();
  },

  _actionRow(icon, bg, color, title, sub, route, label, btnClass) {
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;background:var(--surface-1);border:1px solid var(--border);border-radius:var(--r-sm);">
        <div style="display:flex;align-items:center;gap:13px;">
          <div style="width:40px;height:40px;border-radius:var(--r-xs);background:${bg};color:${color};display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">
            <i class="fa-solid ${icon}"></i>
          </div>
          <div>
            <div style="font-weight:600;font-size:0.875rem;">${title}</div>
            <div style="font-size:0.77rem;color:var(--text-tertiary);margin-top:2px;">${sub}</div>
          </div>
        </div>
        <button class="btn btn-sm ${btnClass}" onclick="AppRouter.go('${route}')">${label}</button>
      </div>`;
  },

  _driveRow(name, detail, date, accentColor) {
    return `
      <div style="padding:12px 14px;border-left:3px solid ${accentColor};background:var(--surface-1);border-radius:0 var(--r-sm) var(--r-sm) 0;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-weight:700;font-size:0.875rem;">${name}</div>
          <div style="font-size:0.77rem;color:var(--text-tertiary);margin-top:2px;">${detail}</div>
        </div>
        <span class="pill pill-indigo">${date}</span>
      </div>`;
  },

  _initGauge(score) {
    const ring = document.getElementById('gaugeRing');
    if (!ring) return;
    const total = 408;
    const offset = total - (total * score / 100);
    setTimeout(() => { ring.style.transition='stroke-dashoffset 1.1s ease'; ring.style.strokeDashoffset = offset; }, 120);
  },

  _initRadar() {
    const ctx = document.getElementById('radarCanvas');
    if (!ctx || typeof Chart === 'undefined') return;
    if (this._chart) this._chart.destroy();
    this._chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Quant Aptitude', 'Logical Reasoning', 'Data Structures', 'System Design', 'CS Core', 'Verbal / HR'],
        datasets: [{
          data: [85, 90, 78, 65, 82, 88],
          backgroundColor: 'rgba(79,70,229,0.12)',
          borderColor: '#4f46e5',
          pointBackgroundColor: '#7c3aed',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#4f46e5',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: {
          r: {
            min: 0, max: 100,
            angleLines: { color: 'rgba(79,70,229,0.1)' },
            grid: { color: 'rgba(79,70,229,0.08)' },
            pointLabels: { color: '#64748b', font: { size: 11, family:'Inter' } },
            ticks: { display: false, stepSize: 25 },
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
};

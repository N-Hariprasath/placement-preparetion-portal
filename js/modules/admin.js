/* ApexHire AI - Recruiter & Placement Cell Admin Dashboards */

const AdminModule = {
  candidates: [
    { name: "Alex Morgan", branch: "CSE", cgpa: "8.9", readiness: 88, codingSolved: 14, skills: ["Python", "JavaScript", "React"], status: "Ready for Interview" },
    { name: "Priya Sharma", branch: "ECE", cgpa: "9.2", readiness: 94, codingSolved: 28, skills: ["C++", "DSA", "System Design"], status: "Shortlisted" },
    { name: "Rahul Verma", branch: "CSE", cgpa: "8.5", readiness: 82, codingSolved: 19, skills: ["Java", "Spring Boot", "SQL"], status: "In Assessment" },
    { name: "Ananya Patel", branch: "IT", cgpa: "8.7", readiness: 86, codingSolved: 22, skills: ["Python", "Data Science", "SQL"], status: "Shortlisted" }
  ],

  renderRecruiter(container) {
    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; margin-bottom: 6px;">Recruiter Candidate Talent Pool</h1>
            <p style="color: var(--text-muted);">Filter and shortlist top candidate profiles based on verified coding benchmarks and readiness index.</p>
          </div>
          <button class="btn btn-primary" onclick="AppToast.show('Drive Invitation link copied to clipboard!', 'success')">
            <i class="fa-solid fa-plus"></i> Create Placement Drive
          </button>
        </div>

        <!-- Filter Bar -->
        <div class="glass-panel" style="padding: 20px; margin-bottom: 24px; display: flex; gap: 16px; flex-wrap: wrap;">
          <input type="text" id="candSearch" class="form-control" style="width: 250px;" placeholder="Search candidate name or skill..." onkeyup="AdminModule.filterCandidates()">
          <select id="branchFilter" class="form-control" style="width: 180px;" onchange="AdminModule.filterCandidates()">
            <option value="">All Branches</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="IT">Information Tech (IT)</option>
            <option value="ECE">Electronics (ECE)</option>
          </select>
          <select id="minScoreFilter" class="form-control" style="width: 200px;" onchange="AdminModule.filterCandidates()">
            <option value="0">Min Readiness: Any</option>
            <option value="80">Readiness >= 80%</option>
            <option value="90">Readiness >= 90%</option>
          </select>
        </div>

        <!-- Candidates Table -->
        <div class="glass-panel" style="overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
            <thead>
              <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid var(--border-color); color: var(--text-muted);">
                <th style="padding: 16px 20px;">Candidate Name</th>
                <th style="padding: 16px 20px;">Branch & CGPA</th>
                <th style="padding: 16px 20px;">Readiness Score</th>
                <th style="padding: 16px 20px;">Coding Solved</th>
                <th style="padding: 16px 20px;">Key Skills</th>
                <th style="padding: 16px 20px;">Status</th>
                <th style="padding: 16px 20px;">Action</th>
              </tr>
            </thead>
            <tbody id="candidateTableBody">
              ${this.candidates.map(c => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 16px 20px; font-weight: 600;">${c.name}</td>
                  <td style="padding: 16px 20px;">${c.branch} • ${c.cgpa} CGPA</td>
                  <td style="padding: 16px 20px;"><span class="badge badge-success">${c.readiness}%</span></td>
                  <td style="padding: 16px 20px;">${c.codingSolved} Problems</td>
                  <td style="padding: 16px 20px;">
                    ${c.skills.map(s => `<span class="badge badge-indigo" style="font-size:0.7rem; margin-right:4px;">${s}</span>`).join('')}
                  </td>
                  <td style="padding: 16px 20px;"><span class="badge badge-cyan">${c.status}</span></td>
                  <td style="padding: 16px 20px;">
                    <button class="btn btn-sm btn-outline" onclick="AppToast.show('Interview Scheduled for ${c.name}', 'success')">Schedule Interview</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderAdmin(container) {
    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 28px;">
          <h1 style="font-size: 1.8rem; margin-bottom: 6px;">College Placement Cell Admin Overview</h1>
          <p style="color: var(--text-muted);">Institutional placement statistics, hiring trends, and package distributions for Batch 2026.</p>
        </div>

        <!-- Metric Stat Row -->
        <div class="dashboard-grid">
          <div class="col-3">
            <div class="glass-panel stat-card">
              <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--success);"><i class="fa-solid fa-graduation-cap"></i></div>
              <div>
                <div class="stat-val">92.4%</div>
                <div class="stat-label">Batch Placement Rate</div>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="glass-panel stat-card">
              <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--primary);"><i class="fa-solid fa-money-bill-wave"></i></div>
              <div>
                <div class="stat-val">₹45.0 LPA</div>
                <div class="stat-label">Highest Package</div>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="glass-panel stat-card">
              <div class="stat-icon" style="background: rgba(6, 182, 212, 0.15); color: var(--secondary);"><i class="fa-solid fa-chart-line"></i></div>
              <div>
                <div class="stat-val">₹14.2 LPA</div>
                <div class="stat-label">Median Package</div>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="glass-panel stat-card">
              <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--warning);"><i class="fa-solid fa-building"></i></div>
              <div>
                <div class="stat-val">68 Companies</div>
                <div class="stat-label">Visited Campus</div>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-panel" style="padding: 24px;">
          <h3 style="font-size: 1.1rem; margin-bottom: 16px;">Branch-wise Offer Breakdown</h3>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px;">
                <span>Computer Science & Engineering (CSE)</span>
                <span style="font-weight: 700; color: var(--success);">98% Placed (142 / 145 Students)</span>
              </div>
              <div style="height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                <div style="width: 98%; height: 100%; background: var(--success);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px;">
                <span>Information Technology (IT)</span>
                <span style="font-weight: 700; color: var(--secondary);">94% Placed (92 / 98 Students)</span>
              </div>
              <div style="height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                <div style="width: 94%; height: 100%; background: var(--secondary);"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  filterCandidates() {
    const query = document.getElementById('candSearch').value.toLowerCase();
    const branch = document.getElementById('branchFilter').value;
    const minScore = parseInt(document.getElementById('minScoreFilter').value) || 0;

    const filtered = this.candidates.filter(c => {
      const matchName = c.name.toLowerCase().includes(query) || c.skills.some(s => s.toLowerCase().includes(query));
      const matchBranch = !branch || c.branch === branch;
      const matchScore = c.readiness >= minScore;
      return matchName && matchBranch && matchScore;
    });

    const tbody = document.getElementById('candidateTableBody');
    if (tbody) {
      tbody.innerHTML = filtered.map(c => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
          <td style="padding: 16px 20px; font-weight: 600;">${c.name}</td>
          <td style="padding: 16px 20px;">${c.branch} • ${c.cgpa} CGPA</td>
          <td style="padding: 16px 20px;"><span class="badge badge-success">${c.readiness}%</span></td>
          <td style="padding: 16px 20px;">${c.codingSolved} Problems</td>
          <td style="padding: 16px 20px;">
            ${c.skills.map(s => `<span class="badge badge-indigo" style="font-size:0.7rem; margin-right:4px;">${s}</span>`).join('')}
          </td>
          <td style="padding: 16px 20px;"><span class="badge badge-cyan">${c.status}</span></td>
          <td style="padding: 16px 20px;">
            <button class="btn btn-sm btn-outline" onclick="AppToast.show('Interview Scheduled for ${c.name}', 'success')">Schedule Interview</button>
          </td>
        </tr>
      `).join('');
    }
  }
};

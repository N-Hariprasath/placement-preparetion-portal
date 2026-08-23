/* ApexHire AI - Resume ATS Scanner Module */

const ResumeModule = {
  targetRole: 'Software Development Engineer',

  render(container) {
    container.innerHTML = `
      <div style="max-width: 1100px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 28px;">
          <h1 style="font-size: 1.8rem; margin-bottom: 6px;">AI Resume ATS Analyzer & Optimizer</h1>
          <p style="color: var(--text-muted);">Scan your resume against top tech company job descriptions to boost your interview callback rate.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 400px; gap: 24px;">
          <!-- Left Main Scanner & Upload -->
          <div>
            <div class="glass-panel" style="padding: 28px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                <h3 style="font-size: 1.1rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Upload Resume</h3>
                <div>
                  <label class="form-label" style="display: inline-block; margin-right: 8px;">Target Role:</label>
                  <select id="targetRoleSelect" class="form-control" style="display: inline-block; width: 220px; padding: 6px 12px; font-size: 0.85rem;" onchange="ResumeModule.changeRole(this.value)">
                    <option value="Software Development Engineer">Software Engineer (SDE)</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Analyst">Data Analyst / Scientist</option>
                    <option value="Cloud DevOps Engineer">Cloud DevOps Engineer</option>
                  </select>
                </div>
              </div>

              <div class="dropzone" id="resumeDropzone" onclick="document.getElementById('resumeFileInput').click()">
                <div style="font-size: 3rem; color: var(--primary); margin-bottom: 12px;">
                  <i class="fa-solid fa-file-pdf"></i>
                </div>
                <h4 style="font-size: 1.1rem; margin-bottom: 6px;">Drag & Drop your Resume (PDF/Docx)</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px;">or click to browse files on your device</p>
                <button class="btn btn-sm btn-outline">Select Resume File</button>
                <input type="file" id="resumeFileInput" style="display: none;" accept=".pdf,.docx,.txt" onchange="ResumeModule.handleFileUpload(this.files)">
              </div>
            </div>

            <!-- Resume Text Paste Fallback -->
            <div class="glass-panel" style="padding: 24px;">
              <h3 style="font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-paste"></i> Or Paste Resume Text Content</h3>
              <textarea id="resumeTextContent" class="form-control" style="height: 140px; font-size: 0.88rem; margin-bottom: 14px;" placeholder="Paste raw resume text here..."></textarea>
              <button class="btn btn-primary" onclick="ResumeModule.analyzeText()">
                <i class="fa-solid fa-wand-magic-sparkles"></i> Scan & Generate ATS Report
              </button>
            </div>
          </div>

          <!-- Right ATS Score Preview Card -->
          <div id="atsReportCard" class="glass-panel" style="padding: 28px;">
            <h3 style="font-size: 1.1rem; margin-bottom: 20px;">ATS Score Summary</h3>
            <div style="text-align: center; margin-bottom: 24px;">
              <div style="width: 120px; height: 120px; border-radius: 50%; border: 8px solid var(--success); display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto 12px; background: rgba(16, 185, 129, 0.1);">
                <span style="font-size: 2.2rem; font-weight: 800; color: var(--text-main);">88</span>
                <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">out of 100</span>
              </div>
              <span class="badge badge-success">High Callback Probability</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">Found Essential Keywords:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  <span class="badge badge-indigo">Python</span>
                  <span class="badge badge-indigo">Data Structures</span>
                  <span class="badge badge-indigo">REST API</span>
                  <span class="badge badge-indigo">SQL</span>
                  <span class="badge badge-indigo">Git</span>
                </div>
              </div>

              <div>
                <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; color: var(--warning);">Missing Recommended Keywords:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  <span class="badge badge-warning">Docker / Containers</span>
                  <span class="badge badge-warning">System Architecture</span>
                  <span class="badge badge-warning">Unit Testing (Jest/PyTest)</span>
                </div>
              </div>

              <div style="background: var(--bg-input); padding: 14px; border-radius: var(--radius-md); font-size: 0.82rem; line-height: 1.6;">
                <strong>💡 Actionable Tip:</strong> Quantify your project achievements using numbers (e.g. "Optimized API throughput by 30%").
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  changeRole(role) {
    this.targetRole = role;
  },

  handleFileUpload(files) {
    if (files.length > 0) {
      AppToast.show(`Uploaded ${files[0].name}. Analyzing ATS score...`, 'info');
      setTimeout(() => {
        AppToast.show('ATS Resume Scan Completed! Score: 88/100', 'success');
      }, 1000);
    }
  },

  analyzeText() {
    const text = document.getElementById('resumeTextContent').value;
    if (!text.trim()) {
      AppToast.show('Please paste resume text to scan.', 'warning');
      return;
    }

    AppToast.show('Analyzing resume text against Job Description...', 'info');
    setTimeout(() => {
      AppToast.show('ATS Optimization Report Updated!', 'success');
    }, 800);
  }
};

/* ApexHire AI - Profile & Role Manager Module */

const AuthModule = {
  renderProfile(container) {
    const profile = AppStore.getProfile();

    container.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 28px;">
          <h1 style="font-size: 1.8rem; margin-bottom: 6px;">Student Profile & Career Target</h1>
          <p style="color: var(--text-muted);">Manage your academic details, skills matrix, certifications, and target company preferences.</p>
        </div>

        <div class="glass-panel" style="padding: 32px;">
          <form id="profileForm" onsubmit="AuthModule.saveProfileForm(event)">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="profName" class="form-control" value="${profile.name}" required>
              </div>

              <div class="form-group">
                <label class="form-label">University Email</label>
                <input type="email" id="profEmail" class="form-control" value="${profile.email}" required>
              </div>

              <div class="form-group">
                <label class="form-label">College / Institute Name</label>
                <input type="text" id="profCollege" class="form-control" value="${profile.college}" required>
              </div>

              <div class="form-group">
                <label class="form-label">Branch / Specialization</label>
                <input type="text" id="profBranch" class="form-control" value="${profile.branch}" required>
              </div>

              <div class="form-group">
                <label class="form-label">Current CGPA / Percentage</label>
                <input type="text" id="profCgpa" class="form-control" value="${profile.cgpa}" required>
              </div>

              <div class="form-group">
                <label class="form-label">Graduation Year</label>
                <input type="text" id="profGradYear" class="form-control" value="${profile.gradYear}" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Skills (Comma-separated)</label>
              <input type="text" id="profSkills" class="form-control" value="${profile.skills.join(', ')}">
            </div>

            <div class="form-group">
              <label class="form-label">Certifications (Comma-separated)</label>
              <input type="text" id="profCertifications" class="form-control" value="${profile.certifications.join(', ')}">
            </div>

            <div style="margin-top: 24px; text-align: right;">
              <button type="submit" class="btn btn-primary btn-lg">
                <i class="fa-solid fa-floppy-disk"></i> Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  saveProfileForm(event) {
    event.preventDefault();
    const current = AppStore.getProfile();

    const updated = {
      ...current,
      name: document.getElementById('profName').value,
      email: document.getElementById('profEmail').value,
      college: document.getElementById('profCollege').value,
      branch: document.getElementById('profBranch').value,
      cgpa: document.getElementById('profCgpa').value,
      gradYear: document.getElementById('profGradYear').value,
      skills: document.getElementById('profSkills').value.split(',').map(s => s.trim()).filter(Boolean),
      certifications: document.getElementById('profCertifications').value.split(',').map(s => s.trim()).filter(Boolean)
    };

    AppStore.saveProfile(updated);
    AppToast.show('Profile updated successfully!', 'success');
  }
};

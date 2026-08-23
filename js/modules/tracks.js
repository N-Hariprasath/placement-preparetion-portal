/* ApexHire AI - Company Prep Tracks Module */

const TracksModule = {
  render(container) {
    const tracks = AppData.companyTracks;

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 28px;">
          <h1 style="font-size: 1.8rem; margin-bottom: 6px;">Company-Specific Placement Roadmaps</h1>
          <p style="color: var(--text-muted);">Curated interview patterns, salary benchmarks, selection process breakdown, and topic priorities for top recruitment drives.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
          ${tracks.map(track => `
            <div class="glass-panel gradient-border" style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 50px; height: 50px; border-radius: var(--radius-md); background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: ${track.color}; border: 1px solid var(--border-color);">
                      <i class="${track.logoIcon}"></i>
                    </div>
                    <div>
                      <h3 style="font-size: 1.25rem;">${track.name}</h3>
                      <div style="font-size: 0.85rem; color: var(--text-muted);">${track.role}</div>
                    </div>
                  </div>

                  <span class="badge badge-cyan">${track.avgPackage}</span>
                </div>

                <div style="margin-bottom: 20px;">
                  <h4 style="font-size: 0.9rem; margin-bottom: 8px; color: var(--secondary);">Recruitment Selection Rounds</h4>
                  <ul style="font-size: 0.85rem; color: var(--text-main); padding-left: 20px; line-height: 1.7;">
                    ${track.rounds.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                </div>

                <div style="margin-bottom: 20px;">
                  <h4 style="font-size: 0.9rem; margin-bottom: 8px; color: var(--secondary);">Must-Prepare Topics</h4>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${track.mustPrepare.map(tp => `<span class="badge badge-indigo">${tp}</span>`).join('')}
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 10px; margin-top: 12px;">
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="AppRouter.navigate('coding')">
                  <i class="fa-solid fa-code"></i> Practice Company Problems
                </button>
                <button class="btn btn-secondary btn-sm" onclick="AppRouter.navigate('interview')">
                  <i class="fa-solid fa-headset"></i> AI Mock Interview
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};

// Saved Jobs View

import { storage } from '../storage.js';
import { renderJobCard, showToast, updateSavedBadgeCount } from '../ui.js';
import { jobsView } from './jobsView.js';

class SavedView {
  constructor() {
    this.container = null;
  }

  init() {
    this.container = document.getElementById('saved-jobs-list');
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      // Unsave / Remove button
      const unsaveBtn = e.target.closest('.unsave-job-btn') || e.target.closest('.bookmark-btn');
      if (unsaveBtn) {
        e.stopPropagation();
        const jobId = unsaveBtn.dataset.jobId;
        storage.removeSavedJob(jobId);
        updateSavedBadgeCount();
        showToast('Removed from saved jobs', 'info');
        this.render();
        // Also re-render main jobs view to keep bookmark icons in sync
        jobsView.render();
        return;
      }

      // View details
      const detailsBtn = e.target.closest('.view-job-details-btn') || e.target.closest('.job-card-title');
      if (detailsBtn) {
        const jobId = detailsBtn.dataset.jobId;
        jobsView.openJobDetailModal(jobId);
        return;
      }

      // Quick apply
      const applyBtn = e.target.closest('.apply-job-btn');
      if (applyBtn && !applyBtn.disabled) {
        const jobId = applyBtn.dataset.jobId;
        jobsView.openApplicationModal(jobId);
        return;
      }
    });

    // Empty state browse jobs button
    const browseBtn = document.getElementById('saved-browse-jobs-btn');
    if (browseBtn) {
      browseBtn.addEventListener('click', () => {
        const jobsTab = document.querySelector('[data-view="jobs-view"]');
        if (jobsTab) jobsTab.click();
      });
    }
  }

  render() {
    if (!this.container) {
      this.container = document.getElementById('saved-jobs-list');
    }
    if (!this.container) return;

    const savedIds = storage.getSavedJobIds();
    const allJobs = storage.getJobs();
    const savedJobs = allJobs.filter(job => savedIds.includes(job.id));

    const countElem = document.getElementById('saved-count-text');
    if (countElem) {
      countElem.textContent = `${savedJobs.length} Saved Job${savedJobs.length === 1 ? '' : 's'}`;
    }

    if (savedJobs.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📑</div>
          <h3 class="empty-state-title">No saved jobs yet</h3>
          <p class="empty-state-desc">Click the bookmark icon on any job card while browsing to save it for later review.</p>
          <button class="btn btn-primary" id="saved-empty-browse-btn">Explore Job Listings</button>
        </div>
      `;
      const emptyBrowseBtn = document.getElementById('saved-empty-browse-btn');
      if (emptyBrowseBtn) {
        emptyBrowseBtn.addEventListener('click', () => {
          const jobsTab = document.querySelector('[data-view="jobs-view"]');
          if (jobsTab) jobsTab.click();
        });
      }
      return;
    }

    this.container.innerHTML = savedJobs.map(job => renderJobCard(job, { showUnsaveBtn: true })).join('');
  }
}

export const savedView = new SavedView();

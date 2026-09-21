// UI Utilities and Component Renderers

import { storage } from './storage.js';

export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatRelativeDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  const days = Math.floor(diffInSeconds / 86400);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`;
  if (type === 'success') {
    iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`;
  } else if (type === 'error') {
    iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px) scale(0.96)';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function updateSavedBadgeCount() {
  const count = storage.getSavedJobIds().length;
  const badge = document.getElementById('saved-count-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

export function renderJobCard(job, options = {}) {
  const isSaved = storage.isJobSaved(job.id);
  const hasApplied = storage.hasApplied(job.id);
  const showUnsaveBtn = options.showUnsaveBtn || false;

  const tagsHtml = (job.tags || [])
    .map(tag => `<span class="badge badge-gray">${escapeHtml(tag)}</span>`)
    .join('');

  return `
    <article class="job-card" data-job-id="${job.id}">
      <div class="job-card-header">
        <div class="job-company-block">
          <div class="company-logo" style="background-color: ${job.companyLogoBg || '#4f46e5'}">
            ${escapeHtml(job.logoLetter || job.company.charAt(0))}
          </div>
          <div class="job-title-group">
            <h3 class="job-card-title" data-job-id="${job.id}">${escapeHtml(job.title)}</h3>
            <div class="job-company-name">
              <span>${escapeHtml(job.company)}</span>
              ${job.isRemote ? '<span class="badge badge-primary">Remote</span>' : ''}
              ${hasApplied ? '<span class="badge badge-success">Applied</span>' : ''}
            </div>
          </div>
        </div>

        <div class="job-card-actions-top">
          <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-job-id="${job.id}" title="${isSaved ? 'Remove from saved' : 'Save job'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="job-card-body">
        <p class="job-description-excerpt">${escapeHtml(job.description)}</p>
        
        <div class="job-meta-list">
          <span class="job-meta-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${escapeHtml(job.location)}
          </span>
          <span class="job-meta-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            ${escapeHtml(job.type)}
          </span>
          <span class="job-meta-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            ${escapeHtml(job.salary)}
          </span>
          <span class="job-meta-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            ${escapeHtml(job.experience)}
          </span>
        </div>

        <div class="job-tags-list">
          ${tagsHtml}
        </div>
      </div>

      <div class="job-card-footer">
        <span class="job-posted-time">Posted ${formatRelativeDate(job.postedDate)}</span>
        
        <div class="job-actions-bottom">
          <button class="btn btn-outline btn-sm view-job-details-btn" data-job-id="${job.id}">
            View Details
          </button>
          <button class="btn btn-primary btn-sm apply-job-btn" data-job-id="${job.id}" ${hasApplied ? 'disabled style="opacity:0.65; cursor:default;"' : ''}>
            ${hasApplied ? 'Applied' : 'Quick Apply'}
          </button>
          ${showUnsaveBtn ? `
            <button class="btn btn-danger btn-sm unsave-job-btn" data-job-id="${job.id}">
              Remove
            </button>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}

// Job Listings View (Search, Filters, Job Cards, Details Modal, Apply Modal)

import { storage } from '../storage.js';
import { renderJobCard, showToast, openModal, closeModal, formatRelativeDate, escapeHtml, updateSavedBadgeCount } from '../ui.js';

class JobsView {
  constructor() {
    this.filters = {
      keyword: '',
      location: '',
      types: [],
      experience: [],
      remoteOnly: false,
      sortBy: 'recent'
    };

    this.selectedJobIdForApply = null;
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Search form inputs
    const keywordInput = document.getElementById('search-keyword');
    const locationInput = document.getElementById('search-location');
    const searchBtn = document.getElementById('search-submit-btn');

    const triggerSearch = () => {
      this.filters.keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : '';
      this.filters.location = locationInput ? locationInput.value.trim().toLowerCase() : '';
      this.render();
    };

    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerSearch();
      });
    }

    if (keywordInput) {
      keywordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          triggerSearch();
        }
      });
    }

    if (locationInput) {
      locationInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          triggerSearch();
        }
      });
    }

    // Quick tag chips
    document.querySelectorAll('.quick-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const tag = chip.dataset.tag || chip.textContent.trim();
        if (keywordInput) {
          keywordInput.value = tag;
          this.filters.keyword = tag.toLowerCase();
          this.render();
        }
      });
    });

    // Sidebar filter checkboxes: Job Type
    document.querySelectorAll('input[name="filter-job-type"]').forEach(cb => {
      cb.addEventListener('change', () => {
        this.filters.types = Array.from(document.querySelectorAll('input[name="filter-job-type"]:checked')).map(el => el.value);
        this.render();
      });
    });

    // Sidebar filter checkboxes: Experience
    document.querySelectorAll('input[name="filter-experience"]').forEach(cb => {
      cb.addEventListener('change', () => {
        this.filters.experience = Array.from(document.querySelectorAll('input[name="filter-experience"]:checked')).map(el => el.value);
        this.render();
      });
    });

    // Remote only checkbox
    const remoteOnlyCb = document.getElementById('filter-remote-only');
    if (remoteOnlyCb) {
      remoteOnlyCb.addEventListener('change', (e) => {
        this.filters.remoteOnly = e.target.checked;
        this.render();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('jobs-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.filters.sortBy = e.target.value;
        this.render();
      });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    // Delegated actions for Job Cards (Save, Details, Apply)
    const jobsList = document.getElementById('jobs-list');
    if (jobsList) {
      jobsList.addEventListener('click', (e) => {
        // Bookmark button
        const bookmarkBtn = e.target.closest('.bookmark-btn');
        if (bookmarkBtn) {
          e.stopPropagation();
          const jobId = bookmarkBtn.dataset.jobId;
          const isSaved = storage.toggleSaveJob(jobId);
          bookmarkBtn.classList.toggle('saved', isSaved);
          bookmarkBtn.title = isSaved ? 'Remove from saved' : 'Save job';
          const svg = bookmarkBtn.querySelector('svg');
          if (svg) svg.setAttribute('fill', isSaved ? 'currentColor' : 'none');
          updateSavedBadgeCount();
          showToast(isSaved ? 'Job saved to your bookmarks!' : 'Job removed from saved list.', 'info');
          return;
        }

        // View Details button or title click
        const detailsBtn = e.target.closest('.view-job-details-btn');
        const titleClick = e.target.closest('.job-card-title');
        if (detailsBtn || titleClick) {
          const jobId = (detailsBtn || titleClick).dataset.jobId;
          this.openJobDetailModal(jobId);
          return;
        }

        // Apply button
        const applyBtn = e.target.closest('.apply-job-btn');
        if (applyBtn && !applyBtn.disabled) {
          const jobId = applyBtn.dataset.jobId;
          this.openApplicationModal(jobId);
          return;
        }
      });
    }

    // Modal apply button from detail modal
    const modalDetailApplyBtn = document.getElementById('detail-modal-apply-btn');
    if (modalDetailApplyBtn) {
      modalDetailApplyBtn.addEventListener('click', () => {
        const jobId = modalDetailApplyBtn.dataset.jobId;
        closeModal('job-detail-modal');
        this.openApplicationModal(jobId);
      });
    }

    // Application Form Submit
    const appForm = document.getElementById('application-form');
    if (appForm) {
      appForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleApplicationSubmit();
      });
    }

    // File dropzone simulation
    const dropzone = document.getElementById('resume-dropzone');
    const resumeFileInput = document.getElementById('app-resume-file');
    const dropzoneText = document.getElementById('dropzone-text');

    if (dropzone && resumeFileInput) {
      dropzone.addEventListener('click', () => resumeFileInput.click());
      resumeFileInput.addEventListener('change', () => {
        if (resumeFileInput.files && resumeFileInput.files[0]) {
          if (dropzoneText) dropzoneText.textContent = `Selected: ${resumeFileInput.files[0].name}`;
        }
      });
    }
  }

  resetFilters() {
    this.filters = {
      keyword: '',
      location: '',
      types: [],
      experience: [],
      remoteOnly: false,
      sortBy: 'recent'
    };

    const kw = document.getElementById('search-keyword');
    if (kw) kw.value = '';
    const loc = document.getElementById('search-location');
    if (loc) loc.value = '';

    document.querySelectorAll('input[name="filter-job-type"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="filter-experience"]').forEach(cb => cb.checked = false);
    const remoteCb = document.getElementById('filter-remote-only');
    if (remoteCb) remoteCb.checked = false;

    const sortSelect = document.getElementById('jobs-sort-select');
    if (sortSelect) sortSelect.value = 'recent';

    this.render();
    showToast('Filters cleared', 'info');
  }

  getFilteredJobs() {
    let jobs = storage.getJobs();

    // Keyword filter (title, company, description, tags)
    if (this.filters.keyword) {
      const kw = this.filters.keyword;
      jobs = jobs.filter(job => {
        const matchTitle = job.title.toLowerCase().includes(kw);
        const matchCompany = job.company.toLowerCase().includes(kw);
        const matchDesc = job.description.toLowerCase().includes(kw);
        const matchTags = (job.tags || []).some(t => t.toLowerCase().includes(kw));
        return matchTitle || matchCompany || matchDesc || matchTags;
      });
    }

    // Location filter
    if (this.filters.location) {
      const loc = this.filters.location;
      jobs = jobs.filter(job => job.location.toLowerCase().includes(loc));
    }

    // Remote only
    if (this.filters.remoteOnly) {
      jobs = jobs.filter(job => job.isRemote);
    }

    // Job types
    if (this.filters.types.length > 0) {
      jobs = jobs.filter(job => this.filters.types.includes(job.type));
    }

    // Experience
    if (this.filters.experience.length > 0) {
      jobs = jobs.filter(job => this.filters.experience.includes(job.experience));
    }

    // Sorting
    if (this.filters.sortBy === 'recent') {
      jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (this.filters.sortBy === 'salary-high') {
      jobs.sort((a, b) => (b.salaryMin || 0) - (a.salaryMin || 0));
    } else if (this.filters.sortBy === 'salary-low') {
      jobs.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0));
    }

    return jobs;
  }

  render() {
    const jobsList = document.getElementById('jobs-list');
    const jobsCountElem = document.getElementById('jobs-count-text');
    if (!jobsList) return;

    const filtered = this.getFilteredJobs();

    if (jobsCountElem) {
      jobsCountElem.textContent = `Showing ${filtered.length} job${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      jobsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3 class="empty-state-title">No matching jobs found</h3>
          <p class="empty-state-desc">Try clearing filters or searching for different keywords, titles, or locations.</p>
          <button class="btn btn-secondary btn-sm" id="empty-state-clear-btn">Clear All Filters</button>
        </div>
      `;
      const emptyClearBtn = document.getElementById('empty-state-clear-btn');
      if (emptyClearBtn) {
        emptyClearBtn.addEventListener('click', () => this.resetFilters());
      }
      return;
    }

    jobsList.innerHTML = filtered.map(job => renderJobCard(job)).join('');
  }

  openJobDetailModal(jobId) {
    const job = storage.getJobById(jobId);
    if (!job) return;

    const modalTitle = document.getElementById('detail-modal-job-title');
    const modalCompany = document.getElementById('detail-modal-company');
    const modalLogo = document.getElementById('detail-modal-logo');
    const modalMeta = document.getElementById('detail-modal-meta');
    const modalDesc = document.getElementById('detail-modal-desc');
    const modalResp = document.getElementById('detail-modal-resp');
    const modalReqs = document.getElementById('detail-modal-reqs');
    const modalPerks = document.getElementById('detail-modal-perks');
    const applyBtn = document.getElementById('detail-modal-apply-btn');

    if (modalTitle) modalTitle.textContent = job.title;
    if (modalCompany) modalCompany.textContent = job.company;
    if (modalLogo) {
      modalLogo.textContent = job.logoLetter || job.company.charAt(0);
      modalLogo.style.backgroundColor = job.companyLogoBg || '#4f46e5';
    }

    if (modalMeta) {
      modalMeta.innerHTML = `
        <span class="badge badge-primary">${escapeHtml(job.type)}</span>
        <span class="badge badge-gray">${escapeHtml(job.experience)}</span>
        <span class="badge badge-success">${escapeHtml(job.salary)}</span>
        <span class="badge badge-info">${escapeHtml(job.location)}</span>
        ${job.isRemote ? '<span class="badge badge-primary">Remote</span>' : ''}
      `;
    }

    if (modalDesc) modalDesc.textContent = job.description;

    if (modalResp) {
      const respItems = job.responsibilities || [];
      modalResp.innerHTML = respItems.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    }

    if (modalReqs) {
      const reqItems = job.requirements || [];
      modalReqs.innerHTML = reqItems.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    }

    if (modalPerks) {
      const perkItems = job.benefits || [];
      modalPerks.innerHTML = perkItems.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    }

    if (applyBtn) {
      applyBtn.dataset.jobId = job.id;
      const hasApplied = storage.hasApplied(job.id);
      if (hasApplied) {
        applyBtn.textContent = 'Already Applied';
        applyBtn.disabled = true;
        applyBtn.style.opacity = '0.6';
      } else {
        applyBtn.textContent = 'Apply for this Role';
        applyBtn.disabled = false;
        applyBtn.style.opacity = '1';
      }
    }

    openModal('job-detail-modal');
  }

  openApplicationModal(jobId) {
    const job = storage.getJobById(jobId);
    if (!job) return;

    this.selectedJobIdForApply = jobId;

    const subtitle = document.getElementById('app-modal-job-info');
    if (subtitle) {
      subtitle.textContent = `Applying for ${job.title} at ${job.company}`;
    }

    const profile = storage.getProfile();
    const nameInput = document.getElementById('app-candidate-name');
    const emailInput = document.getElementById('app-candidate-email');
    const phoneInput = document.getElementById('app-candidate-phone');
    const dropzoneText = document.getElementById('dropzone-text');

    if (nameInput) nameInput.value = profile.name || '';
    if (emailInput) emailInput.value = profile.email || '';
    if (phoneInput) phoneInput.value = profile.phone || '';
    if (dropzoneText) dropzoneText.textContent = profile.resumeFileName ? `Using default: ${profile.resumeFileName}` : 'Drop resume file here or click to browse (PDF, DOCX)';

    openModal('application-modal');
  }

  handleApplicationSubmit() {
    if (!this.selectedJobIdForApply) return;

    const job = storage.getJobById(this.selectedJobIdForApply);
    if (!job) return;

    const name = document.getElementById('app-candidate-name')?.value.trim();
    const email = document.getElementById('app-candidate-email')?.value.trim();
    const phone = document.getElementById('app-candidate-phone')?.value.trim();
    const coverLetter = document.getElementById('app-cover-letter')?.value.trim();
    const resumeFileInput = document.getElementById('app-resume-file');
    const profile = storage.getProfile();

    if (!name || !email) {
      showToast('Please fill in your name and email address.', 'error');
      return;
    }

    let resumeName = profile.resumeFileName || 'Resume.pdf';
    if (resumeFileInput && resumeFileInput.files && resumeFileInput.files[0]) {
      resumeName = resumeFileInput.files[0].name;
    }

    const application = storage.submitApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      candidateName: name,
      candidateEmail: email,
      candidatePhone: phone,
      coverLetter: coverLetter || 'No cover letter provided.',
      resumeName: resumeName
    });

    closeModal('application-modal');
    showToast(`Application successfully submitted to ${job.company}!`, 'success');

    // Re-render to update the Applied badge and button status
    this.render();
  }
}

export const jobsView = new JobsView();

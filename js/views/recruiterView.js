// Recruiter Dashboard View (Metrics, Post New Job, Manage Postings, View Applicants)

import { storage } from '../storage.js';
import { showToast, escapeHtml, formatRelativeDate, openModal, closeModal } from '../ui.js';
import { jobsView } from './jobsView.js';

class RecruiterView {
  constructor() {
    this.selectedJobForApplicants = null;
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Open Post Job Modal button
    const openPostJobModalBtn = document.getElementById('open-post-job-btn');
    if (openPostJobModalBtn) {
      openPostJobModalBtn.addEventListener('click', () => {
        openModal('post-job-modal');
      });
    }

    // Post Job Form submission
    const postJobForm = document.getElementById('post-job-form');
    if (postJobForm) {
      postJobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePostJobSubmit();
      });
    }

    // Recruiter postings table action delegation (View Applicants, Delete)
    const postingsTableBody = document.getElementById('recruiter-postings-body');
    if (postingsTableBody) {
      postingsTableBody.addEventListener('click', (e) => {
        // View Applicants
        const viewAppsBtn = e.target.closest('.view-applicants-btn');
        if (viewAppsBtn) {
          const jobId = viewAppsBtn.dataset.jobId;
          this.openApplicantsModal(jobId);
          return;
        }

        // Delete Job
        const deleteBtn = e.target.closest('.delete-job-btn');
        if (deleteBtn) {
          const jobId = deleteBtn.dataset.jobId;
          const job = storage.getJobById(jobId);
          const confirmDelete = window.confirm(`Are you sure you want to delete "${job ? job.title : 'this job'}"? This action cannot be undone.`);
          if (confirmDelete) {
            storage.deleteJob(jobId);
            this.render();
            jobsView.render();
            showToast('Job posting successfully deleted.', 'info');
          }
          return;
        }
      });
    }
  }

  handlePostJobSubmit() {
    const title = document.getElementById('post-title')?.value.trim();
    const company = document.getElementById('post-company')?.value.trim();
    const location = document.getElementById('post-location')?.value.trim();
    const type = document.getElementById('post-type')?.value;
    const experience = document.getElementById('post-experience')?.value;
    const salary = document.getElementById('post-salary')?.value.trim();
    const isRemote = document.getElementById('post-remote')?.checked || false;
    const tagsInput = document.getElementById('post-tags')?.value.trim();
    const description = document.getElementById('post-desc')?.value.trim();
    const respInput = document.getElementById('post-resp')?.value.trim();
    const reqsInput = document.getElementById('post-reqs')?.value.trim();

    if (!title || !company || !location || !salary || !description) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : ['Tech', 'Hiring'];
    const responsibilities = respInput ? respInput.split('\n').map(r => r.trim()).filter(Boolean) : ['Collaborate with team to achieve goals.'];
    const requirements = reqsInput ? reqsInput.split('\n').map(r => r.trim()).filter(Boolean) : ['Demonstrated experience in related domain.'];

    // Derive rough minimum salary for sorting
    const salaryMatch = salary.match(/\$?(\d+)[,\d]*/);
    const salaryMin = salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, ''), 10) : 80000;

    // Company logo letter and color
    const logoLetter = company.charAt(0).toUpperCase();
    const colors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    const companyLogoBg = colors[Math.floor(Math.random() * colors.length)];

    const newJob = storage.addJob({
      title,
      company,
      companyLogoBg,
      logoLetter,
      location,
      type,
      experience,
      salary,
      salaryMin,
      category: 'Engineering',
      tags,
      isRemote,
      isFeatured: false,
      description,
      responsibilities,
      requirements,
      benefits: ['Competitive compensation', 'Comprehensive health coverage', 'Flexible working policy']
    });

    // Reset form & close modal
    document.getElementById('post-job-form').reset();
    closeModal('post-job-modal');

    // Update recruiter view & main job view
    this.render();
    jobsView.render();
    showToast(`Successfully published job: "${newJob.title}"!`, 'success');
  }

  openApplicantsModal(jobId) {
    const job = storage.getJobById(jobId);
    if (!job) return;

    this.selectedJobForApplicants = jobId;
    const modalTitle = document.getElementById('applicants-modal-title');
    const applicantsListContainer = document.getElementById('applicants-modal-list');

    if (modalTitle) {
      modalTitle.textContent = `Applicants for ${job.title} (${job.company})`;
    }

    const apps = storage.getApplicationsByJobId(jobId);

    if (applicantsListContainer) {
      if (apps.length === 0) {
        applicantsListContainer.innerHTML = `
          <div class="empty-state" style="padding: 2.5rem 1rem;">
            <div class="empty-state-icon" style="font-size: 2.2rem;">👥</div>
            <h4 class="empty-state-title">No applications yet</h4>
            <p class="empty-state-desc">Candidates who apply for this posting will be listed here.</p>
          </div>
        `;
      } else {
        applicantsListContainer.innerHTML = apps.map(app => `
          <div class="applicant-card">
            <div class="applicant-header">
              <div>
                <div class="applicant-name">${escapeHtml(app.candidateName)}</div>
                <div class="applicant-email">
                  📧 ${escapeHtml(app.candidateEmail)} ${app.candidatePhone ? `• 📞 ${escapeHtml(app.candidatePhone)}` : ''}
                </div>
              </div>
              <span class="badge badge-primary">${escapeHtml(app.status)}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
              Applied ${formatRelativeDate(app.appliedDate)} • Attached Resume: <strong>${escapeHtml(app.resumeName || 'Resume.pdf')}</strong>
            </div>
            <div class="applicant-cover-letter">
              <strong>Cover Note:</strong><br>
              ${escapeHtml(app.coverLetter)}
            </div>
          </div>
        `).join('');
      }
    }

    openModal('applicants-modal');
  }

  render() {
    this.renderMetrics();
    this.renderTable();
  }

  renderMetrics() {
    const jobs = storage.getJobs();
    const applications = storage.getApplications();

    const statJobsElem = document.getElementById('stat-total-jobs');
    const statAppsElem = document.getElementById('stat-total-applicants');
    const statActiveElem = document.getElementById('stat-active-postings');

    if (statJobsElem) statJobsElem.textContent = jobs.length;
    if (statAppsElem) statAppsElem.textContent = applications.length;
    if (statActiveElem) statActiveElem.textContent = jobs.length;
  }

  renderTable() {
    const tbody = document.getElementById('recruiter-postings-body');
    if (!tbody) return;

    const jobs = storage.getJobs();

    if (jobs.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-secondary);">
            No job postings created yet. Click "Post New Job" above to create your first listing.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = jobs.map(job => {
      const jobApps = storage.getApplicationsByJobId(job.id);

      return `
        <tr>
          <td>
            <div class="table-job-info">
              <span class="table-job-title">${escapeHtml(job.title)}</span>
              <span class="table-job-company">${escapeHtml(job.company)} • ${escapeHtml(job.location)}</span>
            </div>
          </td>
          <td>
            <span class="badge badge-gray">${escapeHtml(job.type)}</span>
          </td>
          <td>
            <span class="badge badge-primary">${escapeHtml(job.experience)}</span>
          </td>
          <td>
            <span style="font-weight: 600; font-size: 0.85rem;">${escapeHtml(job.salary)}</span>
          </td>
          <td>
            <button class="btn btn-secondary btn-sm view-applicants-btn" data-job-id="${job.id}" title="View candidates who applied">
              👥 ${jobApps.length} Applicant${jobApps.length === 1 ? '' : 's'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn btn-danger btn-sm delete-job-btn" data-job-id="${job.id}" title="Delete posting">
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }
}

export const recruiterView = new RecruiterView();

// Candidate Profile Section View

import { storage } from '../storage.js';
import { showToast, escapeHtml, formatRelativeDate, openModal, closeModal } from '../ui.js';

class ProfileView {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Add skill form
    const addSkillForm = document.getElementById('add-skill-form');
    const skillInput = document.getElementById('new-skill-input');

    if (addSkillForm && skillInput) {
      addSkillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const skillName = skillInput.value.trim();
        if (skillName) {
          storage.addSkill(skillName);
          skillInput.value = '';
          this.renderSkills();
          showToast(`Skill "${skillName}" added`, 'success');
        }
      });
    }

    // Skill removal event delegation
    const skillsContainer = document.getElementById('profile-skills-list');
    if (skillsContainer) {
      skillsContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-skill-btn');
        if (removeBtn) {
          const skillName = removeBtn.dataset.skill;
          storage.removeSkill(skillName);
          this.renderSkills();
          showToast(`Skill "${skillName}" removed`, 'info');
        }
      });
    }

    // Edit Profile Modal
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => {
        this.openEditModal();
      });
    }

    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
      editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleProfileSave();
      });
    }

    // Resume replacement simulation
    const resumeFileInput = document.getElementById('profile-resume-upload');
    if (resumeFileInput) {
      resumeFileInput.addEventListener('change', () => {
        if (resumeFileInput.files && resumeFileInput.files[0]) {
          const newFileName = resumeFileInput.files[0].name;
          storage.updateProfile({ resumeFileName: newFileName });
          this.renderProfileCard();
          showToast(`Resume updated to: ${newFileName}`, 'success');
        }
      });
    }
  }

  openEditModal() {
    const profile = storage.getProfile();
    document.getElementById('edit-name').value = profile.name || '';
    document.getElementById('edit-headline').value = profile.headline || '';
    document.getElementById('edit-email').value = profile.email || '';
    document.getElementById('edit-phone').value = profile.phone || '';
    document.getElementById('edit-location').value = profile.location || '';
    document.getElementById('edit-bio').value = profile.bio || '';
    openModal('edit-profile-modal');
  }

  handleProfileSave() {
    const updated = {
      name: document.getElementById('edit-name').value.trim(),
      headline: document.getElementById('edit-headline').value.trim(),
      email: document.getElementById('edit-email').value.trim(),
      phone: document.getElementById('edit-phone').value.trim(),
      location: document.getElementById('edit-location').value.trim(),
      bio: document.getElementById('edit-bio').value.trim(),
      avatarLetter: (document.getElementById('edit-name').value.trim() || 'A')
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    };

    storage.updateProfile(updated);
    closeModal('edit-profile-modal');
    this.render();
    showToast('Profile successfully updated!', 'success');
  }

  render() {
    this.renderProfileCard();
    this.renderSkills();
    this.renderAppliedJobs();
  }

  renderProfileCard() {
    const profile = storage.getProfile();

    const nameElem = document.getElementById('profile-name');
    const headlineElem = document.getElementById('profile-headline');
    const avatarElem = document.getElementById('profile-avatar');
    const emailElem = document.getElementById('profile-email');
    const phoneElem = document.getElementById('profile-phone');
    const locElem = document.getElementById('profile-location');
    const bioElem = document.getElementById('profile-bio');
    const resumeElem = document.getElementById('profile-resume-name');

    if (nameElem) nameElem.textContent = profile.name;
    if (headlineElem) headlineElem.textContent = profile.headline;
    if (avatarElem) avatarElem.textContent = profile.avatarLetter || profile.name.charAt(0);
    if (emailElem) emailElem.textContent = profile.email;
    if (phoneElem) phoneElem.textContent = profile.phone;
    if (locElem) locElem.textContent = profile.location;
    if (bioElem) bioElem.textContent = profile.bio;
    if (resumeElem) resumeElem.textContent = profile.resumeFileName || 'Resume.pdf';
  }

  renderSkills() {
    const container = document.getElementById('profile-skills-list');
    if (!container) return;

    const profile = storage.getProfile();
    const skills = profile.skills || [];

    if (skills.length === 0) {
      container.innerHTML = '<span style="color: var(--text-muted); font-size: 0.85rem;">No skills added yet. Add your core competencies above.</span>';
      return;
    }

    container.innerHTML = skills.map(skill => `
      <span class="skill-tag">
        ${escapeHtml(skill)}
        <span class="remove-skill-btn" data-skill="${escapeHtml(skill)}" title="Remove skill">&times;</span>
      </span>
    `).join('');
  }

  renderAppliedJobs() {
    const container = document.getElementById('applied-jobs-list');
    const countBadge = document.getElementById('applied-count-badge');
    if (!container) return;

    const applications = storage.getApplications();

    if (countBadge) {
      countBadge.textContent = `${applications.length} Application${applications.length === 1 ? '' : 's'}`;
    }

    if (applications.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 2rem 1rem;">
          <div class="empty-state-icon" style="font-size: 2.2rem;">💼</div>
          <h4 class="empty-state-title" style="font-size: 1.1rem;">No applications submitted yet</h4>
          <p class="empty-state-desc" style="font-size: 0.85rem; margin-bottom: 1rem;">When you apply for jobs, your applications and their progress will be tracked here.</p>
          <button class="btn btn-secondary btn-sm" id="profile-find-jobs-btn">Find Jobs to Apply</button>
        </div>
      `;
      const btn = document.getElementById('profile-find-jobs-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const tab = document.querySelector('[data-view="jobs-view"]');
          if (tab) tab.click();
        });
      }
      return;
    }

    container.innerHTML = applications.map(app => {
      let statusBadgeClass = 'badge-primary';
      if (app.status === 'Under Review') statusBadgeClass = 'badge-warning';
      if (app.status === 'Interview') statusBadgeClass = 'badge-info';
      if (app.status === 'Offered') statusBadgeClass = 'badge-success';

      return `
        <div class="applied-job-item">
          <div class="applied-job-details">
            <h4>${escapeHtml(app.jobTitle)}</h4>
            <div class="applied-job-company">Company: <strong>${escapeHtml(app.company)}</strong></div>
            <div class="applied-date">Applied ${formatRelativeDate(app.appliedDate)} • Resume: ${escapeHtml(app.resumeName || 'Default')}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="badge ${statusBadgeClass}">${escapeHtml(app.status)}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

export const profileView = new ProfileView();

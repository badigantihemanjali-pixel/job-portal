// Application Main Bootstrap and Routing

import { storage } from './storage.js';
import { updateSavedBadgeCount, closeModal, showToast } from './ui.js';
import { jobsView } from './views/jobsView.js';
import { savedView } from './views/savedView.js';
import { profileView } from './views/profileView.js';
import { recruiterView } from './views/recruiterView.js';

class App {
  constructor() {
    this.currentView = 'jobs-view';
  }

  init() {
    this.setupTheme();
    this.setupRole();
    this.bindNavigation();
    this.bindModals();
    this.bindThemeToggle();
    this.bindRoleSwitcher();

    // Initialize all sub-views
    jobsView.init();
    savedView.init();
    profileView.init();
    recruiterView.init();

    updateSavedBadgeCount();

    // Reset demo data helper (via console or hidden shortcut)
    window.resetPortalData = () => {
      storage.resetData();
      window.location.reload();
    };

    console.log('🚀 Job Portal initialized successfully.');
  }

  setupTheme() {
    const savedTheme = storage.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButtonIcon(savedTheme);
  }

  bindThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      storage.setTheme(next);
      this.updateThemeButtonIcon(next);
      showToast(`Switched to ${next} mode`, 'info');
    });
  }

  updateThemeButtonIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  setupRole() {
    const currentRole = storage.getRole();
    this.updateRoleUI(currentRole);
  }

  bindRoleSwitcher() {
    const roleBtn = document.getElementById('role-switcher-btn');
    if (!roleBtn) return;

    roleBtn.addEventListener('click', () => {
      const current = storage.getRole();
      const next = current === 'candidate' ? 'recruiter' : 'candidate';
      storage.setRole(next);
      this.updateRoleUI(next);

      if (next === 'recruiter') {
        this.switchView('recruiter-view');
        showToast('Switched to Recruiter Mode', 'success');
      } else {
        this.switchView('jobs-view');
        showToast('Switched to Candidate Mode', 'info');
      }
    });
  }

  updateRoleUI(role) {
    const roleBtn = document.getElementById('role-switcher-btn');
    if (roleBtn) {
      roleBtn.innerHTML = role === 'recruiter' 
        ? '<span>🏢 Recruiter Mode</span>' 
        : '<span>👤 Candidate Mode</span>';
    }
  }

  bindNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetViewId = tab.dataset.view;
        if (targetViewId) {
          this.switchView(targetViewId);
        }
      });
    });
  }

  switchView(viewId) {
    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    // Show selected view
    const targetSection = document.getElementById(viewId);
    if (targetSection) {
      targetSection.classList.add('active');
      this.currentView = viewId;
    }

    // Update active tab styling
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewId);
    });

    // Refresh view specific data
    if (viewId === 'jobs-view') {
      jobsView.render();
    } else if (viewId === 'saved-view') {
      savedView.render();
    } else if (viewId === 'profile-view') {
      profileView.render();
    } else if (viewId === 'recruiter-view') {
      recruiterView.render();
    }

    // Scroll smoothly to top of main view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindModals() {
    // Close button click in modal header or cancel button
    document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) {
          closeModal(modal.id);
        }
      });
    });

    // Close on clicking backdrop outside dialog
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal.id);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
          closeModal(modal.id);
        });
      }
    });
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

// Storage management layer using browser localStorage

import { initialJobs, initialProfile, initialApplications } from './data.js';

const STORAGE_KEYS = {
  JOBS: 'jobportal_jobs_v1',
  SAVED_JOBS: 'jobportal_saved_jobs_v1',
  APPLICATIONS: 'jobportal_applications_v1',
  PROFILE: 'jobportal_profile_v1',
  ROLE: 'jobportal_role_v1',
  THEME: 'jobportal_theme_v1'
};

class StorageService {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(initialJobs));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_JOBS)) {
      // Pre-save one job for nice initial state
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(["job-1"]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(initialApplications));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(initialProfile));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ROLE)) {
      localStorage.setItem(STORAGE_KEYS.ROLE, 'candidate');
    }
    if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }

  // Jobs
  getJobs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS)) || [];
    } catch {
      return [];
    }
  }

  getJobById(id) {
    const jobs = this.getJobs();
    return jobs.find(j => j.id === id) || null;
  }

  addJob(jobData) {
    const jobs = this.getJobs();
    const newJob = {
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString(),
      recruiterId: 'recruiter-custom',
      ...jobData
    };
    jobs.unshift(newJob);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    return newJob;
  }

  deleteJob(id) {
    let jobs = this.getJobs();
    jobs = jobs.filter(j => j.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));

    // Also remove from saved if present
    this.removeSavedJob(id);
    return true;
  }

  // Saved Jobs
  getSavedJobIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_JOBS)) || [];
    } catch {
      return [];
    }
  }

  isJobSaved(id) {
    const saved = this.getSavedJobIds();
    return saved.includes(id);
  }

  toggleSaveJob(id) {
    let saved = this.getSavedJobIds();
    const isCurrentlySaved = saved.includes(id);
    if (isCurrentlySaved) {
      saved = saved.filter(savedId => savedId !== id);
    } else {
      saved.push(id);
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(saved));
    return !isCurrentlySaved;
  }

  removeSavedJob(id) {
    let saved = this.getSavedJobIds();
    saved = saved.filter(savedId => savedId !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(saved));
  }

  // Applications
  getApplications() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) || [];
    } catch {
      return [];
    }
  }

  getApplicationsByJobId(jobId) {
    const apps = this.getApplications();
    return apps.filter(a => a.jobId === jobId);
  }

  hasApplied(jobId) {
    const apps = this.getApplications();
    return apps.some(a => a.jobId === jobId);
  }

  submitApplication(data) {
    const apps = this.getApplications();
    const newApplication = {
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString(),
      status: 'Applied',
      ...data
    };
    apps.unshift(newApplication);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    return newApplication;
  }

  // Profile
  getProfile() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || initialProfile;
    } catch {
      return initialProfile;
    }
  }

  updateProfile(fields) {
    const profile = this.getProfile();
    const updated = { ...profile, ...fields };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    return updated;
  }

  addSkill(skillName) {
    const profile = this.getProfile();
    const clean = skillName.trim();
    if (clean && !profile.skills.some(s => s.toLowerCase() === clean.toLowerCase())) {
      profile.skills.push(clean);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }
    return profile.skills;
  }

  removeSkill(skillName) {
    const profile = this.getProfile();
    profile.skills = profile.skills.filter(s => s.toLowerCase() !== skillName.toLowerCase());
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    return profile.skills;
  }

  // Role & Theme
  getRole() {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'candidate';
  }

  setRole(role) {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }

  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  // Reset to default
  resetData() {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(initialJobs));
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(["job-1"]));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(initialApplications));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(initialProfile));
  }
}

export const storage = new StorageService();

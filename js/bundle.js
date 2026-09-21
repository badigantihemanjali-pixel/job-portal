/**
 * TalentFlow - Standalone Application Bundle
 * Allows index.html to run directly via file:// protocol without local HTTP server CORS restrictions
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATA & SEED STATE
  // ==========================================
  const initialJobs = [
    {
      id: "job-1",
      title: "Senior Frontend Engineer",
      company: "Linear",
      companyLogoBg: "#5e6ad2",
      logoLetter: "L",
      location: "Remote (US/EU)",
      type: "Full-time",
      experience: "Senior",
      salary: "$140,000 - $180,000",
      salaryMin: 140000,
      category: "Engineering",
      postedDate: "2026-09-18T10:00:00Z",
      tags: ["JavaScript", "TypeScript", "React", "CSS3", "Performance"],
      isRemote: true,
      isFeatured: true,
      recruiterId: "recruiter-1",
      description: "Linear is seeking a Senior Frontend Engineer to craft exceptionally fast, polished, and delightful user interfaces. You will build core workflow experiences used by thousands of engineering teams worldwide.",
      responsibilities: [
        "Architect and implement high-performance, real-time reactive web components.",
        "Collaborate closely with product designers to maintain keyboard-first micro-interactions.",
        "Optimize web bundle sizes, rendering cycles, and virtualized data tables for instant responses.",
        "Write clean, self-documenting code with comprehensive automated tests."
      ],
      requirements: [
        "5+ years of production experience building high-traffic web applications with JavaScript/TypeScript.",
        "Deep understanding of the DOM, browser rendering performance, modern CSS3 layout systems, and Web APIs.",
        "Strong aesthetic judgment and obsession with typography, animations, and UI polish.",
        "Experience with client-side synchronization and optimistic UI updates is a plus."
      ],
      benefits: [
        "Competitive salary and meaningful equity package.",
        "Flexible remote-first culture with home office stipend.",
        "Comprehensive premium medical, dental, and vision insurance.",
        "Unlimited paid time off (minimum 4 weeks recommended)."
      ]
    },
    {
      id: "job-2",
      title: "Full Stack Developer",
      company: "Stripe",
      companyLogoBg: "#635bff",
      logoLetter: "S",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      experience: "Mid",
      salary: "$130,000 - $165,000",
      salaryMin: 130000,
      category: "Engineering",
      postedDate: "2026-09-19T14:30:00Z",
      tags: ["HTML5", "JavaScript", "Node.js", "APIs", "PostgreSQL"],
      isRemote: false,
      isFeatured: true,
      recruiterId: "recruiter-2",
      description: "Join the Developer Experience team at Stripe to build developer tools, portal dashboards, and integration flows that power modern internet commerce.",
      responsibilities: [
        "Develop secure, scalable customer dashboard interfaces and backend microservices.",
        "Design resilient REST and GraphQL APIs for transaction telemetry.",
        "Improve testing automation and CI/CD pipelines.",
        "Work across engineering teams to standardize UI components."
      ],
      requirements: [
        "3+ years of professional full-stack development experience.",
        "Proficiency with modern JavaScript (ES6+), HTML5 semantic markup, and server-side runtimes.",
        "Experience with relational databases (PostgreSQL/MySQL) and caching mechanisms.",
        "Strong debugging abilities across browser network inspect tools and server logs."
      ],
      benefits: [
        "Generous 401(k) company match up to 6%.",
        "Daily gourmet meals on campus and commuter benefits.",
        "Annual $2,500 learning and development budget.",
        "Parental leave up to 16 weeks fully paid."
      ]
    },
    {
      id: "job-3",
      title: "UI/UX Product Designer",
      company: "Figma",
      companyLogoBg: "#f24e1e",
      logoLetter: "F",
      location: "Remote",
      type: "Full-time",
      experience: "Senior",
      salary: "$135,000 - $175,000",
      salaryMin: 135000,
      category: "Design",
      postedDate: "2026-09-15T09:15:00Z",
      tags: ["Figma", "Design Systems", "Prototyping", "UX Research", "HTML/CSS"],
      isRemote: true,
      isFeatured: true,
      recruiterId: "recruiter-1",
      description: "Figma is looking for an experienced UI/UX Product Designer to reimagine collaborative canvas tools and shape our design system for millions of creators.",
      responsibilities: [
        "Lead end-to-end design initiatives from user discovery through high-fidelity prototypes and final specs.",
        "Maintain and evolve multi-platform design tokens and reusable UI component libraries.",
        "Conduct qualitative usability testing sessions and distill behavioral feedback.",
        "Partner with frontend engineers to ensure pixel-perfect CSS execution."
      ],
      requirements: [
        "4+ years designing complex desktop or browser web applications.",
        "Exceptional portfolio demonstrating interaction design, visual finesse, and problem solving.",
        "Familiarity with HTML5, CSS layout principles (Flexbox, Grid), and front-end constraints.",
        "Clear communication skills with cross-functional product stakeholders."
      ],
      benefits: [
        "Equity grant in a fast-growing industry leader.",
        "Top-tier health coverage with $0 deductible option.",
        "Annual wellness stipend and wellness days off.",
        "Global offsites and design conferences sponsorship."
      ]
    },
    {
      id: "job-4",
      title: "Junior Web Developer",
      company: "Vercel",
      companyLogoBg: "#000000",
      logoLetter: "V",
      location: "Austin, TX (Remote Optional)",
      type: "Full-time",
      experience: "Entry",
      salary: "$75,000 - $95,000",
      salaryMin: 75000,
      category: "Engineering",
      postedDate: "2026-09-20T11:00:00Z",
      tags: ["HTML5", "CSS3", "JavaScript", "Git", "Responsive"],
      isRemote: true,
      isFeatured: false,
      recruiterId: "recruiter-2",
      description: "Kickstart your career at Vercel! We are seeking an ambitious Junior Web Developer to join our marketing and documentation engineering team, creating accessible, lightning-fast web pages.",
      responsibilities: [
        "Build responsive landing pages and interactive documentation examples.",
        "Ensure web accessibility compliance (WCAG 2.1 AA standards) and cross-browser stability.",
        "Collaborate with senior engineers through code reviews and pair programming sessions.",
        "Optimize core web vitals and mobile responsiveness."
      ],
      requirements: [
        "Solid fundamentals in semantic HTML5, modern CSS3 (Flexbox/Grid), and vanilla JavaScript.",
        "Understanding of Git version control, branching, and pull requests.",
        "Demonstrated portfolio of personal projects, web experiments, or open-source contributions.",
        "Strong eagerness to learn, ask thoughtful questions, and iterate rapidly."
      ],
      benefits: [
        "Structured mentorship from principal engineers.",
        "Full hardware kit (MacBook Pro + 4K monitor setup).",
        "Comprehensive medical insurance from day one.",
        "Flexible working schedule."
      ]
    },
    {
      id: "job-5",
      title: "Lead Cloud & DevOps Engineer",
      company: "Airbnb",
      companyLogoBg: "#ff5a5f",
      logoLetter: "A",
      location: "Seattle, WA",
      type: "Full-time",
      experience: "Lead",
      salary: "$180,000 - $225,000",
      salaryMin: 180000,
      category: "Engineering",
      postedDate: "2026-09-12T08:00:00Z",
      tags: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
      isRemote: false,
      isFeatured: false,
      recruiterId: "recruiter-1",
      description: "Airbnb is hiring a Lead Cloud & DevOps Engineer to oversee resilient global infrastructure serving hundreds of millions of travelers and hosts.",
      responsibilities: [
        "Direct cloud architecture on AWS using Infrastructure as Code (Terraform).",
        "Scale Kubernetes multi-cluster configurations and zero-downtime deployment pipelines.",
        "Drive site reliability engineering (SRE) practices, SLOs, and incident response management.",
        "Mentor mid-level engineers in security best practices and cost optimization."
      ],
      requirements: [
        "7+ years in DevOps, SRE, or Cloud Infrastructure roles.",
        "Proven track record managing large-scale Kubernetes clusters in production.",
        "Expert knowledge of networking, IAM, cloud security, and distributed tracing.",
        "Strong scripting abilities with Bash, Python, or Go."
      ],
      benefits: [
        "Annual $2,000 travel credit to use on Airbnb stays worldwide.",
        "Top-tier compensation and equity grants.",
        "Comprehensive health and retirement plans.",
        "Sabbatical program after 5 years."
      ]
    },
    {
      id: "job-6",
      title: "Technical Content & Product Writer",
      company: "Notion",
      companyLogoBg: "#2e2e2e",
      logoLetter: "N",
      location: "New York, NY (Hybrid)",
      type: "Contract",
      experience: "Mid",
      salary: "$50 - $70 / hr",
      salaryMin: 100000,
      category: "Marketing",
      postedDate: "2026-09-17T16:20:00Z",
      tags: ["Technical Writing", "API Docs", "Developer Guides", "Markdown"],
      isRemote: true,
      isFeatured: false,
      recruiterId: "recruiter-2",
      description: "Write clear, inspiring technical tutorials, API guides, and workflow documentation for Notion's developer ecosystem and enterprise power users.",
      responsibilities: [
        "Produce comprehensive guides, API reference docs, and sample recipes.",
        "Translate complex engineering features into user-friendly documentation.",
        "Work with product managers and engineers to document beta releases.",
        "Maintain developer changelog and documentation feedback loop."
      ],
      requirements: [
        "3+ years experience in technical writing, product documentation, or developer advocacy.",
        "Ability to read and test code snippets in JavaScript, JSON, and cURL.",
        "Exceptional written English with a warm, structured, engaging voice.",
        "Portfolio of published documentation or technical tutorials."
      ],
      benefits: [
        "Flexible contract hours with predictable weekly retainer.",
        "Free Notion Enterprise and Notion AI access.",
        "Collaborative, design-centric team culture."
      ]
    },
    {
      id: "job-7",
      title: "Frontend Engineering Intern",
      company: "GitHub",
      companyLogoBg: "#24292e",
      logoLetter: "G",
      location: "Remote (Global)",
      type: "Internship",
      experience: "Entry",
      salary: "$40 - $48 / hr",
      salaryMin: 65000,
      category: "Engineering",
      postedDate: "2026-09-20T17:00:00Z",
      tags: ["HTML", "CSS", "JavaScript", "Web Accessibility", "Git"],
      isRemote: true,
      isFeatured: false,
      recruiterId: "recruiter-1",
      description: "Join GitHub's 12-week Summer Internship program! You will work directly with our core engineering teams on real pull requests that ship to 100M+ developers.",
      responsibilities: [
        "Build accessible web components complying with Primer Design System.",
        "Fix bugs, write unit tests, and participate in code reviews.",
        "Present your final project to engineering leaders at demo day.",
        "Attend weekly tech talks and career growth workshops."
      ],
      requirements: [
        "Currently pursuing a degree in Computer Science, Bootcamp graduate, or self-taught web developer.",
        "Solid knowledge of HTML5, CSS3, and modern JavaScript fundamentals.",
        "Experience with Git and GitHub workflows (forking, pull requests, issues).",
        "Passionate about developer tools and open-source software."
      ],
      benefits: [
        "Competitive hourly pay + housing/remote stipend.",
        "1-on-1 dedicated senior engineer mentor.",
        "Fast-track consideration for full-time graduate offers."
      ]
    },
    {
      id: "job-8",
      title: "Product Marketing Specialist",
      company: "Canva",
      companyLogoBg: "#00c4cc",
      logoLetter: "C",
      location: "Austin, TX",
      type: "Full-time",
      experience: "Mid",
      salary: "$110,000 - $135,000",
      salaryMin: 110000,
      category: "Marketing",
      postedDate: "2026-09-16T12:00:00Z",
      tags: ["Product Marketing", "Go-To-Market", "Analytics", "Campaigns"],
      isRemote: false,
      isFeatured: false,
      recruiterId: "recruiter-2",
      description: "Drive adoption of Canva's visual suite among enterprise teams. You will craft go-to-market strategies, sales collateral, and growth campaigns.",
      responsibilities: [
        "Execute high-impact launch campaigns for new enterprise visual collaboration tools.",
        "Create product collateral: one-pagers, case studies, pitch decks, and email flows.",
        "Analyze campaign metrics and user funnel conversion rates.",
        "Partner with product teams to align messaging with customer pain points."
      ],
      requirements: [
        "3+ years in B2B SaaS product marketing.",
        "Strong analytical skills with Google Analytics or Mixpanel.",
        "Outstanding presentation and copywriting abilities.",
        "Experience executing multi-channel digital campaigns."
      ],
      benefits: [
        "Comprehensive medical, dental, and vision packages.",
        "Generous gym and fitness wellness subsidy.",
        "Hybrid work model with catered meals on office days."
      ]
    }
  ];

  const initialProfile = {
    name: "Alex Morgan",
    headline: "Frontend & Full Stack Developer | HTML5 • CSS3 • JavaScript",
    email: "alex.morgan.dev@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    bio: "Passionate web developer with 3+ years crafting high-performance, accessible, and responsive user interfaces. Enthusiast of clean semantic code, modular design systems, and delightful digital user experiences.",
    avatarLetter: "AM",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Responsive Design",
      "REST APIs",
      "Git & GitHub",
      "UI/UX Design",
      "Web Performance"
    ],
    resumeFileName: "Alex_Morgan_Resume_2026.pdf"
  };

  const initialApplications = [
    {
      id: "app-101",
      jobId: "job-2",
      jobTitle: "Full Stack Developer",
      company: "Stripe",
      appliedDate: "2026-09-20T10:15:00Z",
      status: "Under Review",
      candidateName: "Alex Morgan",
      candidateEmail: "alex.morgan.dev@example.com",
      candidatePhone: "+1 (555) 234-5678",
      resumeName: "Alex_Morgan_Resume_2026.pdf",
      coverLetter: "I have been following Stripe's developer tooling for years. My background building responsive dashboards and robust API integrations makes me an excellent fit for this role."
    }
  ];

  // ==========================================
  // 2. STORAGE LAYER
  // ==========================================
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
      this.removeSavedJob(id);
      return true;
    }

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

    resetData() {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(initialJobs));
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(["job-1"]));
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(initialApplications));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(initialProfile));
    }
  }

  const storage = new StorageService();

  // ==========================================
  // 3. UI UTILITIES
  // ==========================================
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatRelativeDate(isoString) {
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

  function showToast(message, type = 'info') {
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

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateSavedBadgeCount() {
    const count = storage.getSavedJobIds().length;
    const badge = document.getElementById('saved-count-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  function renderJobCard(job, options = {}) {
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

  // ==========================================
  // 4. VIEW CONTROLLERS
  // ==========================================

  // --- JOBS VIEW ---
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

      document.querySelectorAll('input[name="filter-job-type"]').forEach(cb => {
        cb.addEventListener('change', () => {
          this.filters.types = Array.from(document.querySelectorAll('input[name="filter-job-type"]:checked')).map(el => el.value);
          this.render();
        });
      });

      document.querySelectorAll('input[name="filter-experience"]').forEach(cb => {
        cb.addEventListener('change', () => {
          this.filters.experience = Array.from(document.querySelectorAll('input[name="filter-experience"]:checked')).map(el => el.value);
          this.render();
        });
      });

      const remoteOnlyCb = document.getElementById('filter-remote-only');
      if (remoteOnlyCb) {
        remoteOnlyCb.addEventListener('change', (e) => {
          this.filters.remoteOnly = e.target.checked;
          this.render();
        });
      }

      const sortSelect = document.getElementById('jobs-sort-select');
      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
          this.filters.sortBy = e.target.value;
          this.render();
        });
      }

      const clearFiltersBtn = document.getElementById('clear-filters-btn');
      if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
          this.resetFilters();
        });
      }

      const jobsList = document.getElementById('jobs-list');
      if (jobsList) {
        jobsList.addEventListener('click', (e) => {
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
            showToast(isSaved ? 'Job saved to bookmarks!' : 'Job removed from saved list.', 'info');
            return;
          }

          const detailsBtn = e.target.closest('.view-job-details-btn');
          const titleClick = e.target.closest('.job-card-title');
          if (detailsBtn || titleClick) {
            const jobId = (detailsBtn || titleClick).dataset.jobId;
            this.openJobDetailModal(jobId);
            return;
          }

          const applyBtn = e.target.closest('.apply-job-btn');
          if (applyBtn && !applyBtn.disabled) {
            const jobId = applyBtn.dataset.jobId;
            this.openApplicationModal(jobId);
            return;
          }
        });
      }

      const modalDetailApplyBtn = document.getElementById('detail-modal-apply-btn');
      if (modalDetailApplyBtn) {
        modalDetailApplyBtn.addEventListener('click', () => {
          const jobId = modalDetailApplyBtn.dataset.jobId;
          closeModal('job-detail-modal');
          this.openApplicationModal(jobId);
        });
      }

      const appForm = document.getElementById('application-form');
      if (appForm) {
        appForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleApplicationSubmit();
        });
      }

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

      if (this.filters.location) {
        const loc = this.filters.location;
        jobs = jobs.filter(job => job.location.toLowerCase().includes(loc));
      }

      if (this.filters.remoteOnly) {
        jobs = jobs.filter(job => job.isRemote);
      }

      if (this.filters.types.length > 0) {
        jobs = jobs.filter(job => this.filters.types.includes(job.type));
      }

      if (this.filters.experience.length > 0) {
        jobs = jobs.filter(job => this.filters.experience.includes(job.experience));
      }

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

      storage.submitApplication({
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

      this.render();
      if (profileViewInstance) profileViewInstance.renderAppliedJobs();
      if (recruiterViewInstance) recruiterViewInstance.render();
    }
  }

  // --- SAVED VIEW ---
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
        const unsaveBtn = e.target.closest('.unsave-job-btn') || e.target.closest('.bookmark-btn');
        if (unsaveBtn) {
          e.stopPropagation();
          const jobId = unsaveBtn.dataset.jobId;
          storage.removeSavedJob(jobId);
          updateSavedBadgeCount();
          showToast('Removed from saved jobs', 'info');
          this.render();
          jobsViewInstance.render();
          return;
        }

        const detailsBtn = e.target.closest('.view-job-details-btn') || e.target.closest('.job-card-title');
        if (detailsBtn) {
          const jobId = detailsBtn.dataset.jobId;
          jobsViewInstance.openJobDetailModal(jobId);
          return;
        }

        const applyBtn = e.target.closest('.apply-job-btn');
        if (applyBtn && !applyBtn.disabled) {
          const jobId = applyBtn.dataset.jobId;
          jobsViewInstance.openApplicationModal(jobId);
          return;
        }
      });
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

  // --- PROFILE VIEW ---
  class ProfileView {
    constructor() {}

    init() {
      this.bindEvents();
      this.render();
    }

    bindEvents() {
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

  // --- RECRUITER VIEW ---
  class RecruiterView {
    constructor() {
      this.selectedJobForApplicants = null;
    }

    init() {
      this.bindEvents();
      this.render();
    }

    bindEvents() {
      const openPostJobModalBtn = document.getElementById('open-post-job-btn');
      if (openPostJobModalBtn) {
        openPostJobModalBtn.addEventListener('click', () => {
          openModal('post-job-modal');
        });
      }

      const postJobForm = document.getElementById('post-job-form');
      if (postJobForm) {
        postJobForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handlePostJobSubmit();
        });
      }

      const postingsTableBody = document.getElementById('recruiter-postings-body');
      if (postingsTableBody) {
        postingsTableBody.addEventListener('click', (e) => {
          const viewAppsBtn = e.target.closest('.view-applicants-btn');
          if (viewAppsBtn) {
            const jobId = viewAppsBtn.dataset.jobId;
            this.openApplicantsModal(jobId);
            return;
          }

          const deleteBtn = e.target.closest('.delete-job-btn');
          if (deleteBtn) {
            const jobId = deleteBtn.dataset.jobId;
            const job = storage.getJobById(jobId);
            const confirmDelete = window.confirm(`Are you sure you want to delete "${job ? job.title : 'this job'}"? This action cannot be undone.`);
            if (confirmDelete) {
              storage.deleteJob(jobId);
              this.render();
              jobsViewInstance.render();
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

      const salaryMatch = salary.match(/\$?(\d+)[,\d]*/);
      const salaryMin = salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, ''), 10) : 80000;

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

      document.getElementById('post-job-form').reset();
      closeModal('post-job-modal');

      this.render();
      jobsViewInstance.render();
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

  // ==========================================
  // 5. APPLICATION ORCHESTRATOR
  // ==========================================
  let jobsViewInstance;
  let savedViewInstance;
  let profileViewInstance;
  let recruiterViewInstance;

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

      jobsViewInstance = new JobsView();
      savedViewInstance = new SavedView();
      profileViewInstance = new ProfileView();
      recruiterViewInstance = new RecruiterView();

      jobsViewInstance.init();
      savedViewInstance.init();
      profileViewInstance.init();
      recruiterViewInstance.init();

      updateSavedBadgeCount();

      window.resetPortalData = () => {
        storage.resetData();
        window.location.reload();
      };

      console.log('🚀 TalentFlow Job Portal initialized successfully.');
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
      document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
      });

      const targetSection = document.getElementById(viewId);
      if (targetSection) {
        targetSection.classList.add('active');
        this.currentView = viewId;
      }

      document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === viewId);
      });

      if (viewId === 'jobs-view') {
        jobsViewInstance.render();
      } else if (viewId === 'saved-view') {
        savedViewInstance.render();
      } else if (viewId === 'profile-view') {
        profileViewInstance.render();
      } else if (viewId === 'recruiter-view') {
        recruiterViewInstance.render();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    bindModals() {
      document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const modal = btn.closest('.modal-backdrop');
          if (modal) {
            closeModal(modal.id);
          }
        });
      });

      document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeModal(modal.id);
          }
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
            closeModal(modal.id);
          });
        }
      });
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const app = new App();
      app.init();
    });
  } else {
    const app = new App();
    app.init();
  }

})();

// Initial Mock Seed Data for Job Portal

export const initialJobs = [
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

export const initialProfile = {
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

export const initialApplications = [
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

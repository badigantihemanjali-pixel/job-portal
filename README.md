# TalentFlow — Modern Job Portal

> A responsive, feature-rich Job Portal web application built with **HTML5, CSS3, and modern JavaScript (ES6+)**.

---

## 🌟 Overview & Features

TalentFlow demonstrates full candidate and recruiter workflows with persistent state (`localStorage`), modular component architecture, and a modern responsive interface.

### 1. Job Listings with Search & Filtering
- **Real-time Keyword Search**: Search across job titles, company names, descriptions, and tech stacks.
- **Multi-faceted Filtering**:
  - Filter by **Job Type** (Full-time, Contract, Internship, Part-time).
  - Filter by **Experience Level** (Entry, Mid, Senior, Lead).
  - One-click **Remote Only** toggle.
  - Quick-filter chips for popular searches (JavaScript, Frontend, DevOps, etc.).
- **Sorting**: Sort by Most Recent, Highest Salary, and Lowest Salary.
- **Interactive Job Cards**: Display company logo, badges, meta items, excerpt, bookmark toggle, and quick apply buttons.

### 2. Detailed Job View Modal
- Deep dive into any listing with a single click.
- Comprehensive breakdown of:
  - Job description & company overview.
  - Bulleted key responsibilities.
  - Role qualifications and requirements.
  - Company benefits and perks.
- Direct "Apply for this Role" trigger from within the modal.

### 3. Application Forms & Workflow
- Interactive apply modal with input validation (Full Name, Email, Phone, Cover Note).
- Simulated **drag-and-drop resume upload** zone supporting `.pdf` and `.docx`.
- Auto-populates candidate's contact information from their profile.
- Immediate feedback via toast notifications and updates the card state to "Applied".

### 4. Saved-Jobs (Bookmarking)
- Bookmark any job with a single click from any view.
- Real-time navigation badge count (`Saved (N)`).
- Dedicated **Saved Jobs** tab with easy un-saving and direct application triggers.
- Empty-state helper guiding candidates to browse jobs if nothing is saved.

### 5. Candidate Profile & Career Hub
- **Editable Profile**: Customize Name, Professional Headline, Email, Phone, Location, and Bio.
- **Skills Tag Manager**: Add new skills (Enter key or button) and remove existing tags with one click.
- **Default Resume Manager**: Keep a default resume on file with instant replacement upload.
- **Application Tracker**: View submitted applications with timestamp, attached resume, and status indicators (*Applied*, *Under Review*, *Interview*, *Offered*).

### 6. Recruiter Portal & Dashboard
- **Role Switching**: Switch between *Candidate Mode* and *Recruiter Mode* anytime in the top navigation.
- **Key Metrics Overview**: Real-time stats for Total Jobs Posted, Total Applications Received, and Active Listings.
- **Post a New Job**: Modal form with comprehensive validation (Title, Company, Location, Type, Experience, Salary, Remote flag, Description, Responsibilities, Requirements).
- **Postings Management**: Data table to review all active postings, view applicants, and delete listings.
- **Candidate Applicant Screening**: Open the applicant list for any listing to review candidate details, contact info, resume name, and personal cover notes.

### 7. Modern UI / UX Architecture
- **CSS Variables & Design Tokens**: Strict color palette, elevation shadows, typography scales, and radii.
- **Dark Mode / Light Mode**: One-click theme toggle stored in `localStorage`.
- **Zero-Dependency Architecture**: Runs completely client-side in any modern browser without npm packages or compilation steps.

---

## 📁 Project Structure

```
job-portal/
├── index.html              # Single Page Application shell & all accessible modals
├── css/
│   ├── variables.css       # Design tokens, color system, and dark mode tokens
│   ├── style.css           # Base reset, layout, navigation bar, hero search
│   ├── components.css      # Cards, filter sidebar, modal popups, badges, forms, toast
│   └── dashboard.css       # Recruiter metrics, data table, and profile styles
├── js/
│   ├── data.js             # Initial mock data (seed jobs, sample profile, applications)
│   ├── storage.js          # LocalStorage persistence wrapper
│   ├── ui.js               # Toast notifications, modal controls, and card renderers
│   ├── views/
│   │   ├── jobsView.js     # Search, filter, listing & details modal controller
│   │   ├── savedView.js    # Saved jobs management controller
│   │   ├── profileView.js  # Candidate profile, skills manager & application tracker
│   │   └── recruiterView.js# Recruiter dashboard, posting creator & applicant viewer
│   └── app.js              # Application entry point, router & event bindings
└── README.md               # Project documentation and guide
```

---

## 🚀 How to Run Locally

Because the project uses standard ES6 modules (`<script type="module">`), it is best served over a local HTTP server:

### Option 1: Using Python (Built-in)
```bash
# In the job-portal directory:
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Option 2: Using Node.js `npx serve`
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🔄 Resetting Demo Data
To restore the mock database to its default factory state, you can click **"Reset Demo Data"** in the footer or run in your browser console:
```javascript
window.resetPortalData();
```

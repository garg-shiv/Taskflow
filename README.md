# 🌟 TaskFlow

**Live Demo:** https://garg‑shiv.github.io/Taskflow/

TaskFlow is a **personal productivity companion** built with plain HTML, CSS, and JavaScript. It helps users manage tasks across three stages (**Todo**, **Completed**, **Archived**) using a clean, responsive interface, persistent storage, and thoughtful UX.

---

## 📌 Table of Contents

1. [Overview & Motivation](#overview--motivation)  
2. [Core Features](#core-features)  
3. [Tech Overview & Architecture](#tech-overview--architecture)  
4. [Development Setup](#development-setup)  
5. [User Guide](#user-guide)  
6. [UX & Design Decisions](#ux--design-decisions)  
7. [Data Persistence & Flow](#data-persistence--flow)  
8. [Form & Age Validation](#form--age-validation)  
9. [Responsive Design](#responsive-design)  
10. [Project Structure](#project-structure)  
11. [Possible Future Enhancements](#possible-future-enhancements)  
12. [License & Contribution](#license--contribution)

---

## Overview & Motivation

TaskFlow exists to simplify task organization without the complexity of modern frameworks or bloated libraries. Its purpose:

- ✨ Maintain a **minimalist UI**
- 🛠️ Support **essential features**: creation, movement, archiving
- 🔒 Stay lightweight with **no external dependencies**
- 🚀 Offer **smooth UX/UI** with animations, feedback, and drag & drop

---

## Core Features

- Age-gated landing page ensures users are **over 10 years old**
- Local storage for user info and tasks
- Integration with **DummyJSON API** for initial task population
- Dynamic avatar generation via **UI Avatars API**
- Drag-and-drop and stage-based task transitions
- Timestamps reflecting **last modification**
- Responsive design with **1–3 column layouts**
- **Toast notifications** for all user actions
- Sticky, blurred navbar for smooth navigation

---

## Tech Overview & Architecture

- **Frontend**: HTML5, CSS3, Vanilla JavaScript  
- **No build tools**—just static assets, easy to host via GitHub Pages  
- **State**: stored entirely in `localStorage`  
- **APIs**:
  - `https://dummyjson.com/todos` for dummy tasks  
  - `https://ui-avatars.com/api/?name=…` for dynamic avatars  
- **UX**: toast alerts, hover card lifts, backdrop-filter navbars

---

## Development Setup

1. Clone the repo:  
   ```bash
   git clone https://github.com/garg‑shiv/Taskflow.git
   cd Taskflow
(Optional) Serve locally using any static server:

bash
Copy
Edit
npx http-server
Browse to index.html or app.html to test or use the app

User Guide
Landing Page (index.html)
Enter Name and DOB

DOB must make the age ≥ 10

Error messages guide corrections

Once valid, user data is saved and redirects to the Dashboard

Dashboard (app.html)
Navbar displays the user’s avatar and name, with a “Sign Out” button

Add a task via input → Add button

Three columns: Todo, Completed, Archived (with counts)

Buttons vary by stage:

Todo: Complete, Archive

Completed: Move to Todo, Archive

Archived: Move to Todo, Move to Completed

Timestamps update dynamically when moving tasks

Drag-and-drop tasks to reorder or change stages

Click Sign Out to clear local data and go back to landing

UX & Design Decisions
Backdrop-filter navbar—subtle blur and sticky layout for better focus

Elevated cards with subtle shadow promotion

Toast alerts provide feedback: "Task added", "Task moved", etc.

Responsive design with flexible gaps and column layouts

Accessible elements: focus states, aria-labels, proper semantics

Data Persistence & Flow
Tasks stored in localStorage under tasks

Structure per task:

js
Copy
Edit
{
  id: 'uuid',
  text: '…',
  stage: 'todo|completed|archived',
  modified: 'ISO timestamp'
}
On first load, 10 dummy tasks are pulled via the DummyJSON API, transformed, and saved

Every action keeps storage in sync

Form & Age Validation
The DOB picker is capped to 10 years back via JavaScript

Input validation runs inline before storing user data

Error feedback is immediate and human-readable

Responsive Design
1-column layout for screen < 600px

2-columns when 601–900px

3-columns for ≥ 901px

Touch-friendly tap targets, fluid spacing, and mobile-first design

Project Structure
pgsql
Copy
Edit
/
├── index.html         ← Landing with age/name collection
├── app.html           ← Main dashboard interface
├── style.css          ← Global style, responsive and animated UX
└── script.js          ← Logic for validation, API, drag/drop, storage
Note: No build or transpilation steps—fully static for easy deployment.

Possible Future Enhancements
🔍 Task search and filtering

🗂️ Priorities, tags, or color categories

📦 Export/import JSON for backups

🌙 Optional dark mode toggle

⏰ Reminder notifications for deadlines

🔲 Unit tests and CI

License & Contribution
Licensed under MIT. Contributions are welcome:

Fork repo

Create feature branch: git checkout -b feature-name

Implement and test features

Commit and push changes

Submit a pull request


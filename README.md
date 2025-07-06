
# 🌟 TaskFlow

**Live Demo:** [https://garg‑shiv.github.io/Taskflow/](https://garg‑shiv.github.io/Taskflow/)

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
   ```
2. (Optional) Serve locally using any static server:
   ```bash
   npx http-server
   ```
   Browse to `index.html` or `app.html` to test or use the app

---

## User Guide

### Landing Page (`index.html`)

- Enter Name and DOB (age must be ≥ 10)
- Error messages guide corrections
- Once valid, user data is saved and redirects to the Dashboard

### Dashboard (`app.html`)

- Navbar shows user avatar, name, and a “Sign Out” button
- Add task via input → Add button
- Three columns: Todo, Completed, Archived (with counts)

#### Stage Buttons

- **Todo**: Complete, Archive  
- **Completed**: Move to Todo, Archive  
- **Archived**: Move to Todo, Move to Completed  

- Timestamps auto-update on task movement
- Drag-and-drop for reordering or moving between stages
- Sign Out clears local data and returns to landing

---

## UX & Design Decisions

- Backdrop-filter navbar with blur and sticky layout
- Elevated cards with subtle shadows
- Toast alerts for feedback like "Task added", "Task moved"
- Responsive layout with flexible gaps and column logic
- Accessibility: focus states, ARIA labels, proper HTML semantics

---

## Data Persistence & Flow

- Tasks are stored in `localStorage` under key `tasks`
- Each task structure:
  ```json
  {
    "id": "uuid",
    "text": "…",
    "stage": "todo|completed|archived",
    "modified": "ISO timestamp"
  }
  ```
- On first load, 10 dummy tasks fetched from DummyJSON API and saved
- All changes keep localStorage in sync

---

## Form & Age Validation

- DOB picker limited to ensure age ≥ 10 using JavaScript
- Inline validation before saving
- Immediate and readable error feedback

---

## Responsive Design

- 1-column layout for width < 600px  
- 2-columns for 601–900px  
- 3-columns for ≥ 901px  
- Touch-friendly UI, fluid spacing, mobile-first design

---

## Project Structure

```
/
├── index.html         ← Landing with age/name collection
├── app.html           ← Main dashboard interface
├── style.css          ← Global styles, responsive & animated UX
└── script.js          ← Logic for validation, API, drag/drop, storage
```

> Note: Fully static—no build/transpilation steps. Ready to deploy.

---

## Possible Future Enhancements

- 🔍 Task search and filtering  
- 🗂️ Priorities, tags, or color categories  
- 📦 Export/import JSON for backups  
- 🌙 Optional dark mode toggle  
- ⏰ Reminder notifications for deadlines  
- 🔲 Unit tests and CI integration  

---

## License & Contribution

Licensed under **MIT**. Contributions welcome:

1. Fork the repo  
2. Create a feature branch: `git checkout -b feature-name`  
3. Implement & test the feature  
4. Commit and push changes  
5. Submit a pull request  

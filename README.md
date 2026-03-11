# 🏥 Elysian Skin Clinic  
## Integrated Treatment Plan & Appointment Management System

**Capstone Project II**

A web-based clinic management system designed to support clinic operations including patient management, appointment scheduling, treatment plans, service management, and operational reporting.

The system aims to digitize clinic workflows and improve operational efficiency, data accuracy, and patient experience.

---

## 🚀 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | Next.js |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Design | Figma |
| Version Control | Git + GitHub |

---

## 👥 Team Members

| Name | Role |
|-----|------|
| **Thu Dương (Leader)** | Product Manager, Frontend Developer, Database Engineer |
| **Ngọc Anh** | Full-stack Developer |
| **Tùng Lâm** | Business Analyst, Frontend Developer, UX/UI Designer |
| **Kiều Trâm** | Frontend Developer, UX/UI Designer, Tester |
| **Bích Ngọc** | QA Engineer, System Architecture, Frontend Developer |

---

## ⚙️ Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/clinic-management-system.git
2. Install Dependencies
npm install
3. Run Development Server
npm run dev

The application will run at:

http://localhost:3000
📂 Project Structure
clinic-management-system
│
├── frontend        # Next.js application (UI)
├── backend         # Node.js + Express API
├── database        # SQL schema and migrations
├── docs            # BRD, diagrams, architecture
│
├── .gitignore
└── README.md
Folder Explanation

frontend
User interface and client-side logic built using Next.js.

backend
REST API and business logic built using Node.js and Express.

database
Database schema, SQL scripts, and migration files.

docs
Project documentation including BRD, architecture diagrams, and design artifacts.

📌 Core Features

Patient Management

Appointment Scheduling

Treatment Plan Management

Service Catalog

Clinic Operation Management

🌿 System Modules (UI Structure)
Public Website

Homepage

About Us

Service List

Service Detail

Contact Page

Booking Flow

Booking Step 1

Booking Step 2

Booking Step 3

Authentication

Sign-in

Sign-up

Customer Portal

Customer Dashboard

Appointment Tracking

Specialist Portal

Specialist Dashboard

Appointment Calendar

Customer List

Treatment Plan Management

Clinic Admin Portal

Admin Dashboard

Customer Management

Service Catalog Management

Reports and Analytics

🌳 Branching Strategy

This project follows a feature-based branching strategy.

Main Branch
main

Rules:

Always stable and runnable

Used for demo and integration

Avoid direct commits unless necessary

Feature Branch

Used for implementing new features.

feature/<feature-name>

Examples:

feature/homepage-ui
feature/service-list-ui
feature/booking-flow-ui
feature/customer-dashboard-ui
feature/specialist-treatment-plan-ui
feature/admin-service-catalog-ui
Fix Branch

Used for bug fixes.

fix/<bug-name>

Examples:

fix/login-error
fix/booking-validation
fix/customer-form-bug
🔄 Development Workflow
1. Create new branch
git checkout -b feature/<feature-name>

Example:

git checkout -b feature/booking-form-ui
2. Implement feature

Commit changes with clear messages.

git commit -m "Add booking form UI"
3. Push branch
git push origin feature/<feature-name>
4. Create Pull Request

Submit a Pull Request for review before merging into main.

5. Code Review

At least one team member reviews the code before merging.

6. Merge to Main

After approval, merge the branch into main.

⚠️ Development Rules

Do not commit directly to main

Always create a feature branch

Commit small changes frequently

Write meaningful commit messages

Do not commit sensitive files such as .env

Ensure the system runs successfully before merging

📖 Project Context

This system is developed as part of Capstone Project II.

The project focuses on applying software engineering practices including:

system design

version control

collaborative development

iterative implementation

documentation and testing

to build a real-world clinic management system.

📄 License

Academic project for educational purposes.


---

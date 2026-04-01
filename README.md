# PeopleFlow 🏢

A full-stack **Human Capital Management (HCM) & Financial Management** web application built for IT companies. Manage employees, run payroll with historical tracking, and recruit talent — all with role-based access control.

---

## Features

| Page | Description | Access |
|---|---|---|
| **Login** | JWT-based authentication with role-based access | Public |
| **Admin Dashboard** | Company metrics — headcount, monthly payroll, open roles, department breakdown, recent payroll runs | All roles |
| **Employee Directory** | 50 employees with emoji avatars, searchable by name/role/department, expandable detail view | Admin, HR |
| **Payroll Management** | Salary table with inline editing, tax & net pay calculations, Run Payroll (creates audit history), per-employee history modal | Admin, Finance |
| **Talent Management** | Open job postings with applicant counts, Add New Job Posting form | Admin, HR |

### Role-Based Access

| Role | Dashboard | Employees | Payroll | Talent |
|---|---|---|---|---|
| `admin` | ✅ | ✅ | ✅ | ✅ |
| `hr` | ✅ | ✅ | ✗ | ✅ |
| `finance` | ✅ | ✗ | ✅ | ✗ |

---

## Tech Stack

### Frontend
- **React 18** + **Vite** — fast dev server with HMR
- **React Router v6** — client-side routing
- Plain **CSS** — custom professional styling, no UI library dependency

### Backend
- **Node.js** + **Express** — REST API
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT signing/verification (8h expiry)
- **pg** — PostgreSQL client with connection pooling

### Database
- **PostgreSQL 16** — 6 tables with full relational schema

---

## Database Schema

```
departments      employees         users
id               id                id
name             first_name        username
created_at       last_name         password_hash
                 email             role (admin|hr|finance)
                 phone             employee_id → employees
                 emoji_avatar      created_at
                 department_id → departments
                 job_title
                 hire_date
                 status

payroll                     payroll_history             job_postings
id                          id                          id
employee_id → employees     employee_id → employees     title
base_salary                 base_salary                 department_id → departments
tax_rate                    tax_rate                    description
other_deductions            tax_deduction               location
pay_period                  other_deductions            salary_range_min
last_paid_date              net_pay                     salary_range_max
status (pending|processed)  pay_period_start            status (open|closed|draft)
created_at                  pay_period_end              applicant_count
                            processed_date              created_at
                            processed_by → users        updated_at
```

---

## Project Structure

```
peopleflow3t_new/
├── docker-compose.yml          # PostgreSQL 16 service
├── .gitignore
├── backend/
│   ├── package.json
│   ├── .env.example            # Copy to .env and fill in values
│   ├── server.js               # Express entry point + DB auto-init
│   ├── db/
│   │   ├── pool.js             # pg connection pool
│   │   ├── schema.sql          # CREATE TABLE DDL for all 6 tables
│   │   └── seed.sql            # 8 depts, 50 employees, 3 users, payroll, history, jobs
│   ├── middleware/
│   │   └── auth.js             # verifyToken + requireRole middleware
│   └── routes/
│       ├── auth.js             # POST /api/auth/login|register
│       ├── dashboard.js        # GET /api/dashboard
│       ├── employees.js        # GET /api/employees, /api/employees/:id
│       ├── payroll.js          # GET|PUT /api/payroll, POST /api/payroll/run, GET /api/payroll/history/:id
│       └── jobs.js             # GET|POST /api/jobs
└── frontend/
    ├── package.json
    ├── vite.config.js          # Dev proxy: /api → localhost:5000
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx             # Routes + auth-protected layout
        ├── App.css
        ├── context/
        │   └── AuthContext.jsx  # Auth state, login/logout, authFetch helper
        ├── pages/
        │   ├── Login.jsx
        │   ├── Dashboard.jsx
        │   ├── EmployeeDirectory.jsx
        │   ├── Payroll.jsx
        │   └── TalentManagement.jsx
        └── components/
            ├── Sidebar.jsx
            ├── ProtectedRoute.jsx
            ├── SummaryCard.jsx
            └── PayrollHistoryModal.jsx
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for PostgreSQL)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/peopleflow3t_new.git
cd peopleflow3t_new
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` if needed (defaults work with the Docker Compose setup):

```env
DATABASE_URL=postgresql://peopleflow:peopleflow123@localhost:5432/peopleflow
PORT=5000
JWT_SECRET=<your-strong-random-secret>
```

### 3. Start PostgreSQL

```bash
docker-compose up -d
```

### 4. Install dependencies & start the backend

```bash
cd backend
npm install
node server.js
```

On first run, the server automatically creates all 6 database tables and seeds them with 50 employees, payroll records, job postings, and 3 user accounts.

Expected output:
```
Initializing database schema...
Schema created successfully.
Seeding database...
Database seeded successfully.
PeopleFlow API running on http://localhost:5000
```

### 5. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Demo Accounts

| Username | Password | Role | Access |
|---|---|---|---|
| `admin` | `admin123` | Admin | All pages |
| `hr_user` | `hr123` | HR | Dashboard, Employee Directory, Talent Management |
| `finance_user` | `finance123` | Finance | Dashboard, Payroll Management |

---

## API Reference

All endpoints except `/api/auth/login` require an `Authorization: Bearer <token>` header.

| Method | Path | Role Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Login, returns JWT |
| `POST` | `/api/auth/register` | admin | Create a new user account |
| `GET` | `/api/dashboard` | Any | Company metrics + recent payroll runs |
| `GET` | `/api/employees` | admin, hr | List all 50 employees |
| `GET` | `/api/employees/:id` | admin, hr | Single employee detail |
| `GET` | `/api/payroll` | admin, finance | All payroll records with computed tax/net |
| `PUT` | `/api/payroll/:id` | admin, finance | Update salary / tax rate / deductions |
| `POST` | `/api/payroll/run` | admin, finance | Process all pending records → creates history |
| `GET` | `/api/payroll/history/:employeeId` | admin, finance | Payroll history for one employee |
| `GET` | `/api/jobs` | admin, hr | List all job postings |
| `POST` | `/api/jobs` | admin, hr | Create a new job posting |

---

## Stopping the App

```bash
# Stop PostgreSQL
docker-compose down

# To also delete the database volume
docker-compose down -v
```

---

## Security Notes

- Passwords hashed with **bcryptjs** (cost factor 10) — never stored in plaintext
- JWT signed with `JWT_SECRET` from environment — **never commit `.env`**
- Role enforcement applied at both the API layer (`requireRole` middleware) and frontend (`ProtectedRoute` component) — defense in depth
- `node_modules/`, `.env`, and build artifacts are excluded from version control via `.gitignore`

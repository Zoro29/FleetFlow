# Fleet Flow 🚚

> Modular Fleet & Logistics Management. Real-Time. Rule-Based. Scalable.

Fleet Flow is an enterprise-grade operational command system designed to replace scattered spreadsheets and fragmented communication for commercial fleets. It provides a central nervous system for fleet managers, seamlessly integrating dispatching, maintenance scheduling, compliance monitoring, and financial auditing into a single pane of glass.

---

## 🌟 Key Features

*   **Intelligent Dispatch & Routing:** Visual mapping of available vehicles, preventing dispatch if licenses are expired or maintenance is due.
*   **Automated Compliance:** Proactive alerts for DOT compliance, driver hours of service (HOS), and mandatory inspections.
*   **Financial Analytics:** Real-time cost-per-kilometer tracking, toll expenditures, and fuel efficiency ROI.
*   **Role-Based Access Control (RBAC):** Tailored dashboards for Fleet Managers, Dispatchers, Safety Officers, and Financial Analysts.
*   **Zero-Trust Architecture:** Built with security in mind, treating fleet data with institutional-grade safeguards.

## 🛠️ Technology Stack

**Frontend**
*   [React](https://reactjs.org/) (Vite)
*   [React Router](https://reactrouter.com/) for navigation
*   [Lucide React](https://lucide.dev/) for iconography
*   Vanilla CSS (Custom Design System)

**Backend**
*   [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
*   [PostgreSQL](https://www.postgresql.org/) (Dockerized)
*   RESTful API Architecture
*   Authentication (JWT-ready structure)

---

## 🚀 Getting Started

Follow these steps to run the Fleet Flow platform locally on your machine.

### Prerequisites

*   **Node.js** (v18+ recommended)
*   **Docker Desktop** (⚠️ **Crucial:** Ensure Docker Desktop is open and the daemon is running before starting the backend database).
*   **Git**

### 1. Database & Backend Setup

First, initialize the database and start the API server.

```bash
# Navigate to the backend directory
cd Backend

# Install dependencies
npm install

# Start the PostgreSQL database via Docker (Ensure Docker Desktop is running!)
docker-compose up -d

# (Optional) Seed the database with initial dummy data
npm run initiate

# Start the Node.js backend development server
npm run dev
```
> The backend server will typically run on `http://localhost:3001` (or your configured `PORT`).

### 2. Frontend Web Application Setup

Open a **new terminal window/tab**, and start the React frontend.

```bash
# Navigate to the frontend directory from the project root
cd Frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

> The web interface will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
FleetFlow/
├── Backend/                 # Node.js + Express API
│   ├── src/                 # Controllers, Routes, Services
│   ├── db/                  # SQL Schema and Seeding Scripts
│   ├── docker-compose.yml   # PostgreSQL Container config
│   └── package.json
└── Frontend/                # React UI
    ├── src/                 # React Components, Pages, Context
    │   ├── components/      # Reusable UI elements (Navbar, Footer, etc.)
    │   ├── pages/           # Core App and Marketing Pages
    │   └── App.jsx          # Main Router
    └── package.json
```

## 🤝 Contributing

We welcome contributions from engineers, designers, and logisticians. Please read our `CONTRIBUTING.md` (coming soon) for details on our code of conduct, and the process for submitting pull requests to us.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Built for the humans who move the world's supply chains.*

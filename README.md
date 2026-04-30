# SkillSetra: A Sophisticated DBMS-Powered Freelance Marketplace

SkillSetra is a comprehensive freelance marketplace platform designed to optimize project posting, freelancer discovery, and hiring workflows. Built as a Database Management Systems (DBMS) project prototype, the application utilizes a highly normalized relational schema and an intelligent matching engine to bridge the gap between complex project requirements and professional expertise.

## Project Overview

The primary objective of SkillSetra is to demonstrate the power of relational database modeling in solving real-world marketplace challenges. The platform features separate specialized dashboards for clients and freelancers, integrated with a central matching algorithm that calculates compatibility scores based on proficiency vectors, experience years, and skill requirements.

### Key Functional Areas
- **Algorithmic Matching Engine**: Dynamic relational queries that calculate 0-100 compatibility scores.
- **Client Management**: Tools for project specification, budget management, and candidate invitation.
- **Freelancer Profiles**: Comprehensive skill matrices, verifiable portfolios, and bio management.
- **Relational Integrity**: Fully normalized schema (3NF/BCNF principles) ensuring data consistency and optimized performance.

## Technical Stack

The application is built using a modern, high-performance web architecture:

- **Frontend Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM & Schema Management**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL (via Neon)](https://neon.tech/)
- **Styling**: Vanilla CSS (Custom Glassmorphism Design System)
- **State Management**: React Hooks (State, Effect, Memo)

## Project Structure

The codebase follows a modular architecture for scalability and maintainability:

```text
├── prisma/                 # Database schema and migration files
│   ├── schema.prisma       # Primary relational model definitions
│   └── seed.ts             # Database seeding scripts for development
├── src/
│   ├── app/                # Next.js App Router (Pages and API Routes)
│   │   ├── client/         # Client-side specialized dashboards
│   │   ├── freelancer/     # Freelancer-side specialized dashboards
│   │   ├── tasks/          # Public project discovery directory
│   │   └── freelancers/    # Public professional directory
│   ├── components/         # Reusable UI components (Navbar, Footer, Menu)
│   └── lib/                # Shared utilities and database singletons
├── public/                 # Static assets and media files
└── .env                    # Environment configuration (Database URL)
```

## Development Team

This project was designed and developed as part of the Database Management Systems curriculum at the **National Institute of Technology (NIT) Manipur**.

**Core Developers:**
- **Shivam Raj**
- **Divyam Kumar Choubey**
- **Abhinav Patra**

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A PostgreSQL database instance (Neon recommended)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env` (DATABASE_URL)
4. Synchronize database schema: `npx prisma db push`
5. Seed development data: `npx prisma db seed`
6. Start the development server: `npm run dev`

---
*SkillSetra Platform Prototype | National Institute of Technology Manipur*

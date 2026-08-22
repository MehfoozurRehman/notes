# Cloud Notes: Full-Stack Note-Taking & Markdown Workspace

A full-stack note-taking web workspace and task organizer built with Next.js 14 App Router, React 18, PostgreSQL, and Prisma ORM.

## Overview

`notes` provides a distraction-free note editor with persistent cloud storage, category organization, search filtering, Next.js Server Actions, and schema validation via Zod and Prisma ORM.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v14 App Router)
- **Database & ORM**: PostgreSQL with [Prisma ORM](https://www.prisma.io/) (v5)
- **Validation**: Zod
- **Frontend Core**: React 18, TypeScript

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database instance
- Package manager (`pnpm` or `npm`)

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   URL="http://localhost:3000"
   ```

3. **Run Prisma Migrations**:
   ```bash
   pnpm migrate
   ```

4. **Run the Development Server**:
   ```bash
   pnpm dev
   ```

5. **Access the Application**:
   Open `http://localhost:3000` in your web browser.

## Available Scripts

- `pnpm dev` - Starts the Next.js development server.
- `pnpm generate` - Regenerates Prisma Client models.
- `pnpm migrate` - Applies development database migrations.
- `pnpm studio` - Opens Prisma Studio visual database editor.
- `pnpm build` - Compiles the application for production.

## Author

Created by [Mehfooz-ur-Rehman](https://github.com/MehfoozurRehman).

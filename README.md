# Smart Note System

A modern, full-stack Smart Note & Task Management application.

## 🚀 Architecture

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, Shadcn UI
- **Backend**: Laravel 11, PHP, RESTful API

## 📁 Project Structure

```
Smart Note System/
├── backend/          # Laravel REST API backend
└── frontend/         # Next.js frontend application
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+) & pnpm (or npm)
- PHP (v8.2+) & Composer

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Set up environment configuration:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Run migrations:
   ```bash
   php artisan migrate
   ```
5. Start the development server:
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

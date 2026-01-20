# Hi2 Social Media Platform (Phase 1 MVP)

This is the frontend repository for the **Hi2** social media platform, built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It is designed for scalability, performance, and SEO optimization.

## 🚀 Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Library**: [React 19](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Validation**: [Zod](https://zod.dev/)
-   **Linting & Formatting**: ESLint, Prettier, Husky, Lint-staged

## 🛠️ Prerequisites

Ensure you have the following installed:

-   **Node.js**: v18.17.0 or higher (Recommended: LTS)
-   **npm**: v9.0.0 or higher

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Hi2-UI
```

### 2. Install Dependencies

> **Note**: This project uses React 19, which may cause peer dependency warnings with some libraries. A `.npmrc` file is included to automatically handle legacy peer deps.

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your local configuration if needed.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The project follows a modular, monorepo-ready structure:

```
Hi2-UI/
├── app/                 # Next.js App Router root
│   ├── (auth)/          # Authentication route group
│   ├── (main)/          # Main application route group
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── ui/              # Reusable UI primitives
│   ├── common/          # Shared components (Button, Modal, etc.)
│   ├── layout/          # Layout components (Header, Sidebar)
│   └── forms/           # Form components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and libraries
│   ├── api/             # API fetch wrappers
│   ├── env.ts           # Type-safe env validation
│   └── utils.ts         # Helper functions (cn, etc.)
├── public/              # Static assets
├── styles/              # Global styles
└── types/               # Global TypeScript definitions
```

## 📜 Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm start`: Starts the production server.
-   `npm run lint`: Runs ESLint.
-   `npm run prepare`: Sets up Husky for git hooks.

## 🤝 Contributing

1.  Create a feature branch (`git checkout -b feature/amazing-feature`).
2.  Commit your changes (`git commit -m 'Add some amazing feature'`).
3.  Push to the branch (`git push origin feature/amazing-feature`).
4.  Open a Pull Request.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**Use Bun exclusively** - This project uses Bun as the package manager and runtime. Never use npm, yarn, or pnpm.

## Project Overview

This is Leonid Vinikov's personal portfolio monorepo containing:
- **Website** (`apps/website`): React + Vite frontend with an Express backend for PDF generation
- **Docs** (`apps/docs`): Docusaurus documentation site

## Common Commands

### Root Level Commands
```bash
# Linting
bun run inewlegend:eslint          # Run ESLint across entire monorepo
bun run inewlegend:eslint:fix      # Auto-fix ESLint issues

# Website commands
bun run inewlegend:website:dev     # Start website dev server (frontend + backend)
bun run inewlegend:website:build   # Build website for production
bun run inewlegend:website:deploy  # Deploy website to server

# Docs commands
bun run inewlegend:docs:dev        # Start docs dev server
bun run inewlegend:docs:build      # Build docs for production
bun run inewlegend:docs:serve      # Serve built docs locally
bun run inewlegend:docs:deploy     # Deploy docs to server
```

### Website-Specific Commands
```bash
cd apps/website

# Development
bun run dev           # Starts both Vite dev server (port 5173) and backend server
bun run build         # Build for production
bun run preview       # Preview production build
bun run type-check    # Run TypeScript type checking without emitting files

# Backend only
cd backend
bun run dev           # Start backend in watch mode
bun run build         # Build backend
bun run deploy        # Deploy backend to server
```

### Docs-Specific Commands
```bash
cd apps/docs

bun run start         # Start development server
bun run build         # Build for production
bun run serve         # Serve production build locally
bun run typecheck     # Run TypeScript type checking
```

## Architecture

### Monorepo Structure
- **Workspace-based**: Uses Bun workspaces defined in root `package.json`
- **Apps**: `apps/website` and `apps/docs` are the main applications
- **No shared packages yet**: Currently no `packages/` directory, but workspace structure supports it

### Website Architecture

**Frontend** (`apps/website/src`):
- **React 19** + **Vite** + **TypeScript**
- **Styling**: Tailwind CSS 4 (prefer Tailwind over custom CSS)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: Zustand (when needed for complex state)
- **Features**: Feature-based architecture in `src/features/` (currently has `resume/`)

**Backend** (`apps/website/backend`):
- **Express** server for PDF generation
- **Puppeteer** for headless Chrome rendering
- Runs concurrently with frontend during development

### Key Technologies
- **React 19**: Latest React with concurrent features
- **Tailwind CSS 4**: Utility-first styling
- **TypeScript**: Strict mode enabled
- **ESLint**: @zenflux/eslint configuration
- **Vite**: Fast build tool with HMR

## Development Guidelines

### File Naming
**Always use kebab-case** for all `.ts` and `.tsx` files (e.g., `resume-header.tsx`, not `ResumeHeader.tsx`)

### Import Rules
**Never use relative imports** - Always use workspace imports or absolute paths:
```typescript
// ✅ Good
import { Component } from '@inewlegend/website/components';

// ❌ Bad
import { Component } from '../../components';
```

### Code Style
1. **Modular & Reusable**: Write components that could be extracted to other projects
2. **Agnostic Design**: Avoid hard-coded values and context-specific implementations
3. **Root Cause Analysis**: Always find and fix root causes instead of using workarounds
4. **Tailwind First**: Prefer Tailwind utilities over custom CSS
5. **shadcn/ui**: Use shadcn components for UI elements (located in `src/components/ui/`)

### Commit Message Format
Follow this exact format for all commits:
```
<tag1>: (`<tag2>`) - <description>
```

**Tag1** (change type):
- `feat` - New feature or functionality
- `fix` - Bug fix or issue resolution
- `chore` - Maintenance tasks, dependencies, or tooling
- `infra` - Infrastructure changes, CI/CD, deployment
- `tweak` - Minor improvements, refactoring, or adjustments

**Tag2** (scope/package):
- `website` - Frontend website application
- `docs` - Documentation site
- `shared` - Shared utilities or components
- `config` - Configuration files
- `scripts` - Build or deployment scripts
- `root` - Root-level changes affecting entire workspace

**Description**:
- Use present tense ("add feature" not "added feature")
- Be specific about changes
- Keep under 50 characters when possible
- Use lowercase (except proper nouns)

**Examples**:
```
feat: (`website`) - add resume section reordering functionality
fix: (`docs`) - resolve broken internal links in api documentation
tweak: (`website`) - improve resume component naming consistency
```

## Technology Stack Summary

**Frontend Framework**: React 19 + TypeScript
**Build Tool**: Vite 7
**Styling**: Tailwind CSS 4 + PostCSS
**UI Library**: shadcn/ui (Radix UI)
**State**: Zustand (when needed)
**Routing**: React Router DOM
**Backend**: Express + Puppeteer (PDF generation)
**Docs**: Docusaurus 3
**Linting**: ESLint (@zenflux/eslint)
**Runtime**: Bun
**Deployment**: Custom scripts using SSH2

## Important Notes

- The website backend runs concurrently with the frontend during development
- ESLint configuration uses @zenflux/eslint with workspace support
- TypeScript is configured in strict mode with bundler module resolution
- Vite is configured to run on port 5173 with CSS code splitting disabled
- All deployment scripts are located in the `scripts/` directory

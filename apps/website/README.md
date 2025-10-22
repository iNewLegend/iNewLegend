# Leonid Vinikov - Portfolio Website

A modern, responsive portfolio website with advanced resume generation capabilities, built with React, TypeScript, and Tailwind CSS. Features a sophisticated resume builder with customizable themes, section ordering, and PDF export functionality.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Advanced Resume Builder**: Customizable resume sections with theme support
- **PDF Export**: Generate professional PDF resumes
- **Section Management**: Reorder and customize resume sections
- **Theme System**: Multiple resume themes with customizable styling
- **Backend Service**: Dedicated PDF generation service
- **Monorepo Architecture**: Organized workspace with multiple applications

## Tech Stack

### Frontend
- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, shadcn/ui components, SCSS
- **Icons**: Lucide React
- **State Management**: React hooks and context
- **PDF Generation**: Puppeteer integration

### Backend
- **Runtime**: Bun
- **Framework**: Express.js
- **PDF Generation**: Puppeteer with Chromium
- **CORS**: Cross-origin resource sharing support
- **Deployment**: Docker

### Development
- **Package Manager**: Bun
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support
- **Monorepo**: Workspace-based project structure

## Project Structure

```
apps/website/
├── src/
│   ├── components/              # Main UI components
│   │   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── hero/                # Hero section components
│   │   ├── resume-controls/     # Resume management components
│   │   └── *.tsx                # Page sections
│   ├── features/
│   │   └── resume/              # Resume feature modules
│   │       ├── sections/        # Resume section components
│   │       ├── resume-controls/  # Resume editing controls
│   │       ├── ui/              # Resume-specific UI components
│   │       └── *.ts             # Resume definitions and types
│   ├── configs/                 # Configuration variants
│   ├── lib/                     # Utility functions
│   └── server/                  # Development server
├── backend/                     # PDF generation service
│   ├── src/
│   └── Dockerfile
└── dist/                        # Production build
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- Node.js 18+ (for backend dependencies)

### Installation

1. Navigate to the project root:
   ```bash
   cd /path/to/iNewLegend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run inewlegend:website:dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

#### Root Level Scripts
- `bun run inewlegend:website:dev` - Start website development server
- `bun run inewlegend:website:build` - Build website for production
- `bun run inewlegend:website:deploy` - Deploy website
- `bun run inewlegend:website:backend:deploy` - Deploy backend service
- `bun run inewlegend:docs:dev` - Start documentation server
- `bun run inewlegend:docs:build` - Build documentation
- `bun run inewlegend:docs:deploy` - Deploy documentation

#### Website Scripts
- `bun run dev` - Start development server (frontend + backend)
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run type-check` - TypeScript type checking

## Resume Builder Features

### Section Management
- **Customizable Sections**: About, Skills, Experience, Projects, What I Do, What I'm Looking For
- **Section Ordering**: Drag and drop to reorder sections
- **Compact Mode**: Toggle compact view for specific sections
- **Dynamic Content**: Real-time preview of changes

### Theme System
- **Multiple Themes**: Various professional resume themes
- **Customizable Colors**: Adjust color schemes and typography
- **Responsive Design**: Optimized for different screen sizes
- **Print Optimization**: PDF-ready styling

### PDF Generation
- **Backend Service**: Dedicated PDF generation service
- **High Quality**: Professional PDF output
- **Custom Filenames**: Configurable PDF naming
- **CORS Support**: Secure cross-origin requests

## Configuration

### Environment Variables

#### Frontend
- `VITE_WEBSITE_PROFILE`: Set to "frontend" or "fullstack" to switch between configurations

#### Backend
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Allowed origin for CORS
- `DEFAULT_FILENAME`: Default PDF filename

### Profile Configurations

The website supports multiple profile configurations:
- **Fullstack**: Complete developer profile
- **Frontend**: Frontend-focused profile

## Deployment

### Website Deployment

1. Build the application:
   ```bash
   bun run inewlegend:website:build
   ```

2. Deploy using the provided script:
   ```bash
   bun run inewlegend:website:deploy
   ```

### Backend Deployment

1. Deploy the PDF service:
   ```bash
   bun run inewlegend:website:backend:deploy
   ```

### Recommended Hosting Platforms

- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Dokku, Railway, Render
- **Full Stack**: AWS, DigitalOcean, Linode

## Development

### Adding New Resume Sections

1. Create section component in `src/features/resume/sections/`
2. Add section key to `RESUME_SECTION_KEYS` in `resume.definitions.ts`
3. Update section ordering in default parameters
4. Add section to resume controls if needed

### Customizing Themes

1. Modify theme definitions in `src/features/resume/resume-theme.ts`
2. Update SCSS variables in `src/features/resume/resume.scss`
3. Test theme changes across different sections

## License

This project is private and proprietary.

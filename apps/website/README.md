# Leonid Vinikov - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Smooth Navigation**: Single-page application with smooth scrolling
- **Contact Form**: Interactive contact form for inquiries
- **Project Showcase**: Display of recent work and projects

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Navigate to the website directory:
   ```bash
   cd apps/website
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Experience.tsx  # Experience section
│   ├── Projects.tsx    # Projects showcase
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── lib/                # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Customization

### Updating Content

1. **Personal Information**: Update the content in each component file
2. **Projects**: Modify the `projects` array in `Projects.tsx`
3. **Experience**: Update the `experiences` array in `Experience.tsx`
4. **Skills**: Modify the `skills` array in `About.tsx`

### Styling

- Global styles are in `src/index.css`
- Component-specific styles use Tailwind CSS classes
- Theme customization can be done in `tailwind.config.js`

## Deployment

The application can be deployed to any static hosting service:

1. Build the application:
   ```bash
   bun run build
   ```

2. Deploy the `dist` folder to your hosting service

### Recommended Hosting Platforms

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [AWS S3 + CloudFront](https://aws.amazon.com/)

## License

This project is private and proprietary.

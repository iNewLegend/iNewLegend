export const frontendConfig = {
    personal: {
        name: "Leonid Vinikov",
        title: "Senior Frontend Engineer",
        email: "leonidvinikov@gmail.com",
        phone: "+972 053 919 7333",
        location: "Israel, Holon",
        github: "https://github.com/inewlegend",
        linkedin: "https://www.linkedin.com/in/inewlegend/",
        portfolio: "http://leonidvinikov.com"
    },

    hero: {
        title: "Hi, I'm",
        subtitle: "Senior Frontend Engineer (React, TypeScript, UI Performance)",
        description: "I craft fast, accessible, and maintainable UIs in React + TypeScript. I focus on clarity, performance, and DX: architecting component systems, optimizing rendering, and shipping reliable frontends with strong testing and CI."
    },

    about: {
        title: "About Me",
        description: "Frontend‑oriented engineer with strong product sense. I build robust React apps, design clean state management, improve performance, and elevate DX with tooling and tests.",
        journey: {
            title: "My Journey",
            content: "From platform and core work to product features, I’ve delivered frontends at scale (Elementor) and built tooling that accelerates teams. I enjoy refactoring cores, improving rendering pipelines, and creating delightful UI experiences."
        }
    },

    whatIDo: {
        title: "What I Do",
        items: [
            "Architect React apps with clear boundaries and testability",
            "Optimize rendering, bundle size, and perceived performance",
            "Build reusable component systems (Tailwind, shadcn/ui)",
            "Establish strong typing, linting, and CI pipelines",
            "Improve DX with tooling, scripts, and actionable docs"
        ]
    },
    whatILookingFor: {
        title: "What I'm Looking For",
        items: [
            "Crafting complex systems and improving DX",
            "Opportunities to build and scale advanced systems",
            "Projects with challenging technical problems",
            "Environments that prioritize DX and engineering best practices"
        ]
    },

    experience: [
        {
            title: "Senior Frontend Engineer",
            company: "Matia",
            location: "Onsite",
            period: "October 2024 — September 2025",
            description: "Led major frontend initiatives: re‑architecture, component systems, and performance passes. Translated designs into production, integrated services, and shipped high‑impact features with strong typing and tests.",
            compactDescription: "Led React re‑architecture and performance improvements; shipped high‑impact UI features.",
            technologies: [ "React", "TypeScript", "Zustand", "Tailwind", "Vite", "Jest", "Playwright" ]
        },
        {
            title: "Freelance + Open Source Developer",
            company: "Self-Employed",
            location: "Remote",
            period: "July 2022 — June 2024",
            description: "Built React frontends and OSS tooling (Vertix, ZenFlux). Focused on DX, typed APIs, and robust UI patterns.",
            compactDescription: "Delivered React apps and OSS; focused on typed APIs, DX, and robust UI patterns.",
            technologies: [ "React", "TypeScript", "Tailwind", "Zustand", "Rollup", "SWC" ]
        },
        {
            title: "Frontend Engineer (Editor Core)",
            company: "Elementor",
            location: "Hybrid",
            period: "July 2019 — June 2022",
            description: "Contributed to core editor frontends and DX tooling. Refactored core components, improved reliability, and added tests across UI flows.",
            compactDescription: "Core editor UI work and DX tooling; refactors and tests at scale.",
            technologies: [ "JavaScript", "React", "Testing", "DX", "WordPress" ]
        }
    ],

    projects: [
        { title: "ElementsHighlight", description: "Chrome extension to highlight DOM elements; React + Tailwind + shadcn/ui.", technologies: [ "React", "Vite", "Tailwind", "shadcn/ui" ], github: "https://github.com/iNewLegend/chrome-extension-elements-highlight", demo: "https://github.com/iNewLegend/chrome-extension-elements-highlight" },
        { title: "ZenFlux", description: "DX tooling for monorepos; improves build/publish flows.", technologies: [ "TypeScript", "SWC", "Rollup" ], github: "https://github.com/zenflux/zenflux", demo: "https://github.com/zenflux/zenflux" },
        { title: "Vertix", description: "Discord bot with React dashboard patterns.", technologies: [ "React", "TypeScript" ], github: "https://github.com/VertixGG/vertix.gg", demo: "https://vertix.gg/" }
    ],

    skills: {
        "Frontend": [ "React", "TypeScript", "Tailwind", "Zustand", "shadcn/ui", "CSS/SASS" ],
        "Testing": [ "Jest", "Playwright", "Unit", "Integration", "E2E" ],
        "Tooling": [ "Vite", "ESBuild", "SWC", "Rollup", "CI/CD" ],
        "Practices": [ "Accessibility", "Performance", "Code Quality", "DX" ]
    },
    compactSkills: [
        { icon: "Code", title: "Frontend Development", description: "React, TypeScript, Zustand, Tailwind, CSS/SASS, shadcn/ui" },
        { icon: "Smartphone", title: "Quality & Testing", description: "Jest, Playwright, Unit/Integration/E2E, TDD" },
        { icon: "Database", title: "Service Integration", description: "REST, GraphQL, Auth, Caching, Error handling" },
        { icon: "Cloud", title: "Tooling & DX", description: "Vite, SWC, ESBuild, Rollup, CI/CD, Monorepos" }
    ],

    contact: {
        title: "Get In Touch",
        subtitle: "I love building great frontends and improving DX",
        info: { title: "Contact Information", email: "leonidvinikov@gmail.com", phone: "+972 053 919 7333", location: "Israel, Holon" },
        message: { title: "Let's Connect", content: "Looking for frontend leadership or end‑to‑end React delivery? Let’s talk." },
        whatsapp: {
            url: "https://wa.me/972539197333?text=Hi%20Leonid,%20let%27s%20talk%20frontend.",
            text: "Prefer to chat? Send me a message on WhatsApp."
        }
    },

    footer: {
        copyright: "© 2025 Leonid Vinikov. Made with ❤️ using React & Tailwind CSS"
    }
};


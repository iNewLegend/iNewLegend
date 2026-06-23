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
        subtitle: "Senior Frontend Engineer | React, TypeScript, Performance, DX",
        highlights: [
            "5+ years building production frontends",
            "Top 4 contributor at Elementor",
            "Worked on product used by 16M+ websites"
        ],
        description: "Senior frontend engineer with 5+ years shipping React and TypeScript products, from component systems and rendering performance to DX tooling and test infrastructure. I contributed to Elementor's editor core on a product used by 16M+ websites and focus on maintainable UI architecture, accessibility, and reliable delivery."
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
            description: "Led major frontend initiatives: re‑architecture, component systems, and performance passes. Built advanced React components — most notably a dynamic multi‑step form framework wired to the backend, first used for Snowflake source/destination configuration but architected as a reusable base across any integration source/destination. Translated designs into production, integrated services, and shipped high‑impact features with strong typing and tests.",
            compactDescription: "Led React re‑architecture and performance improvements; built a dynamic multi‑step form framework wired to the backend (first used for Snowflake, reusable across integration sources/destinations).",
            technologies: [ "React", "TypeScript", "Zustand", "Tailwind", "Vite", "Jest", "Playwright" ]
        },
        {
            title: "Frontend Engineer (Freelance & Open Source)",
            company: "Independent",
            location: "Remote",
            period: "July 2022 — June 2024",
            description: "Built React frontends and deep OSS engineering. Designed and built Vertix — an advanced Discord platform with a state-machine UI framework: a React + @xyflow/react visual flow editor that hot-reloads JSON into the running bot, declarative flows/transitions, hash-based component IDs bypassing Discord's 100-char `custom_id` limit, and a 6-app / 9-package Bun monorepo (React dashboard, REST API, MCP server). Also built ZenFlux — a TypeScript monorepo build framework wrapping Rollup/SWC. Focused on DX, typed APIs, and robust UI patterns.",
            compactDescription: "Built Vertix — Discord state-machine UI framework with React + @xyflow/react visual editor that hot-reloads flows into the bot; 6 apps + 9 packages Bun monorepo. Also built ZenFlux TS monorepo build framework. Focused on typed APIs, DX, and robust UI patterns.",
            technologies: [ "React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "@xyflow/react", "Rollup", "SWC" ]
        },
        {
            title: "Frontend Engineer (Editor Core)",
            company: "Elementor",
            location: "Hybrid",
            period: "July 2019 — June 2022",
            description: "Editor Core Team on Elementor (powers ~10% of the internet, 16M+ websites). Authored 1,500+ commits across 320+ merged PRs — 4th all-time contributor on the main 6.9k★ repo. Refactored core editor UI components, built DX tooling, and added broad test coverage across UI flows.",
            compactDescription: "Editor Core — 4th all-time contributor (1,500+ commits, 320+ merged PRs) on Elementor's 6.9k★ repo. Core UI refactors, DX tooling, and tests at scale.",
            technologies: [ "JavaScript", "React", "Testing", "DX", "WordPress" ]
        }
    ],

    projects: [
        { title: "ElementsHighlight", description: "Chrome extension to highlight DOM elements; React + Tailwind + shadcn/ui.", technologies: [ "React", "Vite", "Tailwind", "shadcn/ui" ], github: "https://github.com/iNewLegend/chrome-extension-elements-highlight", demo: "https://github.com/iNewLegend/chrome-extension-elements-highlight" },
        { title: "ZenFlux", description: "DX tooling for monorepos; improves build/publish flows.", technologies: [ "TypeScript", "SWC", "Rollup" ], github: "https://github.com/zenflux/zenflux", demo: "https://github.com/zenflux/zenflux" },
        { title: "Vertix", description: "Discord platform with a React dashboard powered by an @xyflow/react visual flow editor that hot-reloads JSON state-machine UIs into the running bot.", technologies: [ "React", "TypeScript", "Vite", "Tailwind CSS", "@xyflow/react", "Zustand", "Radix UI" ], github: "https://github.com/VertixGG/vertix.gg", demo: "https://vertix.gg/" }
    ],

    education: [
        {
            institution: "John Bryce",
            credential: "Web / Multimedia Management & Webmaster",
            period: "2012 — 2013",
            description: "PHP, CodeIgniter, REST APIs, OOP, and web mastering. Primarily a self-taught engineer — continuously learning through open-source work and shipping production systems."
        }
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

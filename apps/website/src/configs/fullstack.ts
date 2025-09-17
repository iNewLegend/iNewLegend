export const fullstackConfig = {
    personal: {
        name: "Leonid Vinikov",
        title: "Senior FullStack / Frontend Developer",
        email: "leonidvinikov@gmail.com",
        phone: "+972 053 919 7333",
        location: "Israel, Holon",
        github: "https://github.com/inewlegend",
        linkedin: "https://www.linkedin.com/in/inewlegend/"
    },

    hero: {
        title: "Hi, I'm",
        subtitle: "Senior Frontend Developer / Full‑Stack",
        description: "I'm a developer with 8 years building reliable, scalable systems across frontend and backend. I focus on data and the logic that powers user interfaces, designing clean APIs, refactoring core, and shipping end‑to‑end features. I'm persistent with complex problems and committed to maintainable, well‑tested code."
    },

    about: {
        title: "About Me",
        description: "I build and evolve products end‑to‑end: designing and implementing APIs, maintaining backward compatibility, refactoring core modules, and adding comprehensive test coverage. I care about clarity, robustness, and long‑term maintainability.",
        journey: {
            title: "My Journey",
            content: "I've worked across startups and large‑scale products like Elementor (used by 10% of the internet), contributed to open source, and delivered platform and developer‑experience improvements. I enjoy translating ideas into production systems and prefer roles involving platform engineering and strong execution."
        },
        whatIDo: {
            title: "What I Do",
            items: [
                "Design clean, stable APIs and ensure backward compatibility",
                "Refactor core systems for reliability, performance, and clarity",
                "Implement thorough testing (unit, integration, E2E) and CI/CD",
                "Build developer tools and improve platform DX and monorepos",
                "Deliver end‑to‑end features across frontend, backend",
                "Utilize tools like Cursor AI, and LLMs to improve productivity"
            ]
        },
        skills: [
            { icon: "Code", title: "Frontend Development", description: "React, TypeScript, JavaScript, CSS/SASS, Tailwind, Material UI, Zustand" },
            { icon: "Database", title: "Backend Development", description: "Node.js, PHP, MongoDB, MySQL" },
            { icon: "Cloud", title: "Platform Engineering", description: "EC2, Docker, CI/CD, Monorepo Setup, Nx, Building Tools" },
            { icon: "Smartphone", title: "Testing & Quality", description: "Jest, Playwright, Unit/Integration/E2E Testing, TDD" }
        ]
    },

    experience: [
        {
            title: "Senior Full-Stack Engineer",
            company: "Matia",
            location: "Onsite",
            period: "2024 — 2025 (1+ years)",
            description: "Matia unifies ETL, observability, catalog, and reverse ETL, so teams can focus on what they do best: driving actionable insights and accelerating innovation. As a Senior Full-Stack Engineer, I contributed across nearly all aspects of the development lifecycle. My work included building integrations, rewriting the frontend, doing peer reviews, translating Figma designs into functional features, adapting backend systems to support product requirements, and delivering end-to-end solutions that were actively used by customers.",
            compactDescription: "Built integrations and rewrote the frontend; shipped end‑to‑end features used by customers.",
            technologies: [ "React", "TypeScript", "Node.js", "MongoDB", "Zustand", "AWS", "ETL", "Observability" ]
        },
        {
            title: "Freelance + Open Source Developer",
            company: "Self-Employed",
            location: "Remote",
            period: "2022 — 2024 (2+ years)",
            description: "I worked as a freelancer and started some projects to extend my knowledge. Created Vertix (Discord bot for managing voice channels) and ZenFlux (framework for building, publishing, and watching monorepo workspaces).",
            compactDescription: "Worked as freelancer, and on private projects eg: <a href='https://github.com/VertixGG/vertix.gg'>https://github.com/VertixGG/vertix.gg</a>",
            technologies: [ "TypeScript", "React", "NestJS", "Prisma", "MongoDB", "Jest", "Playwright", "Discord.js", "AWS EC2", "Rollup", "SWC" ]
        },
        {
            title: "Full Stack Developer",
            company: "Elementor",
            location: "Hybrid",
            period: "2019 — 2022 (3+ years)",
            description: "Elementor is one of the most popular website builders in the world, used by 10% of the internet to build over 16M websites. As a full Stack developer, I worked in the Editor Core Team. I participated and contributed to building the infrastructure/core refactoring, created tools that helped my team in the development process, refactored the product core components and wrote many tests to increase code quality. I'm the 4th contributor of Elementor.",
            compactDescription: "Core editor refactors, internal tooling, and tests; top‑4 contributor improving reliability and DX.",
            technologies: [ "JavaScript" ,"TypeScript", "PHP", "React", "WordPress", "REST API", "Testing", "Documentation" ]
        },
        {
            title: "Developer & Linux, VoIP Servers Engineer",
            company: "VoiceSpin",
            location: "Hybrid",
            period: "2017 — 2019 (2+ years)",
            description: "VoiceSpin is a company that provides cloud-based VoIP communication and customer engagement solutions to businesses. Created/Maintained tools for support engineers, developed dedicated custom features for customers, and integration with products in our/their end.",
            compactDescription: "Built internal tools and custom VoIP features; integrated customer systems and supported production.",
            technologies: [ "VoIP", "Cloud", "Customer Support", "Integration", "Custom Development", "Asterisk", "Linux" ]
        },
        {
            title: "Game Server Developer",
            company: "MuOnline.co.il",
            location: "Remote",
            period: "2014 — 2019 (5+ years)",
            description: "RPG multiplayer game that was created by WebZen. Assembly was the first language I learned when I was in 10th grade. I learned reverse engineering using IDA PRO and OllyDBG while upgrading and maintaining the game servers. By changing the Entry Point of the game servers/client and hooking in my custom DLL, I was able to provide many add-ons and share the data between the game servers using a custom data server written in C++. Also, I created a game launcher in C# that updates the client and displays server updates.",
            compactDescription: "Maintained and extended MMORPG servers via reverse engineering; built C++ data server and launcher.",
            technologies: [ "Assembly", "C", "C++", "PHP", "MS SQL", "MySQL", "JavaScript", "Reverse Engineering", "IDA PRO", "OllyDBG" ]
        }
    ],

    projects: [
        { title: "Vertix", description: "A Discord bot for managing voice channels. Built with TypeScript, Discord.js, and modern development practices. Provides advanced voice channel management features for Discord servers.", technologies: [ "TypeScript", "React", "Prisma", "MongoDB", "Jest", "Discord.js", "CI/CD", "Monorepo" ], github: "https://github.com/VertixGG/vertix.gg", demo: "https://vertix.gg/" },
        { title: "ZenFlux", description: "A framework that offers functionalities related to building, publishing, and watching monorepo workspaces. Designed to streamline monorepo development workflows and improve developer experience.", technologies: [ "TypeScript", "Node.js", "pnpm", "SWC", "Rollup", "Monorepo", "CLI" ], github: "https://github.com/zenflux/zenflux", demo: "https://github.com/zenflux/zenflux" },
        { title: "ElementsHighlight", description: "A React + Vite + Tailwind + shadcn/ui powered Chrome extension that lets you highlight DOM elements on any visited page and lays the groundwork for adding contextual notes. Features Shadow DOM isolation, popup UI, and background service worker.", technologies: [ "TypeScript", "React", "Vite", "Tailwind CSS", "shadcn/ui", "Chrome Extension API", "Shadow DOM" ], github: "https://github.com/iNewLegend/chrome-extension-elements-highlight", demo: "https://github.com/iNewLegend/chrome-extension-elements-highlight" },
        { title: "MuOnline.co.il", description: "RPG multiplayer game server maintenance and development. Learned reverse engineering using IDA PRO and OllyDBG while upgrading and maintaining game servers. Created custom DLL hooks and data server in C++.", technologies: [ "Assembly", "C", "C++", "PHP", "MS SQL", "MySQL", "JavaScript" ], github: "https://github.com/iNewLegend/muonline.co.il", demo: "https://muonline.co.il/" },
        { title: "PHP Image Dominant Colors", description: "A PHP library for extracting dominant colors from images. Built with pure PHP 8.0+ without any frameworks or external libraries. Features a web interface for testing and includes comprehensive test suites.", technologies: [ "PHP", "JavaScript", "CSS", "HTML", "Image Processing", "Color Analysis" ], github: "https://github.com/iNewLegend/php-image-dominant-colors", demo: "https://inewlegend.com/projects/php-image-dominant-colors/public/index.html" },
        { title: "InfiniGrow", description: "A React demo application for budget overview with custom React commands infrastructure and fake data module. Built as a monorepo using Bun workspace management, featuring TypeScript, SCSS, and modern development practices.", technologies: [ "TypeScript", "React", "SCSS", "Bun", "Monorepo", "React Commands", "Fake Data Module" ], github: "https://github.com/iNewLegend/infinigrow", demo: "https://inewlegend.com/projects/infinigrow/index.html" },
        { title: "Web Crawler", description: "A full-stack web crawler application with Laravel backend and Angular frontend. Features MongoDB integration, memory caching, and comprehensive crawling capabilities. Built with PHP 8.2+, Angular, and modern development workflows.", technologies: [ "PHP", "Laravel", "Angular", "MongoDB", "TypeScript", "Blade", "Web Crawling", "Memory Cache" ], github: "https://github.com/iNewLegend/web-crawler", demo: "https://github.com/iNewLegend/web-crawler" },
        { title: "Demo Shop Catalog", description: "A demonstration project showcasing ZenFlux framework capabilities with a React-Redux frontend and PHP vanilla backend. Features a complete e-commerce catalog with cart functionality, pagination, and database integration. Demonstrates usage of @zenflux/core and @zenflux/redux packages.", technologies: [ "TypeScript", "React", "Redux", "PHP", "CSS", "Database Integration" ], github: "https://github.com/ZenFlux/demo-shop-catalog", demo: "http://inewlegend.com/zenflux/demos/shop-catalog/frontends/react-redux/build/" }
    ],

    skills: {
        "Programming Languages": [ "JavaScript", "TypeScript", "CSS/SASS", "PHP", "C", "Assembly" ],
        "Testing": [ "Jest", "QUnit", "PHPUnit", "Playwright", "Karma", "Unit Testing", "Integration Testing", "E2E Testing" ],
        "Version Control & Collaboration": [ "Git", "GitHub", "GitKraken", "Jira", "ClickUp", "Peer Code Review", "Documentation" ],
        "Development Tools & Build Systems": [ "IntelliJ (IDE)", "Webpack", "Vite", "Grunt", "Composer", "Rollup", "SWC", "ESBuild", "xDebug", "npm", "bun", "pnpm", "yarn", "Nx", "Cursor AI", ],
        "Frameworks & Libraries": [ "React", "NestJS", "Prisma", "Discord.js", "Zustand", "Backbone", "Marionette", "jQuery", "WordPress", "Bootstrap", "Tailwind", "Material UI" ],
        "Other": [ "Monitoring Tool Development", "Technical Support (Help Desk)", "Reverse Engineering (IDA Pro, OllyDBG)", "Multithreading", "JSON Schemas", "CI/CD practices", "Platform engineering", "Monorepo architecture" ],
        "Coding Style": [ "Code Standards & Code Smell Detection", "OOP & Design patterns", "Test-Driven Development (TDD)", "Composition over inheritance", "Type safety" ],
        "Database Experience": [ "MongoDB", "MySQL", "MSSQL", "DynamoDB", "Snowflake" ]
    },

    contact: {
        title: "Get In Touch",
        subtitle: "I'm always interested in new opportunities and exciting projects",
        info: { title: "Contact Information", email: "leonidvinikov@gmail.com", phone: "+972 053 919 7333", location: "Israel, Holon" },
        message: { title: "Let's Connect", content: "Feel free to reach out if you'd like to discuss a project, have any questions, or just want to say hello!" },
        whatsapp: {
            url: "https://wa.me/972539197333?text=Hi%20Leonid,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
            text: "Prefer to chat? Send me a message on WhatsApp for quick communication."
        }
    },

    footer: {
        copyright: "© 2025 Leonid Vinikov. Made with ❤️ using React & Tailwind CSS"
    }
};


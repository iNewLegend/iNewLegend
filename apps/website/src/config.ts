export const config = {
    personal: {
        name: "Leonid Vinikov",
        title: "Senior FullStack / Frontend Developer",
        email: "leonidvinikov@gmail.com",
        phone: "+972 053 919 7333",
        location: "Israel, Holon",
        github: "https://github.com/iNewLegend",
        linkedin: "https://www.linkedin.com/in/inewlegend/",
        resume: "https://drive.google.com/file/d/1Dx2h_KsP1Q2RskG60--9RuD22V_ayU-Z/view"
    },

    hero: {
        title: "Hi, I'm Leonid Vinikov",
        subtitle: "Senior FullStack / Frontend Developer",
        description: "With over 5 years of experience as a dedicated developer, I specialize in both backend and frontend infrastructure, with a particular focus on data and the logic underpinning user interfaces. I excel at solving complex challenges and persistently work through obstacles until each problem is resolved."
    },

    about: {
        title: "About Me",
        description: "My professional experience includes crafting APIs from the ground up, maintaining them to ensure backward compatibility, refactoring existing codebases, and implementing comprehensive test coverage. My code is modular, well-documented, and optimized for efficiency.",
        journey: {
            title: "My Journey",
            content: "With over 5 years of experience as a dedicated developer, I've worked on projects ranging from small business websites to large-scale enterprise applications like Elementor, which is used by 10% of the internet. I believe in writing clean, maintainable code and following best practices. As an advocate for open-source projects, I actively contribute to the community and take great satisfaction in helping others and making a positive impact. Positions related to platform engineering would be highly preferred."
        },
        whatIDo: {
            title: "What I Do",
            items: [
                "Building integrations and rewriting frontends",
                "Creating tools for development teams",
                "Refactoring core components and writing tests",
                "Writing JS APIs from scratch for stability",
                "Peer review and knowledge sharing"
            ]
        },
        skills: [
            { 
                icon: "Code", 
                title: "Frontend Development", 
                description: "React, TypeScript, JavaScript, CSS/SASS, Tailwind, Material UI" 
            },
            { 
                icon: "Database", 
                title: "Backend Development", 
                description: "Node.js, NestJS, PHP, MongoDB, MySQL, MSSQL" 
            },
            { 
                icon: "Cloud", 
                title: "Platform Engineering", 
                description: "EC2, Docker, CI/CD, Monorepo Setup, Nx, Build Tools" 
            },
            { 
                icon: "Smartphone", 
                title: "Testing & Quality", 
                description: "Jest, Playwright, Unit/Integration/E2E Testing, TDD" 
            }
        ]
    },

    experience: [
        {
            title: "Senior Full-Stack Engineer",
            company: "Matia",
            location: "Onsite",
            period: "October 2024 — September 2025",
            description: "Matia unifies ETL, observability, catalog, and reverse ETL, so teams can focus on what they do best: driving actionable insights and accelerating innovation. As a Senior Full-Stack Engineer, I contributed across nearly all aspects of the development lifecycle. My work included building integrations, rewriting the frontend, doing peer reviews, translating Figma designs into functional features, adapting backend systems to support product requirements, and delivering end-to-end solutions that were actively used by customers.",
            technologies: ["React", "TypeScript", "Node.js", "AWS", "ETL", "Observability"]
        },
        {
            title: "Freelance + Open Source Developer",
            company: "Self-Employed",
            location: "Remote",
            period: "July 2022 — June 2024",
            description: "I worked as a freelancer and started some open source projects to extend my knowledge. Created Vertix (Discord bot for managing voice channels) and ZenFlux (framework for building, publishing, and watching monorepo workspaces).",
            technologies: ["TypeScript", "React", "NestJS", "Prisma", "MongoDB", "Jest", "Playwright", "Discord.js", "AWS EC2", "Rollup", "SWC"]
        },
        {
            title: "Full Stack Developer",
            company: "Elementor",
            location: "Hybrid",
            period: "July 2019 — June 2022",
            description: "Elementor is one of the most popular website builders in the world, used by 10% of the internet to build over 16M websites. As a full Stack developer, I worked in the Editor Core Team. I participated and contributed to building the infrastructure/core refactoring, created tools that helped my team in the development process, refactored the product core components and wrote many tests to increase code quality. I'm the 4th contributor of Elementor.",
            technologies: ["JavaScript", "PHP", "React", "WordPress", "REST API", "Testing", "Documentation"]
        },
        {
            title: "Software Developer",
            company: "VoiceSpin",
            location: "Hybrid",
            period: "Feb 2017 — Jan 2019",
            description: "VoiceSpin is a company that provides cloud-based VoIP communication and customer engagement solutions to businesses. Created/Maintained tools for support engineers, developed dedicated custom features for customers, and integration with products in our/their end.",
            technologies: ["VoIP", "Cloud", "Customer Support", "Integration", "Custom Development"]
        },
        {
            title: "Game Server Developer & Administrator",
            company: "MuOnline.co.il",
            location: "Remote",
            period: "2014 — 2019 (5+ years)",
            description: "RPG multiplayer game that was created by WebZen. Assembly was the first language I learned when I was in 10th grade. I learned reverse engineering using IDA PRO and OllyDBG while upgrading and maintaining the game servers. By changing the Entry Point of the game servers/client and hooking in my custom DLL, I was able to provide many add-ons and share the data between the game servers using a custom data server written in C++. Also, I created a game launcher in C# that updates the client and displays server updates.",
            technologies: ["Assembly", "C", "C++", "PHP", "MS SQL", "MySQL", "JavaScript", "Reverse Engineering", "IDA PRO", "OllyDBG"]
        }
    ],

    projects: [
        {
            title: "Vertix",
            description: "A Discord bot for managing voice channels. Built with TypeScript, Discord.js, and modern development practices. Provides advanced voice channel management features for Discord servers.",
            technologies: ["TypeScript", "Discord.js", "Node.js", "MongoDB", "Jest"],
            github: "https://github.com/VertixGG/vertix.gg",
            demo: "https://vertix.gg/"
        },
        {
            title: "ZenFlux",
            description: "A framework that offers functionalities related to building, publishing, and watching monorepo workspaces. Designed to streamline monorepo development workflows and improve developer experience.",
            technologies: ["TypeScript", "React", "NestJS", "Prisma", "Rollup", "SWC"],
            github: "https://github.com/zenflux/zenflux",
            demo: "https://github.com/zenflux/zenflux"
        },
        {
            title: "MuOnline.co.il",
            description: "RPG multiplayer game server maintenance and development. Learned reverse engineering using IDA PRO and OllyDBG while upgrading and maintaining game servers. Created custom DLL hooks and data server in C++.",
            technologies: ["Assembly", "C", "C++", "PHP", "MS SQL", "MySQL", "JavaScript"],
            github: "https://github.com/iNewLegend/muonline.co.il",
            demo: "https://muonline.co.il/"
        }
    ],

    skills: {
        "Programming Languages": [
            "JavaScript", "TypeScript", "CSS/SASS", "PHP", "C", "Assembly"
        ],
        "Testing": [
            "Jest", "QUnit", "PHPUnit", "Playwright", "Karma", "Unit Testing", "Integration Testing", "E2E Testing"
        ],
        "Version Control & Collaboration": [
            "Git", "GitHub", "GitKraken", "Jira", "ClickUp", "Peer Code Review", "Documentation"
        ],
        "Development Tools & Build Systems": [
            "IntelliJ (IDE)", "Webpack", "Vite", "Grunt", "Composer", "Rollup", "SWC", "xDebug", "npm", "bun", "pnpm", "yarn", "Nx"
        ],
        "Frameworks & Libraries": [
            "React", "NestJS", "Prisma", "Discord.js", "Backbone", "Marionette", "jQuery", "WordPress", "Bootstrap", "Tailwind", "Material UI"
        ],
        "Other": [
            "Monitoring Tool Development", "Technical Support (Help Desk)", "Reverse Engineering (IDA Pro, OllyDBG)", "Multithreading", "JSON Schemas", "CI/CD practices", "Platform engineering", "Monorepo architecture"
        ],
        "Coding Style": [
            "Code Standards & Code Smell Detection", "OOP & Design patterns", "Test-Driven Development (TDD)", "Composition over inheritance", "Type safety"
        ],
        "Database Experience": [
            "MongoDB", "MySQL", "MSSQL", "DynamoDB", "Snowflake"
        ]
    },

    contact: {
        title: "Get In Touch",
        subtitle: "I'm always interested in new opportunities and exciting projects",
        info: {
            title: "Contact Information",
            email: "leonidvinikov@gmail.com",
            phone: "+972 053 919 7333",
            location: "Israel, Holon"
        },
        message: {
            title: "Let's Connect",
            content: "Feel free to reach out if you'd like to discuss a project, have any questions, or just want to say hello!"
        }
    },

    footer: {
        copyright: "© 2024 Leonid Vinikov. Made with ❤️ using React & Tailwind CSS"
    }
};

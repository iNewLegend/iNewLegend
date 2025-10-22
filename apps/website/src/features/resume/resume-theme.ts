export type ResumeTheme = {
    container: string;
    colors: {
        primary: string;
        secondary: string;
        muted: string;
        accent: string;
        name: string;
        subtitle: string;
        heading: string;
        chip: {
            bg: string;
            text: string;
            border: string;
        };
    };
    text: {
        sizes: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
        };
    };
    layout: {
        grid: {
            list: string;
            skills: string;
            compactSkills: string;
        };
        spacing: {
            section: string;
            item: string;
            compact: string;
        };
        borders: {
            accent: string;
            dashed: string;
        };
    };
    components: {
        header: {
            border: string;
            nameColor: string;
            subtitleColor: string;
            contactChip: string;
            contactChipHover: string;
        };
        section: {
            headingText: string;
            accentBar: string;
        };
        techChip: string;
        links: {
            project: string;
            github: string;
            contact: string;
        };
    };
};

export const resumeTheme: ResumeTheme = {
    container: "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
    colors: {
        primary: "text-gray-900",
        secondary: "text-gray-800",
        muted: "text-gray-500",
        accent: "text-[hsl(var(--resume-accent-hsl))]",
        name: "text-[hsl(var(--resume-name-hsl))]",
        subtitle: "text-[hsl(var(--resume-subtitle-hsl))]",
        heading: "text-[hsl(var(--resume-heading-hsl))]",
        chip: {
            bg: "bg-[hsl(var(--resume-chip-bg-hsl))]",
            text: "text-[hsl(var(--resume-chip-text-hsl))]",
            border: "border-[hsl(var(--resume-chip-border-hsl))]",
        },
    },
    text: {
        sizes: {
            xs: "text-[11px]",
            sm: "text-[12px]",
            md: "text-[14px]",
            lg: "text-[15px]",
        },
    },
    layout: {
        grid: {
            list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-sm leading-snug list-none m-0 p-0",
            skills: "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
            compactSkills: "grid gap-4 grid-cols-1 sm:grid-cols-2 pb-2",
        },
        spacing: {
            section: "mb-5 pb-4",
            item: "pb-3 border-b-1 border-dashed mt-0.5",
            compact: "mb-4 break-inside-avoid border-l-1 border-b-1 p-1 border-dashed rounded-[10px]",
        },
        borders: {
            accent: "border-b border-[hsl(var(--resume-accent-hsl)/0.7)]",
            dashed: "border-b-1 border-dashed",
        },
    },
    components: {
        header: {
            border: "border-b border-[hsl(var(--resume-accent-hsl)/0.7)]",
            nameColor: "text-[hsl(var(--resume-name-hsl))]",
            subtitleColor: "text-[hsl(var(--resume-subtitle-hsl))]",
            contactChip: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200",
            contactChipHover: "hover:bg-gray-50",
        },
        section: {
            headingText: "text-[hsl(var(--resume-heading-hsl))]",
            accentBar: "bg-[hsl(var(--resume-accent-hsl))]",
        },
        techChip: "bg-[hsl(var(--resume-chip-bg-hsl))] text-[hsl(var(--resume-chip-text-hsl))] border-[hsl(var(--resume-chip-border-hsl))]",
        links: {
            project: "font-semibold text-gray-900 hover:underline",
            github: "text-xs text-blue-700 hover:underline",
            contact: "text-[10.5px] text-gray-700",
        },
    },
};


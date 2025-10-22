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
        weights: {
            normal: string;
            medium: string;
            semibold: string;
            bold: string;
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
            container: string;
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
        accent: "text-[#3b82f6]",
        name: "text-[#60a5fa]",
        subtitle: "text-[#6b7280]",
        heading: "text-[#4b5563]",
        chip: {
            bg: "bg-[#f0f9ff]",
            text: "text-[#1d4ed8]",
            border: "border-[#dbeafe]",
        },
    },
    text: {
        sizes: {
            xs: "text-[var(--resume-text-xs)]",
            sm: "text-[var(--resume-text-sm)]",
            md: "text-[var(--resume-text-md)]",
            lg: "text-[var(--resume-text-lg)]",
        },
        weights: {
            normal: "font-[var(--resume-font-normal)]",
            medium: "font-[var(--resume-font-medium)]",
            semibold: "font-[var(--resume-font-semibold)]",
            bold: "font-[var(--resume-font-bold)]",
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
            accent: "border-b border-[#3b82f6]/70",
            dashed: "border-b-1 border-dashed",
        },
    },
    components: {
        header: {
            border: "border-b border-[#3b82f6]/70",
            nameColor: "text-[#60a5fa]",
            subtitleColor: "text-[#6b7280]",
            contactChip: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 border border-[#e5e7eb]",
            contactChipHover: "hover:bg-gray-50",
        },
        section: {
            container: "border-b-1 border-solid border-[#3b82f6]",
            headingText: "text-[#4b5563]",
            accentBar: "bg-[#3b82f6]",
        },
        techChip: "bg-[#f0f9ff] text-[#1d4ed8] border-[#dbeafe]",
        links: {
            project: "font-semibold text-gray-900 hover:underline",
            github: "text-xs text-blue-700 hover:underline",
            contact: "text-[10.5px] text-gray-700",
        },
    },
};


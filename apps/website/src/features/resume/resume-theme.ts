import "@inewlegend/website/src/features/resume/resume.scss";

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
            contactChip: string;
            contactChipHover: string;
        };
        section: {
            container: string;
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
    container: "bg-resume-background text-resume-foreground",
    colors: {
        primary: "text-resume-primary",
        secondary: "text-resume-secondary",
        muted: "text-resume-muted",
        accent: "text-resume-accent",
        name: "text-resume-name",
        subtitle: "text-resume-subtitle",
        heading: "text-resume-heading",
        chip: {
            bg: "bg-resume-chip-bg",
            text: "text-resume-chip-text",
            border: "border border-resume-chip-border",
        },
    },
    text: {
        sizes: {
            xs: "text-resume-xs",
            sm: "text-resume-sm",
            md: "text-resume-md",
            lg: "text-resume-lg",
        },
        weights: {
            normal: "font-resume-normal",
            medium: "font-resume-medium",
            semibold: "font-resume-semibold",
            bold: "font-resume-bold",
        },
    },
    layout: {
        grid: {
            list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 leading-snug list-none m-0 p-0",
            skills: "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
            compactSkills: "grid gap-4 grid-cols-1 sm:grid-cols-2 pb-2",
        },
        spacing: {
            section: "resume-section-spacing",
            item: "resume-item-spacing",
            compact: "resume-compact-spacing",
        },
        borders: {
            accent: "border-b border-resume-accent",
            dashed: "border-b-1 border-dashed",
        },
    },
    components: {
        header: {
            border: "border-b border-resume-accent",
            contactChip: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-resume-contact-chip-bg border border-resume-secondary",
            contactChipHover: "hover:bg-resume-contact-chip-hover",
        },
        section: {
            container: "border-b border-solid border-resume-accent",
            accentBar: "bg-resume-accent",
        },
        techChip: "text-resume-xs bg-resume-chip-bg text-resume-chip-text border border-resume-chip",
        links: {
            project: "font-resume-semibold text-resume-primary hover:underline",
            github: "text-resume-xs text-resume-accent hover:underline",
            contact: "text-resume-xs text-resume-muted",
        },
    },
};


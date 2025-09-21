export type ResumeTheme = {
    container: string;
    header: {
        border: string;
        nameColor: string;
        subtitleColor: string;
    };
    section: {
        headingText: string;
        accentBar: string;
    };
    techChip: string;
};

export const resumeTheme: ResumeTheme = {
    container: "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
    header: {
        border: "border-b border-[hsl(var(--resume-accent-hsl)/0.7)]",
        nameColor: "text-[hsl(var(--resume-name-hsl))]",
        subtitleColor: "text-[hsl(var(--resume-subtitle-hsl))]",
    },
    section: {
        headingText: "text-[hsl(var(--resume-heading-hsl))]",
        accentBar: "bg-[hsl(var(--resume-accent-hsl))]",
    },
    techChip: "bg-[hsl(var(--resume-chip-bg-hsl))] text-[hsl(var(--resume-chip-text-hsl))] border-[hsl(var(--resume-chip-border-hsl))]",
};



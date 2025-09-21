
export const RESUME_SECTION_KEYS = [
    "summary",
    "skills",
    "about",
    "experience",
    "projects"
] as const;

export const RESUME_SECTION_WITH_COMPACT_KEYS = [
    "summary",
    "skills",
    "experience",
    "projects"
] as const;

export type TResumeOrderKey = ( typeof RESUME_SECTION_KEYS )[number];
export type TResumeOrderKeyWithCompact = ( typeof RESUME_SECTION_WITH_COMPACT_KEYS )[number];

export type TResumeCompactParams = {
    [key in TResumeOrderKeyWithCompact]: boolean;
};

export type TResumeParams = {
    // Per-section compact flags
    compact: TResumeCompactParams

    // Order of sections in the resume body
    order: TResumeOrderKey[]
};

// Single source of truth for default values
export const resumeDefaultParams: TResumeParams = {
    compact: {
        summary: false,
        skills: false,
        experience: false,
        projects: false
    },
    order: [ ...RESUME_SECTION_KEYS ]
};

export type TResumeExperienceItem = {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    compactDescription?: string;
    technologies: string[];
};

export type TResumeExperienceProps = {
    items: TResumeExperienceItem[];
    isCompact: boolean;
};

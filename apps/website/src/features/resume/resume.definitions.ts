
export const RESUME_SECTION_KEYS = [
    "skills",
    "about",
    "whatIDo",
    "whatILookingFor",
    "experience",
    "projects",
    "education"
] as const;

export const RESUME_SECTION_WITH_COMPACT_KEYS = [
    "skills",
    "experience",
    "projects"
] as const;

export const RESUME_PARAM_KEYS = {
    COMPACT: "compact",
    ORDER: "order",
    ATS: "ats"
} as const;

export const RESUME_DEFAULT_PARAMS: TResumeParams = {
    ats: false,
    compact: {
        skills: true,
        experience: true,
        projects: true
    },
    order: [
        "about",
        "whatIDo",
        "whatILookingFor",
        "skills",
        "experience",
        "projects",
        "education"
    ]
};

export type TResumeOrderKey = ( typeof RESUME_SECTION_KEYS )[number];
export type TResumeOrderKeyWithCompact = ( typeof RESUME_SECTION_WITH_COMPACT_KEYS )[number];

export type TResumeCompactParams = {
    [key in TResumeOrderKeyWithCompact]: boolean;
};

export type TResumeParams = {
    // ATS-safe mode: collapse multi-column sections to a single column
    ats: boolean

    // Per-section compact flags
    compact: TResumeCompactParams

    // Order of sections in the resume body
    order: TResumeOrderKey[]
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

export type TResumeProjectItem = {
    title: string;
    description: string;
    technologies: string[];
    github?: string;
};

export type TResumeProjectsProps = {
    items: TResumeProjectItem[];
    limit?: number;
};

export type TResumeEducationItem = {
    institution: string;
    credential: string;
    period: string;
    description?: string;
};

export type TResumeEducationProps = {
    items: TResumeEducationItem[];
};

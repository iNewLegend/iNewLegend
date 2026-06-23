import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";
import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";
import { useResumeAts } from "@inewlegend/website/src/features/resume/resume-ats-context.ts";

export type ResumeCompactSkill = {
    title: string;
    description: string;
};

export type ResumeCompactSkillsProps = {
    skills: ResumeCompactSkill[];
};

export function ResumeCompactSkills({ skills }: ResumeCompactSkillsProps) {
    const ats = useResumeAts();
    const gridClass = ats ? resumeTheme.layout.grid.compactSkillsAts : resumeTheme.layout.grid.compactSkills;

    return (
        <ResumeSection title="Skills">
            <div className={ gridClass }>
                {skills.map((s, idx) => (
                    <div key={idx} className="">
                        <div className={ `${ resumeTheme.text.sizes.xs } ${ resumeTheme.text.weights.medium } ${ resumeTheme.colors.muted } mb-0.5` }>{s.title}</div>
                        <ResumeTextBlock size="xs" justify={false}>{s.description}</ResumeTextBlock>
                    </div>
                ))}
            </div>
        </ResumeSection>
    );
}


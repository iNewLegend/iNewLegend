export type ResumeSkillsProps = {
    categories: Record<string, string[]>;
    isCompact: boolean;
};

import { resumeTheme } from "@inewlegend/website/src/components/resume/theme";
import { ResumeSectionHeading } from "@inewlegend/website/src/components/resume/section-heading";

export function ResumeSkills({ categories, isCompact }: ResumeSkillsProps) {
    if (isCompact) {
        return null;
    }

    return (
        <div className="">
            <ResumeSectionHeading title="Skills & Technologies" />
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {Object.entries(categories).map(([category, skillList]) => (
                    <div key={category}>
                        <h3 className="text-gray-800 font-medium mb-2">{category}</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {skillList.map((skill, index) => (
                                <span key={index} className={`px-2 py-0.5 rounded-full border text-[11px] ${resumeTheme.techChip}`}>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



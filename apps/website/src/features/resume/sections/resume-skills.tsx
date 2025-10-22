import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";
import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";

export type ResumeSkillsProps = {
    categories: Record<string, string[]>;
};

export function ResumeSkills( { categories }: ResumeSkillsProps ) {
    return (
        <ResumeSection title="Skills & Technologies">
            <div className={ resumeTheme.layout.grid.skills }>
                { Object.entries( categories ).map( ( [ category, skillList ] ) => (
                    <div key={ category }>
                        <h3 className={ `${ resumeTheme.colors.secondary } font-medium mb-2` }>{ category }</h3>
                        <div className="flex flex-wrap gap-1.5">
                            { skillList.map( ( skill, index ) => (
                                <span key={ index } className={ "px-2 py-0.5 rounded-full border text-xs bg-blue-50 text-blue-800 border-blue-200" }>{ skill }</span>
                            ) ) }
                        </div>
                    </div>
                ) ) }
            </div>
        </ResumeSection>
    );
}


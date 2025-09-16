import { config } from "@inewlegend/website/src/config";
import { ResumeHeader } from "@inewlegend/website/src/components/resume/header";
import { ResumeCompactSummary } from "@inewlegend/website/src/components/resume/compact-summary";
import { ResumeCompactSkills } from "@inewlegend/website/src/components/resume/compact-skills";
import { ResumeAbout } from "@inewlegend/website/src/components/resume/about";
import { ResumeExperience } from "@inewlegend/website/src/components/resume/experience";
import { ResumeProjects } from "@inewlegend/website/src/components/resume/projects";
import { ResumeSkills } from "@inewlegend/website/src/components/resume/skills";
import type { ExperienceItem } from "@inewlegend/website/src/components/resume/experience";
import type { ProjectItem } from "@inewlegend/website/src/components/resume/projects";
import { resumeTheme } from "@inewlegend/website/src/components/resume/theme";

export function Resume() {
    const { personal, hero, about, experience, projects, skills } = config;

    const search = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(search);
    const isCompact = params.get("compact") === "1";

    return (
        <div id="resume-content" className={`${resumeTheme.container} leading-relaxed p-6 pt-2 mx-auto`}>
            <ResumeHeader personal={personal} subtitle={hero.subtitle} />

            <div className="flex flex-col gap-4">
                {isCompact && (
                    <ResumeCompactSummary description={hero.description} />
                )}

                {isCompact && (
                    <ResumeCompactSkills skills={about.skills} />
                )}

                <ResumeAbout
                    description={hero.description}
                    whatIDoTitle={about.whatIDo.title}
                    whatIDoItems={about.whatIDo.items}
                    showAbout={!isCompact}
                />

                <ResumeExperience items={experience as ExperienceItem[]} isCompact={isCompact} />

                <ResumeProjects items={projects as ProjectItem[]} limit={6} isCompact={isCompact} />

                <ResumeSkills categories={skills} isCompact={isCompact} />
            </div>
        </div>
    );
}


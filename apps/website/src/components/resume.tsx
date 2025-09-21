
import { config } from "@inewlegend/website/src/config";
import { ResumeHeader } from "@inewlegend/website/src/features/resume/header";
import { ResumeCompactSummary, ResumeCompactSummary as ResumeSummary } from "@inewlegend/website/src/features/resume/compact-summary";
import { ResumeCompactSkills } from "@inewlegend/website/src/features/resume/compact-skills";
import { ResumeAbout } from "@inewlegend/website/src/features/resume/about";
import { ResumeExperience } from "@inewlegend/website/src/features/resume/experience";
import { ResumeSkills } from "@inewlegend/website/src/features/resume/skills";
import { ResumeProjects, ResumeCompactProjects } from "@inewlegend/website/src/features/resume/projects.tsx";

import { resumeTheme } from "@inewlegend/website/src/features/resume/theme";

import { parseResumeParams, getEffectiveOrder, toSearchParams } from "@inewlegend/website/src/features/resume/resume-params.ts";

import type { TResumeExperienceItem, TResumeParams } from "@inewlegend/website/src/features/resume/resume.definitions.ts";
import { useEffect, useMemo, useState } from "react";

export function Resume() {
    const { personal, hero, about, experience, projects  } = config;

    const [ params, setParams ] = useState<TResumeParams>( () => parseResumeParams() );

    useEffect( () => {
        const handler = ( e: MessageEvent ) => {
            if ( e.origin !== window.location.origin ) return;
            const data = e.data as { type?: string; payload?: TResumeParams };
            if ( data?.type === "Website/Resume/UpdateParams" && data.payload ) {
                setParams( data.payload );
                const sp = toSearchParams( data.payload );
                const newUrl = `${ window.location.pathname }${ sp.toString() ? `?${ sp.toString() }` : "" }`;
                window.history.replaceState( null, "", newUrl );
            }
        };
        window.addEventListener( "message", handler );
        return () => window.removeEventListener( "message", handler );
    }, [] );

    const orderedKeys = useMemo( () => getEffectiveOrder( params ), [ params ] );

    const renderSection: Record<string, () => React.ReactNode> = {
        summary: () =>  params.compact.summary ? <ResumeCompactSummary description={hero.description} /> :
            <ResumeSummary description={hero.description} />,
        skills: () => params.compact.skills ?
            <ResumeCompactSkills skills={config.compactSkills} /> : <ResumeSkills categories={config.skills} />,
        about: () => (
            <   ResumeAbout
                description={hero.description}
                whatIDoTitle={about.whatIDo.title}
                whatIDoItems={about.whatIDo.items}
                showAbout={true}
            />
        ),
        experience: () => <ResumeExperience items={experience as TResumeExperienceItem[]} isCompact={params.compact.experience}/>,
        projects: () =>  params.compact.projects ? <ResumeCompactProjects items={projects} /> :
            <ResumeProjects items={projects} />
    };

    return (
        <div id="resume-content" className={`${ resumeTheme.container } leading-relaxed p-6 pt-2 mx-auto`}>
            <ResumeHeader personal={personal} subtitle={hero.subtitle} />

            <div className="flex flex-col gap-4">
                {orderedKeys.map( ( key ) => {
                    const node = renderSection[ key ]?.();
                    return node ? <div key={key}>{node}</div> : null;
                } )}
            </div>
        </div>
    );
}



import { useEffect, useMemo, useState } from "react";

import { ResumeExperience } from "@inewlegend/website/src/features/resume/sections/resume-experience.tsx";

import { ResumeAbout } from "@inewlegend/website/src/features/resume/sections/resume-about.tsx";
import { ResumeWhatIDo } from "@inewlegend/website/src/features/resume/sections/resume-what-i-do.tsx";
import { ResumeWhatILookingFor } from "@inewlegend/website/src/features/resume/sections/resume-what-i-looking-for.tsx";
import { ResumeCompactSkills } from "@inewlegend/website/src/features/resume/sections/resume-compact-skills.tsx";

import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme";

import { parseResumeParams, getEffectiveOrder, toSearchParams } from "@inewlegend/website/src/features/resume/resume-params.ts";

import { config } from "@inewlegend/website/src/config";

import { ResumeSkills } from "@inewlegend/website/src/features/resume/sections/resume-skills.tsx";

import { ResumeHeader } from "@inewlegend/website/src/features/resume/resume-header.tsx";

import { ResumeProjects } from "@inewlegend/website/src/features/resume/sections/resume-projects.tsx";
import { ResumeCompactProjects } from "@inewlegend/website/src/features/resume/sections/resume-compact-projects.tsx";

import type { RESUME_SECTION_KEYS, TResumeExperienceItem, TResumeParams } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function Resume() {
    const { personal, hero, whatIDo, whatILookingFor, experience, projects } = config;

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

    const renderSection: Record<typeof RESUME_SECTION_KEYS[number], () => React.ReactNode> = {
        skills: () => params.compact.skills ?
            <ResumeCompactSkills skills={ config.compactSkills } /> : <ResumeSkills categories={ config.skills } />,
        about: () => (
            <ResumeAbout
                description={ hero.description }
            />
        ),
        whatIDo: () => <ResumeWhatIDo whatIDoTitle={ whatIDo.title } whatIDoItems={ whatIDo.items } />,
        whatILookingFor: () => <ResumeWhatILookingFor whatILookingForTitle={ whatILookingFor.title } whatILookingForItems={ whatILookingFor.items } />,
        experience: () => <ResumeExperience items={ experience as TResumeExperienceItem[] } isCompact={ params.compact.experience } />,
        projects: () => params.compact.projects ? <ResumeCompactProjects items={ projects } /> :
            <ResumeProjects items={ projects } />
    };

    return (
        <div id="resume-content" className={ `${ resumeTheme.container } leading-relaxed p-6 pt-2 mx-auto` }>
            <ResumeHeader personal={ personal } subtitle={ hero.subtitle } />

            <div className="flex flex-col gap-2">
                { orderedKeys.map( ( key ) => {
                    const node = renderSection[ key ]?.();
                    return node ? <div key={ key }>{ node }</div> : null;
                } ) }
            </div>
        </div>
    );
}


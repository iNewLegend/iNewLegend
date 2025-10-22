import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";

export type ResumePersonalInfo = {
    name: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
};

export type ResumeHeaderProps = {
    personal: ResumePersonalInfo;
    subtitle: string;
};

export function ResumeHeader( { personal, subtitle }: ResumeHeaderProps ) {
    return (
        <div className={ `text-center ${ resumeTheme.components.header.border } pb-2` }>
            <h1 className={ `text-2xl font-bold tracking-tight ${ resumeTheme.components.header.nameColor }` }>{ personal.name }</h1>

            <div className={ `text-base ${ resumeTheme.components.header.subtitleColor }` }>{ subtitle }</div>

            <div className={ `flex justify-center items-center gap-2 flex-wrap ${ resumeTheme.components.links.contact } pt-1` }>
                <a href={ `mailto:${ personal.email }` } className={ `${ resumeTheme.components.header.contactChip } ${ resumeTheme.components.header.contactChipHover }` }>
                    { personal.email }
                </a>
                <span className={ resumeTheme.components.header.contactChip }>
                    { personal.phone }
                </span>

                <a
                    href={ `https://www.google.com/maps/search/?api=1&query=${ encodeURIComponent( personal.location ) }` }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ `${ resumeTheme.components.header.contactChip } ${ resumeTheme.components.header.contactChipHover }` }
                >
                    { personal.location }
                </a>

                { [
                    { url: personal.github, text: personal.github },
                    { url: personal.linkedin, text: personal.linkedin },
                    { url: personal.portfolio, text: personal.portfolio }
                ].map( ( link, index ) => (
                    <a
                        key={ index }
                        href={ link.url }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={ `${ resumeTheme.components.header.contactChip } ${ resumeTheme.components.header.contactChipHover }` }
                    >
                        { link.text }
                    </a>
                ) ) }
            </div>
        </div>
    );
}


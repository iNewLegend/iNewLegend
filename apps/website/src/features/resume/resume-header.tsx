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
    highlights?: string[];
};

export function ResumeHeader( { personal, subtitle, highlights = [] }: ResumeHeaderProps ) {
    return (
        <div className={ `text-center ${ resumeTheme.components.header.border } pb-2` }>
            <h1 className={ `${ resumeTheme.text.sizes.lg } ${ resumeTheme.text.weights.bold } tracking-tight ${ resumeTheme.colors.name }` }>{ personal.name }</h1>

            <div className={ `${ resumeTheme.text.sizes.md } ${ resumeTheme.text.weights.normal } ${ resumeTheme.colors.subtitle }` }>{ subtitle }</div>

            { highlights.length > 0 && (
                <div className="flex justify-center items-center gap-2 flex-wrap pt-2 pb-1">
                    { highlights.map( ( highlight ) => (
                        <span
                            key={ highlight }
                            className={ `inline-flex items-center rounded-full px-3 py-1 ${ resumeTheme.text.sizes.xs } ${ resumeTheme.text.weights.semibold } ${ resumeTheme.colors.primary } bg-resume-chip-bg border border-resume-chip-border` }
                        >
                            { highlight }
                        </span>
                    ) ) }
                </div>
            ) }

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

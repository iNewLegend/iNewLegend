export type PersonalInfo = {
    name: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
};

export type ResumeHeaderProps = {
    personal: PersonalInfo;
    subtitle: string;
};

import { resumeTheme } from "@inewlegend/website/src/components/resume/theme";

export function ResumeHeader({ personal, subtitle }: ResumeHeaderProps) {
    return (
        <div className={`text-center ${resumeTheme.header.border} pb-5`}>
            <h1 className={`text-2xl font-bold tracking-tight ${resumeTheme.header.nameColor} mb-1`}>{personal.name}</h1>

            <div className={`text-base ${resumeTheme.header.subtitleColor} mb-4`}>{subtitle}</div>

            <div className="flex justify-center items-center gap-2 flex-wrap text-[10px] text-gray-700">
                <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-50">
                    {personal.email}
                </a>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200">
                    {personal.phone}
                </span>

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personal.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-50"
                >
                    {personal.location}
                </a>

                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-50">
                    {personal.github}
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-50">
                    {personal.linkedin}
                </a>
            </div>
        </div>
    );
}



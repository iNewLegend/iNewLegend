export type ProjectItem = {
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    demo?: string;
};

export type ResumeProjectsProps = {
    items: ProjectItem[];
    limit?: number;
    isCompact: boolean;
};

import { resumeTheme } from "@inewlegend/website/src/components/resume/theme";
import { ResumeSectionHeading } from "@inewlegend/website/src/components/resume/section-heading";

export function ResumeProjects({ items, limit, isCompact }: ResumeProjectsProps) {
    if (isCompact) {
        return null;
    }

    const visible = typeof limit === "number" ? items.slice(0, limit) : items;

    return (
        <div className="">
            <ResumeSectionHeading title="Projects" />
            {visible.map((project, index) => (
                <div key={index} className="mb-5 pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-start mb-1">
                        <a
                            className="font-semibold text-gray-900 hover:underline"
                            href={project.github || project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {project.title}
                        </a>
                    </div>
                    <p className="text-justify text-[15px] text-gray-800 mb-2">{project.description}</p>
                    {project.github && (
                        <a className="text-sm text-blue-700 hover:underline mb-2" href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className={`px-2 py-0.5 rounded-full border text-[11px] ${resumeTheme.techChip}`}>{tech}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}



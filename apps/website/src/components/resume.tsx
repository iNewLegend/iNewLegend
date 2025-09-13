import { config } from "@inewlegend/website/src/config";

export function Resume() {
    const { personal, hero, about, experience, projects, skills } = config;

    return (
        <div id="resume-content" className="bg-white text-gray-800 leading-relaxed p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8 border-b-2 border-blue-600 pb-5">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{personal.name}</h1>
                <div className="text-base text-gray-600 mb-4">{hero.subtitle}</div>
                <div className="flex justify-center gap-6 flex-wrap text-sm text-gray-600">
                    <a href={`mailto:${ personal.email }`} className="hover:underline">📧 {personal.email}</a>
                    <span>📱 {personal.phone}</span>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${ encodeURIComponent( personal.location ) }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        📍 {personal.location}
                    </a>
                    <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">🔗 {personal.github}</a>
                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">💼 {personal.linkedin}</a>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl text-blue-600 mb-4 border-b border-gray-200 pb-1">About</h2>
                <p className="mb-3 text-justify">{hero.description}</p>
                <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="text-blue-600 font-medium mb-2">{about.whatIDo.title}</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {about.whatIDo.items.map( ( item, index ) => (
                            <li key={index}>{item}</li>
                        ) )}
                    </ul>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl text-blue-600 mb-4 border-b border-gray-200 pb-1">Experience</h2>
                {experience.map( ( exp, index ) => (
                    <div key={index} className="mb-5 pb-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="font-semibold text-gray-900">{exp.title}</div>
                                <div className="text-sm text-gray-500">{exp.company} • {exp.location}</div>
                            </div>
                            <div className="text-sm text-gray-500">{exp.period}</div>
                        </div>
                        <p className="text-justify mb-2">{exp.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {exp.technologies.map( ( tech, techIndex ) => (
                                <span key={techIndex} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs border border-blue-100">{tech}</span>
                            ) )}
                        </div>
                    </div>
                ) )}
            </div>

            <div className="mb-8">
                <h2 className="text-xl text-blue-600 mb-4 border-b border-gray-200 pb-1">Projects</h2>
                {projects.slice( 0, 6 ).map( ( project, index ) => (
                    <div key={index} className="mb-5 pb-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                            <a
                                className="font-semibold text-gray-900 hover:underline"
                                href={project.github || project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.title}
                            </a>
                        </div>
                        <p className="text-justify mb-2">{project.description}</p>
                        <a className="text-justify mb-2" href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map( ( tech, techIndex ) => (
                                <span key={techIndex} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs border border-blue-100">{tech}</span>
                            ) )}
                        </div>
                    </div>
                ) )}
            </div>

            <div className="mb-8">
                <h2 className="text-xl text-blue-600 mb-4 border-b border-gray-200 pb-1">Skills & Technologies</h2>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {Object.entries( skills ).map( ( [ category, skillList ] ) => (
                        <div key={category}>
                            <h3 className="text-gray-700 font-medium mb-2">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skillList.map( ( skill, index ) => (
                                    <span key={index} className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">{skill}</span>
                                ) )}
                            </div>
                        </div>
                    ) )}
                </div>
            </div>
        </div>
    );
}


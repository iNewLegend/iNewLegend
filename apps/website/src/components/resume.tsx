import { config } from '@inewlegend/website/src/config';

export function Resume() {
    const { personal, hero, about, experience, projects, skills } = config;

    return (
        <div id="resume-content" className="resume-pdf bg-white text-black p-8 max-w-4xl mx-auto">
            <style jsx>{`
                .resume-pdf {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                
                .resume-pdf .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #2563eb;
                    padding-bottom: 20px;
                }
                
                .resume-pdf .header h1 {
                    font-size: 2.5rem;
                    color: #2563eb;
                    margin-bottom: 10px;
                }
                
                .resume-pdf .header .title {
                    font-size: 1.2rem;
                    color: #666;
                    margin-bottom: 15px;
                }
                
                .resume-pdf .contact-info {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    flex-wrap: wrap;
                    font-size: 0.9rem;
                    color: #666;
                }
                
                .resume-pdf .section {
                    margin-bottom: 30px;
                }
                
                .resume-pdf .section h2 {
                    font-size: 1.5rem;
                    color: #2563eb;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 5px;
                }
                
                .resume-pdf .section p {
                    margin-bottom: 10px;
                    text-align: justify;
                }
                
                .resume-pdf .experience-item, .resume-pdf .project-item {
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #f3f4f6;
                }
                
                .resume-pdf .experience-item:last-child, .resume-pdf .project-item:last-child {
                    border-bottom: none;
                }
                
                .resume-pdf .job-header, .resume-pdf .project-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 8px;
                }
                
                .resume-pdf .job-title, .resume-pdf .project-title {
                    font-weight: bold;
                    font-size: 1.1rem;
                    color: #1f2937;
                }
                
                .resume-pdf .company, .resume-pdf .period {
                    color: #666;
                    font-size: 0.9rem;
                }
                
                .resume-pdf .technologies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 10px;
                }
                
                .resume-pdf .tech-tag {
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    border: 1px solid #dbeafe;
                }
                
                .resume-pdf .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                }
                
                .resume-pdf .skill-category h3 {
                    font-size: 1.1rem;
                    color: #374151;
                    margin-bottom: 8px;
                }
                
                .resume-pdf .skill-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }
                
                .resume-pdf .skill-item {
                    background: #f9fafb;
                    color: #374151;
                    padding: 3px 8px;
                    border-radius: 3px;
                    font-size: 0.8rem;
                    border: 1px solid #e5e7eb;
                }
                
                .resume-pdf .what-i-do {
                    background: #f8fafc;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                
                .resume-pdf .what-i-do h3 {
                    color: #2563eb;
                    margin-bottom: 10px;
                }
                
                .resume-pdf .what-i-do ul {
                    list-style: none;
                    padding-left: 0;
                }
                
                .resume-pdf .what-i-do li {
                    margin-bottom: 5px;
                    padding-left: 15px;
                    position: relative;
                }
                
                .resume-pdf .what-i-do li:before {
                    content: "•";
                    color: #2563eb;
                    position: absolute;
                    left: 0;
                }
            `}</style>

            <div className="header">
                <h1>{personal.name}</h1>
                <div className="title">{hero.subtitle}</div>
                <div className="contact-info">
                    <span>📧 {personal.email}</span>
                    <span>📱 {personal.phone}</span>
                    <span>📍 {personal.location}</span>
                    <span>🔗 {personal.github}</span>
                    <span>💼 {personal.linkedin}</span>
                </div>
            </div>

            <div className="section">
                <h2>About</h2>
                <p>{hero.description}</p>
                
                <div className="what-i-do">
                    <h3>{about.whatIDo.title}</h3>
                    <ul>
                        {about.whatIDo.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="section">
                <h2>Experience</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                        <div className="job-header">
                            <div>
                                <div className="job-title">{exp.title}</div>
                                <div className="company">{exp.company} • {exp.location}</div>
                            </div>
                            <div className="period">{exp.period}</div>
                        </div>
                        <p>{exp.description}</p>
                        <div className="technologies">
                            {exp.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="section">
                <h2>Projects</h2>
                {projects.slice(0, 6).map((project, index) => (
                    <div key={index} className="project-item">
                        <div className="project-header">
                            <div className="project-title">{project.title}</div>
                        </div>
                        <p>{project.description}</p>
                        <div className="technologies">
                            {project.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="section">
                <h2>Skills & Technologies</h2>
                <div className="skills-grid">
                    {Object.entries(skills).map(([category, skillList]) => (
                        <div key={category} className="skill-category">
                            <h3>{category}</h3>
                            <div className="skill-list">
                                {skillList.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


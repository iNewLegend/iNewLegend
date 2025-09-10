import { Calendar, MapPin, Building } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";

export function Experience() {
    const experiences = [
        {
            title: "Senior Full Stack Developer",
            company: "Tech Company",
            location: "Remote",
            period: "2022 - Present",
            description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
            technologies: [ "React", "TypeScript", "Node.js", "AWS", "PostgreSQL" ]
        },
        {
            title: "Full Stack Developer",
            company: "Startup Inc",
            location: "San Francisco, CA",
            period: "2020 - 2022",
            description: "Developed and maintained multiple web applications from concept to deployment. Collaborated with cross-functional teams to deliver high-quality products.",
            technologies: [ "React", "Express", "MongoDB", "Docker", "Kubernetes" ]
        },
        {
            title: "Frontend Developer",
            company: "Digital Agency",
            location: "New York, NY",
            period: "2019 - 2020",
            description: "Created responsive and interactive user interfaces for various clients. Focused on performance optimization and user experience.",
            technologies: [ "React", "Vue.js", "Sass", "Webpack", "Jest" ]
        }
    ];

    return (
        <section id="experience" className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
                    <p className="text-lg text-muted-foreground">
                        My professional journey in software development
                    </p>
                </div>

                <div className="space-y-8">
                    {experiences.map( ( exp, index ) => (
                        <Card key={index} className="relative">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                                        <div className="flex items-center text-muted-foreground mb-2">
                                            <Building className="h-4 w-4 mr-2" />
                                            {exp.company}
                                        </div>
                                        <div className="flex items-center text-muted-foreground mb-2">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            {exp.location}
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {exp.period}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map( ( tech, techIndex ) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ) )}
                                </div>
                            </CardContent>
                        </Card>
                    ) )}
                </div>
            </div>
        </section>
    );
}

import { Code, Database, Cloud, Smartphone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";

export function About() {
    const skills = [
        { icon: Code, title: "Frontend Development", description: "React, TypeScript, Next.js, Tailwind CSS" },
        { icon: Database, title: "Backend Development", description: "Node.js, Express, PostgreSQL, MongoDB" },
        { icon: Cloud, title: "Cloud & DevOps", description: "AWS, Docker, CI/CD, Serverless" },
        { icon: Smartphone, title: "Mobile Development", description: "React Native, Flutter" },
    ];

    return (
        <section id="about" className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        I'm a passionate full-stack developer with a love for creating innovative solutions
                        and solving complex problems through technology.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                        <p className="text-muted-foreground mb-4">
                            With several years of experience in web development, I've worked on projects
                            ranging from small business websites to large-scale enterprise applications.
                            I believe in writing clean, maintainable code and following best practices.
                        </p>
                        <p className="text-muted-foreground">
                            When I'm not coding, you can find me exploring new technologies, contributing
                            to open-source projects, or sharing knowledge with the developer community.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                Full-stack web application development
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                API design and implementation
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                Database design and optimization
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                Cloud infrastructure and deployment
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                Code review and mentoring
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map( ( skill, index ) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <skill.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <CardTitle className="text-lg">{skill.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{skill.description}</p>
                            </CardContent>
                        </Card>
                    ) )}
                </div>
            </div>
        </section>
    );
}

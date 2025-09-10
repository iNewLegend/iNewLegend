import { ExternalLink, Github } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";
import { Button } from "@inewlegend/website/src/components/ui/button";
import { config } from "@inewlegend/website/src/config";

export function Projects() {

    return (
        <section id="projects" className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
                    <p className="text-lg text-muted-foreground">
                        Some of my recent work and side projects
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {config.projects.map( ( project, index ) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <p className="text-muted-foreground mb-4">{project.description}</p>
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map( ( tech, techIndex ) => (
                                            <span
                                                key={techIndex}
                                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                                            >
                                                {tech}
                                            </span>
                                        ) )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1" asChild>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4 mr-2" />
                                            Code
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1" asChild>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Demo
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) )}
                </div>
            </div>
        </section>
    );
}

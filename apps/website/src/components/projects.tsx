import { ExternalLink, Github } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";
import { Button } from "@inewlegend/website/src/components/ui/button";

export function Projects() {
    const projects = [
        {
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, payment processing, and admin dashboard.",
            image: "/api/placeholder/400/250",
            technologies: [ "React", "Node.js", "PostgreSQL", "Stripe", "AWS" ],
            github: "#",
            demo: "#"
        },
        {
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            image: "/api/placeholder/400/250",
            technologies: [ "React", "Socket.io", "MongoDB", "Express", "Tailwind CSS" ],
            github: "#",
            demo: "#"
        },
        {
            title: "Weather Dashboard",
            description: "A responsive weather dashboard that displays current weather conditions and forecasts for multiple locations with interactive maps.",
            image: "/api/placeholder/400/250",
            technologies: [ "React", "TypeScript", "OpenWeather API", "Chart.js", "PWA" ],
            github: "#",
            demo: "#"
        }
    ];

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
                    {projects.map( ( project, index ) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-video bg-muted"></div>
                            <CardHeader>
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map( ( tech, techIndex ) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                                        >
                                            {tech}
                                        </span>
                                    ) )}
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Github className="h-4 w-4 mr-2" />
                                        Code
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Demo
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

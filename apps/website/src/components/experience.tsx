import { Calendar, MapPin, Building } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";
import { config } from "@inewlegend/website/src/config";

export function Experience() {

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
                    {config.experience.map( ( exp, index ) => (
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

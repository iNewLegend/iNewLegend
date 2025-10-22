import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";
import { config } from "@inewlegend/website/src/config";

export function Projects() {
    const handleProjectClick = ( url: string ) => {
        window.open( url, "_blank", "noopener,noreferrer" );
    };

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
                    { config.projects.map( ( project, index ) => (
                        <Card
                            key={ index }
                            className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer"
                            onClick={ () => handleProjectClick( project.github ) }
                        >
                            <CardHeader>
                                <CardTitle className="text-xl">{ project.title }</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <p className="text-muted-foreground mb-4">{ project.description }</p>
                                </div>

                                <div>
                                    <div className="flex flex-wrap gap-2">
                                        { project.technologies.map( ( tech, techIndex ) => (
                                            <span
                                                key={ techIndex }
                                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                                            >
                                                { tech }
                                            </span>
                                        ) ) }
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) ) }
                </div>
            </div>
        </section>
    );
}

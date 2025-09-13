import { Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@inewlegend/website/src/components/ui/button";
import { config } from "@inewlegend/website/src/config";
import { downloadResumePDFViaService } from "@inewlegend/website/src/lib/pdf-generator";

export function Hero() {
    const handleDownloadResume = async() => {
        try {
            await downloadResumePDFViaService();
        } catch ( error ) {
            console.error( "Error generating resume via service:", error );
        }
    };

    return (
        <section id="home" className="pt-20 pb-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {config.hero.title}&nbsp;
                        <span className="text-primary">{config.personal.name}</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        {config.hero.subtitle}
                    </p>

                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        {config.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button size="lg" className="w-full sm:w-auto" onClick={handleDownloadResume}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Resume
                        </Button>

                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" asChild>
                                <a href={config.personal.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={config.personal.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={`mailto:${ config.personal.email }`}>
                                    <Mail className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

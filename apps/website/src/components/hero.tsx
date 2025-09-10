import { Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@inewlegend/website/src/components/ui/button";

export function Hero() {
    return (
        <section id="home" className="pt-20 pb-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Hi, I'm{" "}
                        <span className="text-primary">Leonid Vinikov</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        Full Stack Developer
                    </p>

                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Passionate about creating innovative web applications with modern technologies.
                        I specialize in React, Node.js, and cloud technologies to build scalable solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button size="lg" className="w-full sm:w-auto">
                            <Download className="mr-2 h-4 w-4" />
                            Download Resume
                        </Button>

                        <div className="flex gap-4">
                            <Button variant="outline" size="icon">
                                <Github className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Scroll down to explore my work
                    </div>
                </div>
            </div>
        </section>
    );
}

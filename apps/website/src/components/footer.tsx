import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-muted-foreground">
                            © 2024 Leonid Vinikov. Made with{" "}
                            <Heart className="inline h-4 w-4 text-red-500" />{" "}
                            using React & Tailwind CSS
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import { Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@inewlegend/website/src/components/ui/button";
import { config } from "@inewlegend/website/src/config";

export function ResumeControlsSocialLinks() {
    return (
        <div className="flex gap-3">
            <Button
                variant="outline"
                size="icon"
                asChild
                className="border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <a href={ config.personal.github } target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                </a>
            </Button>
            <Button
                variant="outline"
                size="icon"
                asChild
                className="border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <a href={ config.personal.linkedin } target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                </a>
            </Button>
            <Button
                variant="outline"
                size="icon"
                asChild
                className="border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <a href={ `mailto:${ config.personal.email }` }>
                    <Mail className="h-4 w-4" />
                </a>
            </Button>
        </div>
    );
}

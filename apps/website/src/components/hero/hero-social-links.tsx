import { Github, Linkedin, Mail } from "lucide-react";

import { config } from "@inewlegend/website/src/config";
import { HeroSocialLinkButton } from "@inewlegend/website/src/components/hero/hero-social-link-button";

export function HeroSocialLinks() {
    return (
        <div className="flex gap-3">
            <HeroSocialLinkButton
                href={ config.personal.github }
                aria-label="GitHub"
                Icon={ Github }
            />
            <HeroSocialLinkButton
                href={ config.personal.linkedin }
                aria-label="LinkedIn"
                Icon={ Linkedin }
            />
            <HeroSocialLinkButton
                href={ `mailto:${ config.personal.email }` }
                aria-label="Email"
                Icon={ Mail }
            />
        </div>
    );
}

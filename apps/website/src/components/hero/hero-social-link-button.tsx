import { Button } from "@inewlegend/website/src/components/ui/button";

import type { LucideIcon } from "lucide-react";

interface SocialLinkButtonProps {
    href: string;
    "aria-label": string;
    Icon: LucideIcon;
}

export function HeroSocialLinkButton( { href, "aria-label": ariaLabel, Icon }: SocialLinkButtonProps ) {
    return (
        <Button
            variant="outline"
            size="icon"
            asChild
            className="border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition-all duration-200 shadow-sm hover:shadow-md"
        >
            <a href={ href } target="_blank" rel="noopener noreferrer" aria-label={ ariaLabel }>
                <Icon className="h-4 w-4" />
            </a>
        </Button>
    );
}

import { useState } from "react";
import { Code, Database, Cloud, Smartphone, List } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";
import { Button } from "@inewlegend/website/src/components/ui/button";
import { SkillsPopup } from "@inewlegend/website/src/components/skills-popup";
import { config } from "@inewlegend/website/src/config";

export function About() {
    const [ isSkillsPopupOpen, setIsSkillsPopupOpen ] = useState( false );

    const iconMap = {
        Code,
        Database,
        Cloud,
        Smartphone
    };

    return (
        <section id="about" className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{ config.about.title }</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        { config.about.description }
                    </p>
                    <Button
                        variant="outline"
                        onClick={ () => setIsSkillsPopupOpen( true ) }
                        className="inline-flex items-center gap-2"
                    >
                        <List className="h-4 w-4" />
                        View All Skills
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">{ config.about.journey.title }</h3>
                        <p className="text-muted-foreground">
                            { config.about.journey.content }
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4">{ config.about.whatIDo.title }</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            { config.about.whatIDo.items.map( ( item, index ) => (
                                <li key={ index } className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    { item }
                                </li>
                            ) ) }
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    { config.compactSkills.map( ( skill, index ) => {
                        const IconComponent = iconMap[ skill.icon as keyof typeof iconMap ];
                        return (
                            <Card key={ index } className="text-center">
                                <CardHeader>
                                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <CardTitle className="text-lg">{ skill.title }</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{ skill.description }</p>
                                </CardContent>
                            </Card>
                        );
                    } ) }
                </div>
            </div>

            <SkillsPopup
                isOpen={ isSkillsPopupOpen }
                onClose={ () => setIsSkillsPopupOpen( false ) }
            />
        </section>
    );
}

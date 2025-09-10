import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@inewlegend/website/src/components/ui/button";

interface HeaderProps {
    activeSection: string
    setActiveSection: ( section: string ) => void
}

export function Header( { activeSection, setActiveSection }: HeaderProps ) {
    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const navItems = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" },
    ];

    const scrollToSection = ( sectionId: string ) => {
        setActiveSection( sectionId );
        const element = document.getElementById( sectionId );
        if ( element ) {
            element.scrollIntoView( { behavior: "smooth" } );
        }
        setIsMenuOpen( false );
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="text-xl font-bold">
                        Leonid Vinikov
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map( ( item ) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection( item.id )}
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    activeSection === item.id ? "text-primary" : "text-muted-foreground"
                                }`}
                            >
                                {item.label}
                            </button>
                        ) )}
                    </nav>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen( !isMenuOpen )}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-2">
                            {navItems.map( ( item ) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection( item.id )}
                                    className={`text-left px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                                        activeSection === item.id ? "text-primary" : "text-muted-foreground"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ) )}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

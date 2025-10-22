import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

import { Button } from "@inewlegend/website/src/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@inewlegend/website/src/components/ui/dropdown-menu";

interface ThemeVariable {
    name: string;
    label: string;
    value: string;
    type: "color" | "size";
}

interface ThemeSection {
    title: string;
    variables: ThemeVariable[];
}

export function ResumeControlsThemeEditor() {
    const [ theme, setTheme ] = useState<ThemeSection[]>( [] );

    useEffect( () => {
        console.log( "ResumeControlsThemeEditor mounted" );
        // Read CSS variables from the document
        const root = document.documentElement;
        const computedStyle = getComputedStyle( root );

        const sections: ThemeSection[] = [
            {
                title: "Colors",
                variables: [
                    { name: "--resume-accent", label: "Accent", value: "", type: "color" },
                    { name: "--resume-heading", label: "Heading", value: "", type: "color" },
                    { name: "--resume-name", label: "Name", value: "", type: "color" },
                    { name: "--resume-subtitle", label: "Subtitle", value: "", type: "color" },
                    { name: "--resume-primary", label: "Primary Text", value: "", type: "color" },
                    { name: "--resume-secondary", label: "Secondary Text", value: "", type: "color" },
                    { name: "--resume-muted", label: "Muted Text", value: "", type: "color" },
                ],
            },
            {
                title: "Chip Colors",
                variables: [
                    { name: "--resume-chip-bg", label: "Background", value: "", type: "color" },
                    { name: "--resume-chip-text", label: "Text", value: "", type: "color" },
                    { name: "--resume-chip-border", label: "Border", value: "", type: "color" },
                ],
            },
            {
                title: "Border Colors",
                variables: [
                    { name: "--resume-border-primary", label: "Primary", value: "", type: "color" },
                    { name: "--resume-border-secondary", label: "Secondary", value: "", type: "color" },
                    { name: "--resume-border-accent", label: "Accent", value: "", type: "color" },
                    { name: "--resume-border-chip", label: "Chip", value: "", type: "color" },
                ],
            },
            {
                title: "Text Sizes",
                variables: [
                    { name: "--resume-text-xs", label: "Extra Small", value: "", type: "size" },
                    { name: "--resume-text-sm", label: "Small", value: "", type: "size" },
                    { name: "--resume-text-md", label: "Medium", value: "", type: "size" },
                    { name: "--resume-text-lg", label: "Large", value: "", type: "size" },
                ],
            },
            {
                title: "Font Weights",
                variables: [
                    { name: "--resume-font-normal", label: "Normal", value: "", type: "size" },
                    { name: "--resume-font-medium", label: "Medium", value: "", type: "size" },
                    { name: "--resume-font-semibold", label: "Semibold", value: "", type: "size" },
                    { name: "--resume-font-bold", label: "Bold", value: "", type: "size" },
                ],
            },
        ];

        // Populate current values
        sections.forEach( ( section ) => {
            section.variables.forEach( ( variable ) => {
                variable.value = computedStyle.getPropertyValue( variable.name ).trim();
            } );
        } );

        setTheme( sections );
    }, [] );

    const handleChange = ( varName: string, value: string ) => {
        // Update in parent document
        document.documentElement.style.setProperty( varName, value );

        // Update in iframe (where the resume is rendered)
        const iframe = document.querySelector( 'iframe[title="Resume Preview"]' ) as HTMLIFrameElement;
        if ( iframe?.contentWindow?.document ) {
            iframe.contentWindow.document.documentElement.style.setProperty( varName, value );
        }

        setTheme( ( prev ) =>
            prev.map( ( section ) => ( {
                ...section,
                variables: section.variables.map( ( v ) =>
                    v.name === varName ? { ...v, value } : v
                ),
            } ) )
        );
    };

    const resetTheme = () => {
        // Reset in parent document
        theme.forEach( ( section ) => {
            section.variables.forEach( ( variable ) => {
                document.documentElement.style.removeProperty( variable.name );
            } );
        } );

        // Reset in iframe
        const iframe = document.querySelector( 'iframe[title="Resume Preview"]' ) as HTMLIFrameElement;
        if ( iframe?.contentWindow?.document ) {
            theme.forEach( ( section ) => {
                section.variables.forEach( ( variable ) => {
                    iframe.contentWindow!.document.documentElement.style.removeProperty( variable.name );
                } );
            } );
        }

        // Re-read values after reset
        const root = document.documentElement;
        const computedStyle = getComputedStyle( root );

        setTheme( ( prev ) =>
            prev.map( ( section ) => ( {
                ...section,
                variables: section.variables.map( ( v ) => ( {
                    ...v,
                    value: computedStyle.getPropertyValue( v.name ).trim(),
                } ) ),
            } ) )
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="gradient" size="sm">
                    <Palette className="mr-2 h-4 w-4" />
                    Edit Theme
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[32rem] max-h-[80vh] overflow-y-auto p-4 bg-white/95 backdrop-blur-sm border border-resume-secondary shadow-xl">
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-slate-900">Customize Theme</h3>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={ resetTheme }
                            className="h-7 text-xs"
                        >
                            Reset
                        </Button>
                    </div>

                    { theme.map( ( section ) => (
                        <div key={ section.title } className="space-y-2">
                            <h4 className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                                { section.title }
                            </h4>
                            <div className="space-y-2">
                                { section.variables.map( ( variable ) => (
                                    <div
                                        key={ variable.name }
                                        className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <label
                                            htmlFor={ variable.name }
                                            className="text-xs text-slate-600 min-w-[100px]"
                                        >
                                            { variable.label }
                                        </label>
                                        <div className="flex items-center gap-2">
                                            { variable.type === "color" ? (
                                                <>
                                                    <input
                                                        type="color"
                                                        id={ variable.name }
                                                        value={ variable.value.startsWith( "#" ) ? variable.value : "#000000" }
                                                        onChange={ ( e ) => handleChange( variable.name, e.target.value ) }
                                                        className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={ variable.value }
                                                        onChange={ ( e ) => handleChange( variable.name, e.target.value ) }
                                                        className="w-24 px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </>
                                            ) : (
                                                <input
                                                    type="text"
                                                    id={ variable.name }
                                                    value={ variable.value }
                                                    onChange={ ( e ) => handleChange( variable.name, e.target.value ) }
                                                    className="w-24 px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) }
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        </div>
                    ) ) }
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

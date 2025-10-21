import { ArrowUp, ArrowDown, Sparkles } from "lucide-react";

import { Button } from "@inewlegend/website/src/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@inewlegend/website/src/components/ui/dropdown-menu";

import { RESUME_SECTION_WITH_COMPACT_KEYS } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

import type { TResumeOrderKey, TResumeOrderKeyWithCompact, TResumeParams } from "src/features/resume/resume.definitions.ts";

interface SectionEditorProps {
    params: TResumeParams;
    onMove: ( key: TResumeOrderKey, dir: "up" | "down" ) => void;
    onToggleCompact: ( key: TResumeOrderKey ) => void;
}

export function ResumeControlsSectionEditor( { params, onMove, onToggleCompact }: SectionEditorProps ) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="gradient"
                    size="sm"
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Edit Sections
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[32rem] p-4 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl">
                <div className="space-y-3">
                    { params.order?.map( ( key, index ) => {
                        const label = key[ 0 ].toUpperCase() + key.slice( 1 );
                        const isCompact = key in params.compact ? params.compact[ key as keyof typeof params.compact ] : false;
                        const canCompact = RESUME_SECTION_WITH_COMPACT_KEYS.includes( key as TResumeOrderKeyWithCompact );

                        return (
                            <div
                                key={ key }
                                className="group flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 hover:bg-slate-100/70 hover:border-slate-300 transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-xs font-medium text-slate-600 group-hover:bg-slate-300 transition-colors">
                                        { index + 1 }
                                    </div>
                                    <span className="text-sm font-medium text-slate-900">{ label }</span>
                                    { canCompact && (
                                        <span className={ `px-2 py-1 text-xs rounded-full ${ isCompact
                                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                                            : "bg-slate-100 text-slate-600 border border-slate-200"
                                        }` }>
                                            { isCompact ? "Compact" : "Full" }
                                        </span>
                                    ) }
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    { canCompact && (
                                        <Button
                                            variant={ isCompact ? "default" : "outline" }
                                            size="sm"
                                            onClick={ () => onToggleCompact( key ) }
                                            aria-label={ `Toggle compact for ${ label }` }
                                            className={ `h-8 px-3 ${ isCompact
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : "border-slate-300 hover:bg-slate-100"
                                            }` }
                                        >
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            { isCompact ? "Full" : "Compact" }
                                        </Button>
                                    ) }
                                    <div className="flex flex-col gap-1">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={ () => onMove( key, "up" ) }
                                            aria-label={ `Move ${ label } up` }
                                            className="h-6 w-6 border-slate-300 hover:bg-slate-100"
                                            disabled={ index === 0 }
                                        >
                                            <ArrowUp className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={ () => onMove( key, "down" ) }
                                            aria-label={ `Move ${ label } down` }
                                            className="h-6 w-6 border-slate-300 hover:bg-slate-100"
                                            disabled={ index === params.order.length - 1 }
                                        >
                                            <ArrowDown className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    } ) }
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

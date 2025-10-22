import { Download, Loader2 } from "lucide-react";

import { Button } from "@inewlegend/website/src/components/ui/button";
import { PdfProgress } from "@inewlegend/website/src/lib/pdf-generator";

interface ResumeControlsProps {
    generating: boolean;
    step: string | null;
    onConvertToPdf: () => void;
    children: React.ReactNode;
}

export function ResumeControls( { generating, step, onConvertToPdf, children }: ResumeControlsProps ) {
    return (
        <div className="border-b border-resume-secondary bg-gradient-to-r from-slate-50 to-white p-4 flex items-center gap-4 shadow-sm">
            { children }
            <div className="ml-auto flex items-center gap-4">
                { generating && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-resume-secondary rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-blue-700 font-medium">
                            { step ?? PdfProgress.Prepare }
                        </span>
                    </div>
                ) }
                <Button
                    size="sm"
                    onClick={ onConvertToPdf }
                    disabled={ generating }
                    variant="gradient"
                >
                    { generating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Converting…
                        </>
                    ) : (
                        <>
                            <Download className="mr-2 h-4 w-4" />
                            Convert to PDF
                        </>
                    ) }
                </Button>
            </div>
        </div>
    );
}

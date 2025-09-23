import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@inewlegend/website/src/components/ui/button";

import { ResumeSectionEditor } from "@inewlegend/website/src/components/hero/resume-section-editor.tsx";

import { ResumeSocialLinks } from "@inewlegend/website/src/components/hero/resume-social-links.tsx";

import { RESUME_DEFAULT_PARAMS, RESUME_SECTION_KEYS } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

import { config } from "@inewlegend/website/src/config";
import { downloadResumePDFViaService, PdfProgress } from "@inewlegend/website/src/lib/pdf-generator";
import { toSearchParams } from "@inewlegend/website/src/features/resume/resume-params.ts";

import { ResumeDialog } from "@inewlegend/website/src/components/hero/resume-dialog";
import { ResumeControls } from "@inewlegend/website/src/components/hero/resume-controls";
import { ResumePreview } from "@inewlegend/website/src/components/hero/resume-preview";

import type { TResumeOrderKey, TResumeParams } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function Hero() {
    const [resumeOpen, setResumeOpen] = useState(false);
    const [params, setParams] = useState<TResumeParams>(RESUME_DEFAULT_PARAMS);
    const [generating, setGenerating] = useState(false);
    const [step, setStep] = useState<string | null>(null);
    const [autoConvert, setAutoConvert] = useState(false);

    const resumeSrc = useMemo(() => {
        const sp = toSearchParams(params);
        const qs = sp.toString();
        return `/print/resume${qs ? `?${qs}` : ""}`;
    }, [params]);

    const move = (key: TResumeOrderKey, dir: "up" | "down") => {
        setParams((prev) => {
            const order = prev.order ? [...prev.order] : [...RESUME_SECTION_KEYS];
            const idx = order.indexOf(key);
            if (idx < 0) return prev;
            const target = dir === "up" ? idx - 1 : idx + 1;
            if (target < 0 || target >= order.length) return prev;
            const next = [...order];
            const [item] = next.splice(idx, 1);
            next.splice(target, 0, item);
            return { ...prev, order: next };
        });
    };

    const toggleCompactFor = (key: TResumeOrderKey) => {
        setParams((prev) => {
            if (key in prev.compact) {
                return {
                    ...prev,
                    compact: {
                        ...prev.compact,
                        [key]: !prev.compact[key as keyof typeof prev.compact]
                    }
                };
            }
            return prev;
        });
    };

    const handleConvertToPdf = async () => {
        if (generating) return;
        setGenerating(true);
        setStep(PdfProgress.Prepare);
        try {
            await downloadResumePDFViaService(
                resumeSrc,
                {
                    filename: "leonid-resume.pdf",
                    onProgress: setStep,
                }
            );
        } catch (error) {
            console.error("Error generating PDF:", error);
            setStep("Error");
        } finally {
            setGenerating(false);
            setTimeout(() => setStep(null), 1200);
        }
    };

    useEffect(() => {
        const u = new URL(window.location.href);
        const resumeParam = u.searchParams.get("resume");
        const convertParam = u.searchParams.get("convert");

        if (resumeParam === "open" || resumeParam === "1") setResumeOpen(true);

        if (convertParam === "1" || convertParam === "true") {
            setResumeOpen(true);
            setAutoConvert(true);
        }
    }, []);

    useEffect(() => {
        if (autoConvert && resumeOpen && !generating) {
            const id = setTimeout(() => {
                handleConvertToPdf();
                setAutoConvert(false);
            }, 500);

            return () => clearTimeout(id);
        }
    }, [autoConvert, resumeOpen, generating]);

    const handleOpenChange = (open: boolean) => {
        setResumeOpen(open);
    };

    return (
        <section id="home" className="pt-20 pb-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {config.hero.title}&nbsp;
                        <span className="text-primary">{config.personal.name}</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        {config.hero.subtitle}
                    </p>

                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        {config.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto"
                            onClick={() => setResumeOpen(true)}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Generate Resume
                        </Button>

                        <ResumeSocialLinks />
                    </div>

                    <ResumeDialog
                        open={resumeOpen}
                        onOpenChange={handleOpenChange}
                    >
                        <ResumeControls
                            generating={generating}
                            step={step}
                            onConvertToPdf={handleConvertToPdf}
                        >
                            <ResumeSectionEditor
                                params={params}
                                onMove={move}
                                onToggleCompact={toggleCompactFor}
                            />
                        </ResumeControls>
                        <ResumePreview src={resumeSrc} params={params} />
                    </ResumeDialog>
                </div>
            </div>
        </section>
    );

}

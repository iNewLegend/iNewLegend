import * as React from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Dialog } from "@inewlegend/website/src/components/ui/dialog";
import { cn } from "@inewlegend/website/src/lib/utils";

interface ResumeDialogProps {
    open: boolean;
    onOpenChange: ( open: boolean ) => void;
    children: React.ReactNode;
}

const CustomDialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>( ( { className, children, ...props }, ref ) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
            className={ cn(
                "fixed inset-0 z-50 bg-black/80",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            ) }
        />
        <DialogPrimitive.Content
            ref={ ref }
            className={ cn(
                "fixed left-1/2 top-1/2 z-50 grid w-full max-w-4xl",
                "-translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg",
                "duration-200 sm:rounded-lg",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                className
            ) }
            { ...props }
        >
            { children }
        </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
) );
CustomDialogContent.displayName = "CustomDialogContent";

export function ResumeControlsDialog( { open, onOpenChange, children }: ResumeDialogProps ) {
    return (
        <Dialog open={ open } onOpenChange={ onOpenChange }>
            <CustomDialogContent className="max-w-[1200px] w-[95vw] h-[90vh] p-0 overflow-hidden border-0 shadow-2xl bg-white">
                <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-white">
                    { children }
                    <div className="border-t border-resume-secondary bg-slate-100/50 h-px"></div>
                </div>
            </CustomDialogContent>
        </Dialog>
    );
}

import { memo, useRef, useEffect, useState, useMemo } from "react";

import type { TResumeParams } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

interface ResumePreviewProps {
    src: string;
    params: TResumeParams;
}

export const ResumeControlsPreview = memo( function ResumePreview( { src, params }: ResumePreviewProps ) {
    const iframeRef = useRef<HTMLIFrameElement>( null );

    const baseSrc = useMemo( () => {
        const idx = src.indexOf( "?" );
        return idx >= 0 ? src.slice( 0, idx ) : src;
    }, [ src ] );

    const [ currentBaseSrc, setCurrentBaseSrc ] = useState( baseSrc );

    useEffect( () => {
        if ( baseSrc !== currentBaseSrc ) {
            if ( iframeRef.current ) {
                iframeRef.current.src = baseSrc;
            }
            setCurrentBaseSrc( baseSrc );
        }
    }, [ baseSrc, currentBaseSrc ] );

    useEffect( () => {
        const win = iframeRef.current?.contentWindow;
        if ( !win ) return;
        try {
            win.postMessage( {
                type: "Website/Resume/UpdateParams",
                payload: params
            }, window.location.origin );
        } catch { }
    }, [ params ] );

    return (
        <div className="flex-1 bg-white text-black relative overflow-hidden">
            <iframe
                ref={ iframeRef }
                title="Resume Preview"
                src={ currentBaseSrc }
                className="w-full h-full border-0 shadow-inner"
                style={ {
                    background: "white",
                    borderRadius: "0 0 8px 8px"
                } }
            />
        </div>
    );
} );

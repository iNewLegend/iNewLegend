export enum PdfProgress {
    Prepare = "Generate HTML",
    Converting = "Converting HTML to PDF",
    Saving = "Saving",
    Done = "Done"
}

type DownloadResumeOptions = {
    filename?: string;
    onProgress?: ( step: PdfProgress ) => void
};

export async function downloadResumePDFViaService( resumeUrl: string, options?: DownloadResumeOptions ): Promise<void> {
    const { onProgress } = options || {};

    onProgress?.( PdfProgress.Prepare );
    const serviceUrl = import.meta.env.DEV ? import.meta.env.VITE_WEBSITE_PDF_SERVICE_DEV_URL :
        import.meta.env.VITE_WEBSITE_PDF_SERVICE_URL;

    if ( !serviceUrl ) {
        throw new Error( "WEBSITE_PDF_SERVICE_URL is not configured" );
    }

    const html = await renderResumeHTMLViaRoute( resumeUrl, options );

    onProgress?.( PdfProgress.Converting );

    const response = await fetch( serviceUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/pdf"
        },
        body: JSON.stringify( { html } )
    } );

    if ( !response.ok ) {
        throw new Error( `PDF service error: ${ response.status }` );
    }

    const contentType = response.headers.get( "content-type" ) || "";
    if ( !contentType.includes( "application/pdf" ) ) {
        const text = await response.text();
        console.error( "PDF service returned non-PDF response (first 300 chars):", text.slice( 0, 300 ) );
        throw new Error( "PDF service did not return a PDF" );
    }

    const cloneForDebug = response.clone();
    const blob = await response.blob();
    if ( blob.size === 0 ) {
        const debugText = await cloneForDebug.text().catch( () => "" );
        console.error( "PDF service returned empty body. Debug (first 300 chars):", debugText.slice( 0, 300 ) );
        throw new Error( "PDF service returned empty PDF body" );
    }
    const url = URL.createObjectURL( blob );
    const filename = options?.filename ?? "resume.pdf";

    const isIOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
    const isSafari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent );

    if ( isIOS || isSafari ) {
        window.open( url, "_blank" );
        setTimeout( () => URL.revokeObjectURL( url ), 2000 );
        return;
    }

    onProgress?.( PdfProgress.Saving );
    const link = document.createElement( "a" );
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild( link );
    link.click();
    document.body.removeChild( link );
    setTimeout( () => URL.revokeObjectURL( url ), 1000 );

    onProgress?.( PdfProgress.Done );
}

async function renderResumeHTMLViaRoute( resumeUrl: string, _options?: DownloadResumeOptions ): Promise<string> {
    return new Promise<string>( ( resolve, reject ) => {
        const iframe = document.createElement( "iframe" );
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        iframe.referrerPolicy = "no-referrer";

        const cleanup = () => {
            try { document.body.removeChild( iframe ); } catch {}
        };

        let timeoutId: number | undefined;
        let intervalId: number | undefined;

        const finish = () => {
            if ( intervalId ) window.clearInterval( intervalId );
            if ( timeoutId ) window.clearTimeout( timeoutId );
            cleanup();
        };

        const startPollingForResume = () => {
            const doc = iframe.contentDocument;
            if ( !doc ) return;

            intervalId = window.setInterval( () => {
                const resumeEl = doc.getElementById( "resume-content" );
                const ready = !!resumeEl && resumeEl.innerHTML.trim().length > 100;
                if ( ready ) {
                    const raw = "<!DOCTYPE html>\n" + ( doc.documentElement?.outerHTML || "" );
                    const withoutScripts = raw.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "" );

                    const viteEnv = ( import.meta as never as { env: Record<string, string | undefined> } ).env;
                    const configuredBase = viteEnv[ "DEPLOY_WEBSITE_PUBLIC_URL" ] || viteEnv[ "VITE_DEPLOY_WEBSITE_PUBLIC_URL" ];
                    const baseHref = ( configuredBase && configuredBase.length > 0 ? configuredBase : window.location.origin ).replace( /\/$/, "" ) + "/";

                    const withBase = withoutScripts.replace( /<head(.*?)>/i, `<head$1><base href="${ baseHref }">` );

                    finish();
                    resolve( withBase );
                }
            }, 50 );

            timeoutId = window.setTimeout( () => {
                finish();
                reject( new Error( "Timed out waiting for resume DOM" ) );
            }, 8000 );
        };

        iframe.onload = () => {
            try {
                startPollingForResume();
            } catch ( err ) {
                finish();
                reject( err );
            }
        };

        iframe.onerror = () => {
            finish();
            reject( new Error( "Failed to load resume route" ) );
        };

        // Resolve provided URL (relative or absolute) and add cache-busting param
        const url = new URL( resumeUrl, window.location.origin );
        url.searchParams.set( "ts", String( Date.now() ) );

        iframe.src = url.toString();
        document.body.appendChild( iframe );
    } );
}

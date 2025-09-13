import jsPDF from "jspdf";

import { config } from "@inewlegend/website/src/config";

declare module "jspdf" {
    interface HtmlRenderOptions {
        callback?: ( doc: jsPDF ) => void;
        x?: number;
        y?: number;
        width?: number;
        windowWidth?: number;
    }

    interface jsPDF {
        html( element: HTMLElement, options?: HtmlRenderOptions ): Promise<void>;
    }
}

export function downloadResumeHTML(): void {
    const htmlContent = generateResumeHTML();
    const filename = "Leonid-Vinikov-Resume.html";

    const isIOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
    const isSafari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent );

    if ( isIOS || isSafari ) {
        const dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent( htmlContent );
        const link = document.createElement( "a" );
        link.href = dataUrl;
        link.download = filename;
        link.rel = "noopener";
        document.body.appendChild( link );
        link.click();
        document.body.removeChild( link );
        return;
    }

    const blob = new Blob( [ htmlContent ], { type: "text/html;charset=utf-8" } );
    const url = URL.createObjectURL( blob );
    const link = document.createElement( "a" );
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild( link );
    link.click();
    document.body.removeChild( link );
    setTimeout( () => URL.revokeObjectURL( url ), 1000 );
}

export async function generateResumePDF(): Promise<void> {
    const html = generateResumeHTML();

    const iframe = document.createElement( "iframe" );
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild( iframe );

    const iframeDoc = iframe.contentDocument as Document;
    iframeDoc.open();
    iframeDoc.write( html );
    iframeDoc.close();

    await new Promise<void>( ( resolve ) => setTimeout( resolve, 150 ) );

    const pdf = new jsPDF( "p", "mm", "a4" );
    await pdf.html( iframeDoc.body as unknown as HTMLElement, {
        callback: ( doc ) => {
            doc.save( "Leonid-Vinikov-Resume.pdf" );
            document.body.removeChild( iframe );
        },
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 800
    } );
}

export async function printResumeFromHTML(): Promise<void> {
    const html = generateResumeHTML();

    const printWindow = window.open( "", "_blank" );
    if ( !printWindow ) {
        throw new Error( "Popup blocked" );
    }

    printWindow.document.open();
    printWindow.document.write( html );
    printWindow.document.close();

    await new Promise<void>( ( resolve ) => setTimeout( resolve, 250 ) );

    try {
        printWindow.focus();
        printWindow.print();
    } finally {
        setTimeout( () => {
            try { printWindow.close(); } catch {}
        }, 500 );
    }
}

export async function downloadResumePDFViaService(): Promise<void> {
    const serviceUrl = import.meta.env.VITE_WEBSITE_PDF_SERVICE_URL;
    if ( !serviceUrl ) {
        throw new Error( "WEBSITE_PDF_SERVICE_URL is not configured" );
    }

    const html = generateResumeHTML();

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
    const filename = "Leonid-Vinikov-Resume.pdf";

    const isIOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
    const isSafari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent );

    if ( isIOS || isSafari ) {
        window.open( url, "_blank" );
        setTimeout( () => URL.revokeObjectURL( url ), 2000 );
        return;
    }

    const link = document.createElement( "a" );
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild( link );
    link.click();
    document.body.removeChild( link );
    setTimeout( () => URL.revokeObjectURL( url ), 1000 );
}

function generateResumeHTML(): string {
    const { personal, hero, about, experience, projects, skills } = config;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ personal.name } - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            color: #2563eb;
            margin-bottom: 10px;
        }
        
        .header .title {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 15px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            font-size: 0.9rem;
            color: #666;
        }
        
        .contact-info a {
            color: #2563eb;
            text-decoration: none;
        }
        
        .contact-info a:hover {
            text-decoration: underline;
        }
        
        .emoji {
            width: 14px;
            height: 14px;
            vertical-align: -2px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            font-size: 1.5rem;
            color: #2563eb;
            margin-bottom: 15px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
        }
        
        .section p {
            margin-bottom: 10px;
            text-align: justify;
        }
        
        .experience-item, .project-item {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .experience-item:last-child, .project-item:last-child {
            border-bottom: none;
        }
        
        .job-header, .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .job-title, .project-title {
            font-weight: bold;
            font-size: 1.1rem;
            color: #1f2937;
        }
        
        .company, .period {
            color: #666;
            font-size: 0.9rem;
        }
        
        .technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .tech-tag {
            background: #eff6ff;
            color: #2563eb;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            border: 1px solid #dbeafe;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .skill-category h3 {
            font-size: 1.1rem;
            color: #374151;
            margin-bottom: 8px;
        }
        
        .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        
        .skill-item {
            background: #f9fafb;
            color: #374151;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.8rem;
            border: 1px solid #e5e7eb;
        }
        
        .what-i-do {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .what-i-do h3 {
            color: #2563eb;
            margin-bottom: 10px;
        }
        
        .what-i-do ul {
            list-style: none;
            padding-left: 0;
        }
        
        .what-i-do li {
            margin-bottom: 5px;
            padding-left: 15px;
            position: relative;
        }
        
        .what-i-do li:before {
            content: "•";
            color: #2563eb;
            position: absolute;
            left: 0;
        }
        
        @media print {
            .container {
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${ personal.name }</h1>
            <div class="title">${ hero.subtitle }</div>
            <div class="contact-info">
                <span><img class="emoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e7.svg" alt="📧"/> <a href="mailto:${ personal.email }">${ personal.email }</a></span>
                <span><img class="emoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4f1.svg" alt="📱"/> <a href="tel:${ personal.phone }">${ personal.phone }</a></span>
                <span><img class="emoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cd.svg" alt="📍"/> ${ personal.location }</span>
                <span><img class="emoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f517.svg" alt="🔗"/> <a href="${ personal.github }" target="_blank">${ personal.github }</a></span>
                <span><img class="emoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bc.svg" alt="💼"/> <a href="${ personal.linkedin }" target="_blank">${ personal.linkedin }</a></span>
            </div>
        </div>

        <div class="section">
            <h2>About</h2>
            <p>${ hero.description }</p>
            
            <div class="what-i-do">
                <h3>${ about.whatIDo.title }</h3>
                <ul>
                    ${ about.whatIDo.items.map( item => `<li>${ item }</li>` ).join( "" ) }
                </ul>
            </div>
        </div>

        <div class="section">
            <h2>Experience</h2>
            ${ experience.map( exp => `
                <div class="experience-item">
                    <div class="job-header">
                        <div>
                            <div class="job-title">${ exp.title }</div>
                            <div class="company">${ exp.company } • ${ exp.location }</div>
                        </div>
                        <div class="period">${ exp.period }</div>
                    </div>
                    <p>${ exp.description }</p>
                    <div class="technologies">
                        ${ exp.technologies.map( tech => `<span class="tech-tag">${ tech }</span>` ).join( "" ) }
                    </div>
                </div>
            ` ).join( "" ) }
        </div>

        <div class="section">
            <h2>Projects</h2>
            ${ projects.slice( 0, 6 ).map( project => `
                <div class="project-item">
                    <div class="project-header">
                        <div class="project-title">${ project.title }</div>
                    </div>
                    <p>${ project.description }</p>
                    <div class="technologies">
                        ${ project.technologies.map( tech => `<span class="tech-tag">${ tech }</span>` ).join( "" ) }
                    </div>
                </div>
            ` ).join( "" ) }
        </div>

        <div class="section">
            <h2>Skills & Technologies</h2>
            <div class="skills-grid">
                ${ Object.entries( skills ).map( ( [ category, skillList ] ) => `
                    <div class="skill-category">
                        <h3>${ category }</h3>
                        <div class="skill-list">
                            ${ skillList.map( skill => `<span class="skill-item">${ skill }</span>` ).join( "" ) }
                        </div>
                    </div>
                ` ).join( "" ) }
            </div>
        </div>
    </div>
</body>
</html>
    `;
}

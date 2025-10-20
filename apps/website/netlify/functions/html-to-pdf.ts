import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import type { Handler } from "@netlify/functions";

export const handler: Handler = async ( event ) => {
    const baseCors = {
        "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
    } as const;

    if ( event.httpMethod === "OPTIONS" ) {
        return {
            statusCode: 204,
            headers: { ...baseCors },
        };
    }

    if ( event.httpMethod !== "POST" ) {
        return { statusCode: 405, headers: { ...baseCors }, body: "Method Not Allowed" };
    }

    try {
        chromium.setHeadlessMode = true;
        chromium.setGraphicsMode = false;

        const { html, filename } = JSON.parse( event.body ?? "{}" ) as { html: string; filename?: string };

        if ( !html || typeof html !== "string" ) {
            return { statusCode: 400, headers: { ...baseCors }, body: "Missing html" };
        }

        const executablePath = await chromium.executablePath();

        const browser = await puppeteer.launch( {
            args: [
                ...chromium.args,
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
            ],
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: chromium.headless,
        } );

        const page = await browser.newPage();
        await page.setContent( html, { waitUntil: "networkidle0" } );
        await page.emulateMediaType( "screen" );

        const pdfData = await page.pdf( { format: "A4", printBackground: true } );
        const pdfBuffer = Buffer.isBuffer( pdfData ) ? pdfData : Buffer.from( pdfData );

        await browser.close();

        return {
            statusCode: 200,
            isBase64Encoded: true,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${ ( filename || process.env.DEFAULT_FILENAME || "resume" ) }.pdf"`,
                ...baseCors,
                "Content-Transfer-Encoding": "binary",
                "Accept-Ranges": "bytes",
                "Content-Length": String( pdfBuffer.length ),
            },
            body: pdfBuffer.toString( "base64" ),
        };
    } catch ( err ) {
        console.error( "PDF render error:", err );
        return { statusCode: 500, headers: { ...baseCors }, body: "Render error" };
    }
};


import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

import type { Handler } from "@netlify/functions";

const isLocalDevelopment = true;

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
        const { html, filename } = JSON.parse( event.body ?? "{}" ) as { html: string; filename?: string };

        if ( !html || typeof html !== "string" ) {
            return { statusCode: 400, headers: { ...baseCors }, body: "Missing html" };
        }

        let browser;

        if ( process.env.NETLIFY_DEV ) {
            console.log( "Using local puppeteer..." );

            browser = await puppeteer.launch( {
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                ],
            } );
        } else {
            console.log( "Using production puppeteer-core with chromium..." );

            const executablePath = await chromium.executablePath();

            browser = await puppeteerCore.launch( {
                args: [
                    ...chromium.args,
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                ],
                defaultViewport: { width: 1920, height: 1080 },
                executablePath,
                headless: true,
            } );
        }

        const page = await browser.newPage();
        await page.setContent( html, { waitUntil: "networkidle0" } );
        await page.emulateMediaType( "screen" );

        const pdfData = await page.pdf( {
            format: "A3",
            printBackground: true
        } );
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


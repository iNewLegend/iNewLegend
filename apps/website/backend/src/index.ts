import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - Allow all origins for PDF generation
const corsOptions = {
    origin: true, // Allow all origins
    methods: [ "GET", "POST", "OPTIONS" ],
    allowedHeaders: [ "Content-Type", "Accept", "Origin", "X-Requested-With" ],
    credentials: false
};

app.use( cors( corsOptions ) );
app.use( express.json( { limit: "10mb" } ) );

// Health check endpoint
app.get( "/health", ( req, res ) => {
    res.json( { status: "ok", timestamp: new Date().toISOString() } );
} );

// PDF generation endpoint
app.post( "/html-to-pdf", async ( req, res ) => {
    const { html, filename } = req.body;

    if ( !html || typeof html !== "string" ) {
        return res.status( 400 ).json( { error: "Missing html" } );
    }

    let browser;

    const promise = new Promise<void>( async ( resolve, reject ) => {
        // Give promise 30 seconds to resolve
        setTimeout( () => {
            reject( new Error( "PDF generation timed out" ) );
        }, 30000 );

        try {
            console.log( "Environment check:", {
                NODE_ENV: process.env.NODE_ENV,
                CORS_ORIGIN: process.env.CORS_ORIGIN,
            } );

            browser = await puppeteer.launch( {
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-gpu",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-web-security",
                ],
            } );

            const page = await browser.newPage();

            await page.setContent( html, {
                waitUntil: "networkidle0",
            } );

            await page.emulateMediaType( "screen" );

            const pdfData = await page.pdf( {
                format: "A3",
                printBackground: true
            } );

            const pdfBuffer = Buffer.isBuffer( pdfData ) ? pdfData : Buffer.from( pdfData );

            await browser.close();

            const finalFilename = filename || process.env.DEFAULT_FILENAME || "resume";

            res.set( {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${ finalFilename }.pdf"`,
                "Content-Length": String( pdfBuffer.length ),
            } );

            res.send( pdfBuffer );

            resolve();

        } catch ( err ) {
            console.error( "PDF render error:", err );

            if ( browser ) {
                try {
                    await browser.close();
                } catch ( closeErr ) {
                    console.error( "Error closing browser:", closeErr );
                }
            }

            res.status( 500 ).json( { error: "Render error" } );

            reject( err );
        }
    } );

    return promise;
} );

// Start server
app.listen( PORT, () => {
    console.log( `PDF service running on port ${ PORT }` );
    console.log( `Environment: ${ process.env.NODE_ENV || "development" }` );
    console.log( `CORS Origin: ${ process.env.CORS_ORIGIN || "https://inewlegend.com" }` );
} );

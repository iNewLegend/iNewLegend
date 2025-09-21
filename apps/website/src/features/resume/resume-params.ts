import {
    RESUME_SECTION_KEYS,
    resumeDefaultParams,
} from "@inewlegend/website/src/features/resume/resume.definitions.ts";

import type {
    TResumeOrderKey,
    TResumeParams,
} from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function parseResumeParams(
    input?: string | URLSearchParams
): TResumeParams {
    const qs =
        typeof input === "string"
            ? new URLSearchParams( input )
            : input instanceof URLSearchParams
                ? input
                : typeof window !== "undefined"
                    ? new URLSearchParams( window.location.search )
                    : new URLSearchParams();

    const rawOrder = ( qs.get( "order" ) || "" )
        .split( "," )
        .map( ( s ) => s.trim() )
        .filter( Boolean ) as TResumeOrderKey[];

    // Normalize order: keep known keys, dedupe, then append missing
    const normalizedOrder: TResumeOrderKey[] = Array.from(
        new Set(
            rawOrder.filter(
                ( k ): k is TResumeOrderKey => ( RESUME_SECTION_KEYS as readonly string[] ).includes( k )
            )
        )
    );
    const finalOrder: TResumeOrderKey[] =
        normalizedOrder.length > 0
            ? [
                ...normalizedOrder,
                ...RESUME_SECTION_KEYS.filter( ( k ) => !normalizedOrder.includes( k ) ),
            ]
            : [ ...RESUME_SECTION_KEYS ];

    const parsed: TResumeParams = {
        ...resumeDefaultParams,

        compact: Object.fromEntries(
            Object.keys( resumeDefaultParams.compact ).map( ( key ) => [
                key,
                qs.get( `compact${ key.charAt( 0 ).toUpperCase() }${ key.slice( 1 ) }` ) === "1"
            ] )
        ) as TResumeParams["compact"],

        order: finalOrder,
    };

    return parsed;
}

// Effective order (ensures a complete, deduped list in a stable order)
export function getEffectiveOrder( params: TResumeParams ): TResumeOrderKey[] {
    const inParams = params.order ?? [];
    const deduped = [ ...new Set( inParams ) ] as TResumeOrderKey[];
    return [
        ...deduped.filter( ( k ) => ( RESUME_SECTION_KEYS as string[] ).includes( k ) ),
        ...RESUME_SECTION_KEYS.filter( ( k ) => !deduped.includes( k ) ),
    ];
}

// Serialize typed ResumeParams to URLSearchParams
export function toSearchParams( params: TResumeParams ): URLSearchParams {
    const sp = new URLSearchParams();

    // Emit each enabled section flag
    ( [ "compactSummary","compactSkills","compactExperience", "compactProjects" ] as const )
        .forEach( ( k ) => {
            if ( params[ k ] ) sp.set( k, "1" );
        } );

    // Emit order (always include to reflect current sorting)
    const order = getEffectiveOrder( params );
    sp.set( "order", order.join( "," ) );

    return sp;
}

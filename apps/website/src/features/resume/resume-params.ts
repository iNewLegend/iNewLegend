import {
    RESUME_DEFAULT_PARAMS,
    RESUME_PARAM_KEYS,
    RESUME_SECTION_KEYS,
    RESUME_SECTION_WITH_COMPACT_KEYS,
} from "@inewlegend/website/src/features/resume/resume.definitions.ts";

import type { TResumeOrderKey, TResumeParams, } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

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

    const rawOrder = ( qs.get( RESUME_PARAM_KEYS.ORDER ) || "" )
        .split( "," )
        .map( ( s ) => s.trim() )
        .filter( Boolean ) as TResumeOrderKey[];

    const finalOrder: TResumeOrderKey[] =
        rawOrder.length > 0
            ? rawOrder
            : [ ...RESUME_DEFAULT_PARAMS[ "order" ] ];

    return {
        ...RESUME_DEFAULT_PARAMS,

        order: finalOrder,
    };
}

// Effective order (ensures a complete, deduped list in a stable order)
export function getEffectiveOrder( params: TResumeParams ): TResumeOrderKey[] {
    const inParams = params.order ?? [];
    const deduped = [ ...new Set( inParams ) ] as TResumeOrderKey[];
    return [
        ...deduped.filter( ( k ) => ( RESUME_SECTION_KEYS as readonly string[] ).includes( k ) ),
        ...RESUME_SECTION_KEYS.filter( ( k ) => !deduped.includes( k ) ),
    ];
}

// Serialize typed ResumeParams to URLSearchParams
export function toSearchParams( params: TResumeParams ): URLSearchParams {
    const sp = new URLSearchParams();

    // Emit each enabled section flag
    RESUME_SECTION_WITH_COMPACT_KEYS.forEach( ( k ) => {
        if ( params.compact[ k ] ) sp.set( `${ RESUME_PARAM_KEYS.COMPACT }${ k.charAt( 0 ).toUpperCase() + k.slice( 1 ) }`, "1" );
    } );

    // Emit order (always include to reflect current sorting)
    const order = getEffectiveOrder( params );
    sp.set( RESUME_PARAM_KEYS.ORDER, order.join( "," ) );

    return sp;
}

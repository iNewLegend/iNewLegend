import { createContext, useContext } from "react";

/**
 * ATS (Applicant Tracking System) mode.
 *
 * When enabled, multi-column sections collapse to a single column so that
 * naive PDF text extractors read the content in a clean, linear order.
 * The website and the default PDF keep their dense multi-column look.
 */
export const ResumeAtsContext = createContext<boolean>( false );

export function useResumeAts(): boolean {
    return useContext( ResumeAtsContext );
}

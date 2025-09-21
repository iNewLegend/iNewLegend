export type ResumeCompactSummaryProps = {
    description: string;
};

export function ResumeCompactSummary( { description }: ResumeCompactSummaryProps ) {
    return (
        <>
            <p> Summary </p>
            <p className="text-sm text-justify pt-4">{description}</p>
        </> );
}


export type ResumeCompactSummaryProps = {
    description: string;
};

export function ResumeCompactSummary({ description }: ResumeCompactSummaryProps) {
    return (
        <p className="text-sm text-justify pt-4">{description}</p>
    );
}



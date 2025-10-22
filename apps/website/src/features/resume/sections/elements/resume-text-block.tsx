import type { ReactNode } from "react";

export type ResumeTextBlockProps = {
    children: ReactNode;
    size?: "xs" | "sm" | "md" | "lg";
    className?: string;
    justify?: boolean;
};

const sizeClasses = {
    xs: "text-[11px]",
    sm: "text-[12px]",
    md: "text-[14px]",
    lg: "text-[15px]"
};

export function ResumeTextBlock( {
    children,
    size = "md",
    className = "",
    justify = true
}: ResumeTextBlockProps ) {
    const justifyClass = justify ? "text-justify" : "";

    return (
        <p className={ `${ justifyClass } ${ sizeClasses[ size ] } text-gray-800 ${ className }` }>
            { children }
        </p>
    );
}

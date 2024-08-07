import { cn } from "@/lib/utils";
import React from "react";

type ContentHeaderProps = {
  title: string;
  children: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
const ContentHeader = ({
  title,
  children,
  handleClick,
  className,
}: ContentHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <h2 className={cn("text-secondary-gray font-bold", className)}>
        {title}
      </h2>

      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-1 rounded-full bg-primary-green hover:bg-primary-green hover:text-white"
      >
        {children}
      </button>
    </div>
  );
};
export default ContentHeader;

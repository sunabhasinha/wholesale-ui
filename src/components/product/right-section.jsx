// import { cn } from "utils/cn"

// export const RightSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
//   return <section className={cn("flex flex-col gap-4", className)}>{children}</section>
// }

import React from "react";

export const RightSection = ({ children, className }) => {
  return (
    <section className={`flex flex-col gap-4 ${className || ""}`}>
      {children}
    </section>
  );
};
import type { PropsWithChildren } from "react";

export default function Grid({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className="
        grid 
        grid-cols-1   gap-4         /* mobile: 1 col, 16px gap */
        md:grid-cols-2 md:gap-8     /* tablet: 2 cols, 32px gap */
        xl:grid-cols-4 xl:gap-8     /* desktop: 4 cols, 32px gap */
      "
    >
      {children}
    </div>
  );
}

// src/components/Container.tsx
import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className="
        w-full
        rounded-xl
        p-8
      bg-gray-200
        xl:max-w-[1344px]  /* desktop: 1280px + 32px padding each side = 1344px total */
      "
    >
      <div
        className="
          bg-white
          p-8                  /* 32px padding all around */
          rounded-md           /* regular rounding */
          xl:p-16
        "
      >
        {children}
      </div>
    </div>
  );
}

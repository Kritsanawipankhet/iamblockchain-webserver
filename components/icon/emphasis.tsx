import React, { SVGProps } from "react";

export const EmphasisIcon = ({
  className,
  height = 16,
  width = 16,
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      height={height}
      viewBox="0 0 16 16"
      version="1.1"
      width={width}
      data-view-component="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
      ></path>
    </svg>
  );
};

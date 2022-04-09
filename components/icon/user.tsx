import React, { SVGProps } from "react";

export const UserIcon = ({
  className,
  height = 16,
  width = 16,
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height={height}
      aria-hidden="true"
      viewBox="0 0 24 24"
      version="1.1"
      width={width}
      data-view-component="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"
      ></path>
    </svg>
  );
};

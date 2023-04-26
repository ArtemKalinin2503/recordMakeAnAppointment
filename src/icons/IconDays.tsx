import * as React from "react";

interface IconProps {
  isActive?: boolean;
};

const IconDays = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.617 29.167h4.466M24.85 29.167v-8.334l-2.433 2.2M35 15H5M13.333 4.8v3.733M26.667 4.8v3.733"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M30 35H10a5 5 0 0 1-5-5V11.667a5 5 0 0 1 5-5h20a5 5 0 0 1 5 5V30a5 5 0 0 1-5 5Z"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 22.433c.265-.916 1.075-1.6 2.077-1.6 1.213 0 2.198.984 2.198 2.199A1.969 1.969 0 0 1 16.057 25c1.086 0 1.968.882 1.968 1.968a2.198 2.198 0 0 1-2.198 2.199c-1.002 0-1.812-.684-2.077-1.6"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconDays;

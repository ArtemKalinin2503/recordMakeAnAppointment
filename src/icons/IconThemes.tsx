import * as React from "react";

interface IconProps {
  isActive?: boolean;
};

const IconThemes = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.325 24.167h7.018L27.325 32.5h7.018M35 15.833 30.833 7.5l-4.166 8.333M27.365 14.437h6.937M20 32.5H5M20 24.167H5M20 15.833H5M20 7.5H5"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconThemes;

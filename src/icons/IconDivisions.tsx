import * as React from "react";

interface IconProps {
  isActive?: boolean;
};

const IconDivisions = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.867 29.168a3.333 3.333 0 1 1-4.714 4.714 3.333 3.333 0 0 1 4.714-4.714M29.847 29.168a3.333 3.333 0 1 1-4.714 4.714 3.333 3.333 0 0 1 4.714-4.714M10.239 14.923a3.333 3.333 0 1 1-4.714 4.714 3.333 3.333 0 0 1 4.714-4.714M22.357 6.118a3.333 3.333 0 1 1-4.714 4.714 3.333 3.333 0 0 1 4.714-4.714M34.475 14.923a3.333 3.333 0 1 1-4.714 4.714 3.333 3.333 0 0 1 4.714-4.714M22.357 18.383a3.333 3.333 0 1 1-4.714 4.714 3.333 3.333 0 0 1 4.714-4.714M21.9 23.467l3.683 5.333M18.1 23.467l-3.683 5.316M16.817 19.833l-5.75-1.65M20 17.4v-5.583M23.183 19.833l5.75-1.65"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconDivisions;

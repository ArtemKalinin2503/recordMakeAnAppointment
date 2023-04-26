import * as React from "react";

interface IconProps {
  isActive?: boolean;
}

const IconUsers = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.497 16.023c-4.14 1.375-10.854 1.375-14.995 0M17.667 23.167h4.666"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.222 16.977v.078c0 5.64 0 7.895 1.111 11.278M17.778 16.977v.078c0 5.64 0 7.895-1.111 11.278"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.607 9.393c5.858 5.858 5.858 15.356 0 21.214-5.858 5.857-15.356 5.857-21.213 0-5.858-5.858-5.858-15.356 0-21.214 5.857-5.857 15.355-5.857 21.213 0"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.56 11.524a.792.792 0 1 1-1.12 1.12.792.792 0 0 1 1.12-1.12"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconUsers;

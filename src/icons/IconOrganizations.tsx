import * as React from "react";

interface IconProps {
  isActive?: boolean;
};

const IconOrganizations = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27 20v-9.6C27 9.075 25.88 8 24.5 8h-10C13.12 8 12 9.075 12 10.4v4.8"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 33V22.712c0-1.42 1.12-2.572 2.5-2.572h5c1.38 0 2.5 1.151 2.5 2.572v7.716C35 31.848 33.88 33 32.5 33h-25C6.12 33 5 31.849 5 30.428v-9.045c0-1.206.663-2.31 1.711-2.849l6.217-3.198a3.023 3.023 0 0 1 3.005.135 3.207 3.207 0 0 1 1.478 2.696L17.5 33M19.5 8V5"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconOrganizations;

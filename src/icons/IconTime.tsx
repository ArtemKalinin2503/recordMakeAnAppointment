import * as React from "react";

interface IconProps {
  isActive?: boolean;
};

const IconTime = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m33.333 34.717-3.767-3.767M10.433 30.95l-3.766 3.767M14.899 9.351c6.803-2.818 14.601.413 17.419 7.216 2.818 6.802-.413 14.6-7.215 17.419-6.803 2.817-14.602-.413-17.42-7.216-2.817-6.802.413-14.601 7.216-17.419M5.75 9.683l5-4.2M34.267 9.7l-5-4.2"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.583 15.72v6.892L25 25.915"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconTime;

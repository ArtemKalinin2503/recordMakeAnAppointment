import * as React from "react";

interface IconProps {
  isActive?: boolean;
}

const IconMakeAppointment = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M6.667 15v18.327c0 1.265 1.345 2.073 2.456 1.468l6.71-3.66 6.71 3.66C23.655 35.4 25 34.592 25 33.327V15a3.332 3.332 0 0 0-3.333-3.333H10A3.334 3.334 0 0 0 6.667 15Z"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m25 25 5.868 3.202c1.11.606 2.465-.199 2.465-1.464V8.333A3.332 3.332 0 0 0 30 5H19.167a3.332 3.332 0 0 0-3.334 3.333v3.334M12.917 21l2.666 2.667 4-4"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconMakeAppointment;

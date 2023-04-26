import * as React from "react";

interface IconProps {
  isActive?: boolean;
};

const IconQualityOfService = ({ isActive }: IconProps) => {
  const mainColor = isActive ? '#7314D9' : '#313131';
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.667 11.667h16.666M20 26.938l2.507 1.317a.665.665 0 0 0 .965-.702l-.479-2.791 2.029-1.975a.666.666 0 0 0-.369-1.135l-2.803-.407-1.253-2.542a.665.665 0 0 0-1.194 0l-1.253 2.542-2.803.408a.665.665 0 0 0-.369 1.135l2.029 1.975-.479 2.792a.665.665 0 0 0 .965.702L20 26.938"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M31.667 5.26H8.333A3.332 3.332 0 0 0 5 8.593v23.074A3.332 3.332 0 0 0 8.333 35h23.334A3.332 3.332 0 0 0 35 31.667V8.593a3.332 3.332 0 0 0-3.333-3.333Z"
        stroke={mainColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconQualityOfService;

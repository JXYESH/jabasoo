import React from 'react';

interface ShivaLingamLogoProps {
  className?: string;
  size?: number;
}

export const ShivaLingamLogo: React.FC<ShivaLingamLogoProps> = ({ className = 'text-[#111111]', size = 26 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="JABASOO Emblem - Minimal Shiva Lingam"
    >
      {/* The Central Lingam (Smooth upright dome) */}
      <path
        d="M11.5 19V11.5C11.5 9 13.5 7 16 7C18.5 7 20.5 9 20.5 11.5V19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle sacred inner horizontal mark (Tripundra / Bindu reflection) */}
      <line
        x1="13.5"
        y1="12.5"
        x2="18.5"
        y2="12.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* The Peetham / Base Upper Rim */}
      <path
        d="M7 19.5H25C25.8 19.5 26.5 20.2 26.5 21C26.5 21.8 25.8 22.5 25 22.5H23V24.5C23 25.1 22.5 25.5 21.9 25.5H10.1C9.5 25.5 9 25.1 9 24.5V22.5H7C6.2 22.5 5.5 21.8 5.5 21C5.5 20.2 6.2 19.5 7 19.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Base Stepped Footing */}
      <path
        d="M10 25.5H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

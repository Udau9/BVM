import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        {/* Outer Hexagon */}
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />
        {/* UD Text */}
        <text
          x="39" // Centered horizontally in polygon (39 is half of 78)
          y="55" // Adjusted to visually center vertically
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
        >
          UD
        </text>
      </g>
    </g>
  </svg>
);

export default IconLogo;

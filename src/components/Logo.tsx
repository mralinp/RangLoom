import React from "react";

export const Logo: React.FC = () => (
  <div className="logo">
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="#ccc"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <text
        x="32"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#666"
        fontSize="24"
      >
        !
      </text>
    </svg>
  </div>
);

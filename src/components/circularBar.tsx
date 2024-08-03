import React from "react";

interface CircularBarProps {
  title: string;
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

const CircularBar: React.FC<CircularBarProps> = ({
  title,
  percentage,
  size = 100,
  strokeWidth = 10,
  color = getColorBasedOnPercentage(percentage),
  backgroundColor = "#e0e0e0",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div>
      <h2>{title}</h2>
      <svg width={size} height={size}>
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.35s" }}
        />
        <text x="50%" y="50%" dy=".3em" textAnchor="middle" fontSize="1.5em" fill={color}>
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  );
};

function getColorBasedOnPercentage(percentage: number): string {
  if (percentage >= 75) {
    return "#4caf50"; // Green
  } else if (percentage >= 50) {
    return "#ffc107"; // Yellow
  } else {
    return "#f44336"; // Red
  }
}

export default CircularBar;

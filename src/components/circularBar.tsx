"use client";
import React, { useEffect, useState } from "react";

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
  percentage = 0,
  size = 100,
  strokeWidth = 10,
  color = getColorBasedOnPercentage(percentage),
  backgroundColor = "#000000",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [currentColor, setCurrentColor] = useState("black");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPercentage(percentage);
      setCurrentColor(color);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [percentage, color]);

  useEffect(() => {
    const progress = currentPercentage / 100;
    const newOffset = circumference - progress * circumference;
    setOffset(newOffset);
  }, [currentPercentage, circumference]);

  return (
    <div className="mx-5 flex justify-center rounded-lg bg-gray-800 text-center drop-shadow-2xl">
      <div className="p-5">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
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
            stroke={currentColor}
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
          <text
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
            className="text-5xl font-bold"
            fill={currentColor}
          >
            {`${currentPercentage}%`}
          </text>
        </svg>
      </div>
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

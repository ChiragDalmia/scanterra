import React from "react";

interface ScanButtonProps {
  onClick: () => void;
  className?: string;
  hoverColor?: "red" | "green";
  children: React.ReactNode;
}

const ScanButton: React.FC<ScanButtonProps> = ({
  onClick,
  className,
  hoverColor = "green",
  children,
}) => {
  const hoverColorClass = hoverColor === "green" ? "bg-green-500" : "bg-red-500";

  return (
    <button
      onClick={onClick}
      className={`group relative mx-auto mt-10 overflow-hidden rounded-full border border-white px-5 py-5 hover:border-opacity-0 ${className || ""}`}
    >
      <span
        className={`absolute inset-0 h-96 w-96 scale-0 rounded-full ${hoverColorClass} transition-transform duration-300 ease-out group-hover:scale-150`}
      ></span>
      <span className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </span>
    </button>
  );
};

export default ScanButton;

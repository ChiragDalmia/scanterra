"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  destination: string;
  children: React.ReactNode;
  className?: string;
  hoverColor?: "black" | "green";
}

const NavigationButton: React.FC<ButtonProps> = ({
  destination,
  className,
  children,
  hoverColor = "black",
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(destination);
  };

  const hoverColorClass = hoverColor === "green" ? "bg-green-500" : "bg-black";

  return (
    <button
      onClick={handleClick}
      className={`group relative mx-auto mt-52 max-w-xs overflow-hidden rounded-full border border-white px-5 py-5 hover:border-opacity-0 md:mx-0 md:mt-0 md:px-7 ${className || ""}`}
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

export default NavigationButton;

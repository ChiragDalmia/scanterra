"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  destination: string;
  children: React.ReactNode;
}

const NavigationButton: React.FC<ButtonProps> = ({ destination, children }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(destination);
  };

  return <button onClick={handleClick}>{children}</button>;
};

export default NavigationButton;

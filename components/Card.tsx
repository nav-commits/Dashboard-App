import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  bgClass?: string; 
  className?: string; 
}
const Card: React.FC<CardProps> = ({ children, bgClass = "bg-white", className }) => {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col items-center justify-center gap-4 mt-6 mb-6 ${bgClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

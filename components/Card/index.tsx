import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  bgClass?: string; 
  className?: string; 
}
const Card: React.FC<CardProps> = ({ children, bgClass = "bg-white", className }) => {
  return (
    <div
      className={`rounded-xl flex flex-col justify-center gap-4 ${bgClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

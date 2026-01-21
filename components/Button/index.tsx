import React, { ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
  text: string;
  textColor?: string;
  bgColor?: string;
};

const Button = ({
  type = "button",
  className = "",
  icon,
  text,
  textColor = "#5932EA",
  bgColor = "#FFFFFF",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`rounded-2xl px-10 py-2 font-semibold text-sm transition ${className}`}
      style={{ color: textColor, backgroundColor: bgColor }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;

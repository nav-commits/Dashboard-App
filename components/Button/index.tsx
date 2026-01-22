import React, { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
  text: string;
  textColor?: string;
  bgColor?: string;
  disabled?: boolean;
};

const Button = ({
  type = "button",
  className = "",
  icon,
  text,
  textColor = "#5932EA",
  bgColor = "#FFFFFF",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "rounded-2xl px-10 py-2 font-semibold text-sm transition",
        className,
        disabled && "opacity-50 cursor-not-allowed"
      )}
      style={{ color: textColor, backgroundColor: bgColor }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;

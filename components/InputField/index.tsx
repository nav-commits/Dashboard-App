import React, { ReactNode } from "react";

type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;       
  placeholder?: string;    
  type?: string;                  
  bgClass?: string;        
  icon?: ReactNode;        
};

const InputField = ({
  value,
  onChange,
  label,
  placeholder = "",
  type = "text",
  bgClass = "bg-white",
  icon,
}: InputFieldProps) => {

  return (
    <div className={`flex items-center rounded-md px-3 py-2 ${bgClass}`}>
      {label && (
        <label className="sr-only">
          {label}
        </label>
      )}
      {icon && <span className="mr-2">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent w-full"
      />
    </div>
  );
};

export default InputField;

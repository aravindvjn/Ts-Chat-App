import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import classNames from "classnames";
import { useState } from "react";

type InputProps = {
  type: "text" | "password" | "file";
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
};

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  name,
}: InputProps) => {
  const inputClasses = classNames(
    "px-3 py-2 rounded text-black border",
    {},
    className
  );
  const [visible, setVisible] = useState<string>(type);
  return (
    <div className="flex w-full flex-col relative">
      <label htmlFor={name}>{placeholder}</label>
      <input
        id={name}
        name={name}
        type={visible}
        placeholder={placeholder}
        value={value}
        className={inputClasses}
        onChange={onChange}
      />
      <div
        className="absolute right-3 top-8 text-gray-500"
        onClick={() => {
          setVisible(visible === "password" ? "text" : "password");
        }}
      >
        {type === "password" &&
          (visible === "text" ? <Visibility /> : <VisibilityOff />)}
      </div>
    </div>
  );
};

export default Input;

import classNames from "classnames";

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
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name}>{placeholder}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className={inputClasses}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

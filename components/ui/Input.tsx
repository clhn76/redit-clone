'use client'

export default function Input({
  required,
  value,
  type = "text",
  onChange,
  disabled,
  name,
  placeholder,
  className,
  small,
}: {
  required?: boolean
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  placeholder?: string
  className?: string
  small?:boolean
}) {
  return (
    <input  
      required={required}
      placeholder={placeholder}
      value={value}
      name={name}
      className={`
        text-lg
        w-full
        ${!small && 'p-3'}
        ${small && 'p-1'}
        rounded-lg
        border-2
        bg-gray-50
        outline-none
        focus:border-blue-500
        focus:bg-white
        duration-300
        placeholder:font-light
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${className}
      `}
      type={type}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

'use client'

import Spinner from "./Spinner";

export default function Button({
  className,
  children,
  onClick,
  outline,
  solid,
  type,
  large,
  oauth,
  isLoading,
  disabled,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  outline?: boolean;
  solid?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  large?: boolean;
  oauth?: boolean;
  isLoading?: boolean;
  disabled?: boolean
}) {
  return (
    <button
      disabled={isLoading || disabled}
      type={type}
      onClick={onClick}
      className={`
        flex
        items-center
        justify-center
        gap-1
        rounded-full
        font-medium
        px-4
        py-1
        whitespace-nowrap
        hover:opacity-70
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${large && "px-6 py-3"}
        ${solid && "text-white"}
        ${solid && "bg-blue-500"}
        ${outline && "text-blue-500"}
        ${outline && "border-[1px] border-blue-500"}
        ${className}
        ${
          oauth &&
          "font-normal border-[1px] border-neutral-300 hover:bg-neutral-50 hover:border-neutral-500"
        }
      `}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

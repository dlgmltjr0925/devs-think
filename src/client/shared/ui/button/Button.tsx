import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  color?: "primary" | "secondary" | "error" | "warning" | "success" | "info";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const buttonVariants: Record<string, string> = {
  text: "button-text",
  contained: "button-contained",
  outlined: "button-outlined",
};

const buttonColors: Record<string, string> = {
  "text-primary": "button-text-primary",
  "text-secondary": "button-text-secondary",
  "text-error": "button-text-error",
  "text-warning": "button-text-warning",
  "text-success": "button-text-success",
  "text-info": "button-text-info",
  "contained-primary": "button-contained-primary",
  "contained-secondary": "button-contained-secondary",
  "contained-error": "button-contained-error",
  "contained-warning": "button-contained-warning",
  "contained-success": "button-contained-success",
  "contained-info": "button-contained-info",
  "outlined-primary": "button-outlined-primary",
  "outlined-secondary": "button-outlined-secondary",
  "outlined-error": "button-outlined-error",
  "outlined-warning": "button-outlined-warning",
  "outlined-success": "button-outlined-success",
  "outlined-info": "button-outlined-info",
};

const buttonSize: Record<string, string> = {
  small: "button-size-small",
  medium: "button-size-medium",
  large: "button-size-large",
};

export const Button = ({
  children,
  variant = "text",
  color = "primary",
  size = "medium",
  startIcon,
  endIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "button",
        buttonVariants[variant],
        buttonColors[`${variant}-${color}`],
        buttonSize[size],
      )}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

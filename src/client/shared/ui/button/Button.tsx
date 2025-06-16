import "./button.css";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  color?: "primary" | "secondary" | "error";
  size?: "small" | "medium" | "large";
}

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  text: "button-variant-text",
  contained: "button-variant-contained",
  outlined: "button-variant-outlined",
};

export const Button = ({
  children,
  variant = "text",
  ...props
}: ButtonProps) => {
  return (
    <button className={twMerge("button", buttonVariants[variant])} {...props}>
      {children}
    </button>
  );
};

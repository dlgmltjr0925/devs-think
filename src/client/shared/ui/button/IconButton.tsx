import { ComponentProps } from "react";
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";
import { Spinner } from "../spinner";

export interface IconButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
  size?: "small" | "medium" | "large";
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "default";
}

const iconButtonColors: Record<string, string> = {
  primary: "icon-button-color-primary",
  secondary: "icon-button-color-secondary",
  error: "icon-button-color-error",
  warning: "icon-button-color-warning",
  success: "icon-button-color-success",
  info: "icon-button-color-info",
  default: "icon-button-color-default",
};

const iconButtonSize: Record<string, string> = {
  small: "icon-button-size-small",
  medium: "icon-button-size-medium",
  large: "icon-button-size-large",
};

export const IconButton = ({
  children,
  className,
  disabled = false,
  loading = false,
  size = "medium",
  color = "default",
  ...props
}: IconButtonProps) => {
  return (
    <Button
      className={twMerge(
        "icon-button",
        iconButtonColors[color],
        iconButtonSize[size],
        className,
      )}
      variant="text"
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size="medium" /> : <span>{children}</span>}
    </Button>
  );
};

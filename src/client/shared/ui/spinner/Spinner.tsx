import "./spinner.css";
import { twMerge } from "tailwind-merge";

export interface SpinnerProps {
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

const spinnerSize = {
  small: "w-4 h-4",
  medium: "w-5 h-5",
  large: "w-6 h-6",
} as const;

const spinnerColor = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  error: "stroke-error",
  warning: "stroke-warning",
  success: "stroke-success",
  info: "stroke-info",
  default: "stroke-text-secondary",
} as const;

export const Spinner = ({
  size = "medium",
  color = "default",
}: SpinnerProps) => {
  return (
    <svg
      className={twMerge(spinnerSize[size], spinnerColor[color])}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="spinner">
        <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="2"></circle>
      </g>
    </svg>
  );
};

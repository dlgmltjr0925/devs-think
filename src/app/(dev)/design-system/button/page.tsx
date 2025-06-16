import { Button } from "~/client/shared/ui/button";

const variants = ["text", "contained", "outlined"] as const;
const colors = [
  "primary",
  "secondary",
  "error",
  "warning",
  "success",
  "info",
] as const;

const sizes = ["small", "medium", "large"] as const;

export default function ButtonPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-overline">Button</h1>

      <div>
        <h2 className="text-subtitle1">Variant</h2>
        <div className="flex flex-row gap-2">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h2>Disabled</h2>
        <div className="flex flex-row gap-2">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-subtitle1">Color</h2>
        {colors.map((color) => (
          <div key={color} className="flex flex-row gap-2">
            {variants.map((variant) => (
              <Button key={variant} variant={variant} color={color}>
                {color}
              </Button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-subtitle1">Size</h2>
        {variants.map((variant) => (
          <div key={variant} className="flex flex-row items-center gap-2">
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

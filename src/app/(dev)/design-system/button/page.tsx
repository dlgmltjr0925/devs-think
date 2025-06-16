import { Button } from "~/client/shared/ui/button";

export default function ButtonPage() {
  return (
    <div className="p-4">
      <h1 className="text-overline">Button</h1>

      <h2 className="text-subtitle1">Variant</h2>

      <div className="flex flex-col gap-2">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
    </div>
  );
}

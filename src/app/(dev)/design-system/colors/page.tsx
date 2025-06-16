const FIRST_LAYERS = [
  "primary",
  "secondary",
  "error",
  "warning",
  "success",
  "info",
];

const SECOND_LAYERS = ["main", "light", "dark"];

export default function ColorsPage() {
  const colors: Record<string, Record<string, string>> = {
    primary: {
      main: "bg-primary-main text-primary-contrast-text",
      light: "bg-primary-light text-primary-contrast-text",
      dark: "bg-primary-dark text-primary-contrast-text",
    },
    secondary: {
      main: "bg-secondary-main text-secondary-contrast-text",
      light: "bg-secondary-light text-secondary-contrast-text",
      dark: "bg-secondary-dark text-secondary-contrast-text",
    },
    error: {
      main: "bg-error-main text-error-contrast-text",
      light: "bg-error-light text-error-contrast-text",
      dark: "bg-error-dark text-error-contrast-text",
    },
    warning: {
      main: "bg-warning-main text-warning-contrast-text",
      light: "bg-warning-light text-warning-contrast-text",
      dark: "bg-warning-dark text-warning-contrast-text",
    },
    success: {
      main: "bg-success-main text-success-contrast-text",
      light: "bg-success-light text-success-contrast-text",
      dark: "bg-success-dark text-success-contrast-text",
    },
    info: {
      main: "bg-info-main text-info-contrast-text",
      light: "bg-info-light text-info-contrast-text",
      dark: "bg-info-dark text-info-contrast-text",
    },
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Colors</h1>
      <h2>Palette</h2>
      {FIRST_LAYERS.map((layer) => {
        return (
          <div key={layer} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{layer}</h2>
            <div className="flex flex-row gap-2">
              {SECOND_LAYERS.map((secondLayer) => {
                return (
                  <div
                    key={secondLayer}
                    className={`${colors[layer][secondLayer]} flex items-center rounded-lg px-4 py-2`}
                  >
                    <p>
                      {layer} {secondLayer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

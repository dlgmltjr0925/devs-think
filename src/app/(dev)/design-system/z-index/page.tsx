export default function ZIndexPage() {
  return (
    <div className="relative">
      <h1 className="text-overline">Z-Index</h1>

      <div className="text-foreground relative h-[600px] border-gray-300">
        {/* 가장 낮은 z-index */}
        <div className="bg-primary text-primary-contrast-text absolute top-4 left-4 z-(--mobile-stepper-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            mobile-stepper (1000)
          </div>
        </div>

        {/* fab과 speed-dial은 같은 z-index */}
        <div className="bg-secondary text-secondary-contrast-text absolute top-12 left-12 z-(--fab-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            fab (1050)
          </div>
        </div>

        <div className="bg-error text-error-contrast-text absolute top-20 left-20 z-(--speed-dial-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            speed-dial (1050)
          </div>
        </div>

        <div className="bg-warning text-warning-contrast-text absolute top-28 left-28 z-(--app-bar-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            app-bar (1100)
          </div>
        </div>

        <div className="bg-info text-info-contrast-text absolute top-36 left-36 z-(--drawer-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            drawer (1200)
          </div>
        </div>

        <div className="bg-success text-success-contrast-text absolute top-44 left-44 z-(--modal-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            modal (1300)
          </div>
        </div>

        <div className="bg-primary-light text-primary-contrast-text absolute top-52 left-52 z-(--snackbar-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            snackbar (1400)
          </div>
        </div>

        {/* 가장 높은 z-index */}
        <div className="bg-secondary-light text-secondary-contrast-text absolute top-60 left-60 z-(--tooltip-z) h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            tooltip (1500)
          </div>
        </div>
      </div>

      <div className="relative h-[600px] border-gray-300">
        {/* 가장 낮은 z-index */}
        <div className="bg-primary text-primary-contrast-text z-mobile-stepper absolute top-4 left-4 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            mobile-stepper (1000)
          </div>
        </div>

        {/* fab과 speed-dial은 같은 z-index */}
        <div className="bg-secondary text-secondary-contrast-text z-fab absolute top-12 left-12 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            fab (1050)
          </div>
        </div>

        <div className="bg-error text-error-contrast-text z-speed-dial absolute top-20 left-20 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            speed-dial (1050)
          </div>
        </div>

        <div className="bg-warning text-warning-contrast-text z-app-bar absolute top-28 left-28 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            app-bar (1100)
          </div>
        </div>

        <div className="bg-info text-info-contrast-text z-drawer absolute top-36 left-36 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            drawer (1200)
          </div>
        </div>

        <div className="bg-success text-success-contrast-text z-modal absolute top-44 left-44 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            modal (1300)
          </div>
        </div>

        <div className="bg-primary-light text-primary-contrast-text z-snackbar absolute top-52 left-52 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            snackbar (1400)
          </div>
        </div>

        {/* 가장 높은 z-index */}
        <div className="bg-secondary-light text-secondary-contrast-text z-tooltip absolute top-60 left-60 h-60 w-60 rounded-lg p-4 shadow-lg">
          <div className="absolute top-1 left-2 text-sm font-medium">
            tooltip (1500)
          </div>
        </div>
      </div>
    </div>
  );
}

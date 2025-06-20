import { logger } from "./logger";

export class ActionLogger {
  static log(methodName: string) {
    const startTime = performance.now();
    return (error?: Error) => {
      if (error?.message.startsWith("Dynamic server")) return;

      const duration = `${((performance.now() - startTime) * 1000).toFixed(2)}ms`;

      logger.info({
        message: "ACTION",
        success: !error,
        error: error ? error.message : undefined,
        methodName,
        duration,
      });
    };
  }
}

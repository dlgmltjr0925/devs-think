import { NextRequest, NextResponse } from "next/server";
import { logger } from "./logger";

export class MiddlewareLogger {
  static log(req: NextRequest) {
    const { method, url, headers } = req;

    // 클라이언트 IP
    const clientIp =
      headers.get("x-forwarded-for") ?? headers.get("x-real-ip") ?? "unknown";

    // 시작 시간
    const startTime = performance.now();

    // userAgent
    const userAgent = headers.get("user-agent");

    logger.info(
      JSON.stringify({
        level: 30,
        time: new Date().toISOString(),
        pid: 0,
        hostname: "",
        message: "REQUEST",
        method,
        url,
        ip: clientIp,
        userAgent,
      }),
    );

    return (res: NextResponse) => {
      const duration = `${((performance.now() - startTime) * 1000).toFixed(2)}ms`;

      logger.info(
        JSON.stringify({
          level: 30,
          time: new Date().toISOString(),
          pid: 0,
          hostname: "",
          message: "RESPONSE",
          method,
          url,
          status: res.status,
          duration,
        }),
      );
    };
  }
}

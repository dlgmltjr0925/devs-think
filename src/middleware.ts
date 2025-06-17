import { NextRequest, NextResponse } from "next/server";
import { MiddlewareLogger } from "~/server/infra/core/logger";

export async function middleware(req: NextRequest) {
  const log = MiddlewareLogger.log(req);

  const res = await NextResponse.next();

  log(res);

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|manifest.json|favicon.ico|icons/icon-).*)",
  ],
};

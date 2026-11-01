import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "tt_proposal_access";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/proposals")) {
    return NextResponse.next();
  }

  const secret = process.env.PROPOSAL_SECRET;

  // If no secret configured, allow local demo access but keep noindex via page meta.
  if (!secret) {
    return NextResponse.next();
  }

  const key = request.nextUrl.searchParams.get("key");
  const cookie = request.cookies.get(COOKIE)?.value;

  if (cookie === secret || key === secret) {
    const response = NextResponse.next();
    if (key === secret) {
      response.cookies.set(COOKIE, secret, {
        httpOnly: true,
        sameSite: "lax",
        path: "/proposals",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return response;
  }

  return new NextResponse(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>Restricted</title>
    <meta name="robots" content="noindex,nofollow"/>
    <style>body{font-family:system-ui;background:#0A1628;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;text-align:center}
    a{color:#2B8CFF}</style></head><body>
    <div><h1>Private proposal</h1>
    <p>This route is protected. Append <code>?key=YOUR_SECRET</code> or set PROPOSAL_SECRET.</p>
    <p><a href="/">Return home</a></p></div></body></html>`,
    {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

export const config = {
  matcher: ["/proposals/:path*"],
};

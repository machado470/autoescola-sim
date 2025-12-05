import { NextResponse } from "next/server";

export function middleware(req: any) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = ["/(aluno)", "/(admin)"];

  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(aluno)/:path*", "/(admin)/:path*"],
};

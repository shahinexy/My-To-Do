/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
 
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token: any = cookieStore.get("token");
  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|forget-password|register|_next|api).*)"],
};
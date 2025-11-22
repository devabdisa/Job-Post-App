import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isPublic = publicPaths.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  if (!req.auth && !isPublic) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  if (req.auth && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/jobs/new", "/login", "/register"],
};

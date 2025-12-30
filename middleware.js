// middleware.js (at the root of your project)
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/users/[userId]/add-blog",
  "/users/[userId]/edit",
  "/blogs/[blogId]/edit-blog",
];

const authRoutes = ["/login", "/signup"];

export async function middleware(request) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const { pathname } = request.nextUrl;

  // 1. If logged in and trying to access /login or /signup → redirect to home
  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. If not logged in and trying to access a protected route → redirect to /signup
  const isProtected = protectedRoutes.some((route) =>
    pathname.match(new RegExp("^" + route.replace(/\[.+?\]/g, "[^/]+") + "$"))
  );

  if (!isLoggedIn && isProtected) {
    const signupUrl = new URL("/signup", request.url);
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/login",
    "/signup",
    "/users/:userId/add-blog",
    "/users/:userId/edit",
    "/blogs/:blogId/edit-blog",
  ],
};

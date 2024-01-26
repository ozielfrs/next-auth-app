import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
  authRoutes,
  publicRoutes,
  protectedRoutes,
  DEFAULT_LANDING_PAGE_URL,
  DEFAULT_SIGNIN_IN_URL,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const resolver = (route: { path: string }) => {
    return nextUrl.pathname === route.path;
  };

  const isProtectedRoute = protectedRoutes.some(resolver);
  const isPublicRoute = publicRoutes.some(resolver);
  const isAuthRoute = authRoutes.some(resolver);

  console.log({ nextUrl, isProtectedRoute, isPublicRoute, isAuthRoute });

  if (isProtectedRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LANDING_PAGE_URL, nextUrl));
    return null;
  }

  if (!isLoggedIn && !isPublicRoute)
    return Response.redirect(new URL(DEFAULT_SIGNIN_IN_URL, nextUrl));

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

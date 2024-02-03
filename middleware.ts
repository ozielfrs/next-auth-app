import authConfig from '@/auth.config';
import {
  DEFAULT_LANDING_PAGE_URL,
  DEFAULT_SIGNIN_IN_URL,
  apiRoutes,
  appRoutes,
  authRoutes
} from '@/routes';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const resolver = (routes: { path: string }[]) => {
    return routes.some(route => {
      const regex = new RegExp(`^${route.path}$`);
      return regex.test(nextUrl.pathname);
    });
  };

  const isAppRoute = resolver(appRoutes);
  const isApiRoute = resolver(apiRoutes);
  const isAuthRoute = resolver(authRoutes);

  if (isApiRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LANDING_PAGE_URL.path, nextUrl));
    return null;
  }

  if (isAppRoute)
    if (!isLoggedIn) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) callbackUrl += nextUrl.search;

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return Response.redirect(
        new URL(
          `${DEFAULT_SIGNIN_IN_URL.path}?callbackUrl=${encodedCallbackUrl}`,
          nextUrl
        )
      );
    }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};

export const authRoutes = [
  {
    path: "/signin",
  },
  {
    path: "/signup",
  },
];

export const publicRoutes = [
  {
    path: "/",
  },
  {
    path: "/home",
  },
];

export const protectedRoutes = [
  {
    path: "/api/auth",
  },
];

export const DEFAULT_LANDING_PAGE_URL = "/home";
export const DEFAULT_SIGNIN_IN_URL = "/signin";

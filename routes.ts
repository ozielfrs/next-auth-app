interface routeProps {
  path: string;
  name: string;
}

export const authRoutes: routeProps[] = [
  {
    path: '/signin',
    name: 'Sign In'
  },
  {
    path: '/signup',
    name: 'Sign Up'
  },
  {
    path: '/error',
    name: 'Error'
  },
  {
    path: '/verify',
    name: 'Verify'
  },
  {
    path: '/reset',
    name: 'Password reset'
  }
];

export const appRoutes: routeProps[] = [
  {
    path: '/home',
    name: 'Home'
  },
  {
    path: '/server',
    name: 'Server'
  },
  {
    path: '/client',
    name: 'Client'
  },
  {
    path: '/admin',
    name: 'Admin'
  },
  {
    path: '/settings',
    name: 'Settings'
  }
];

export const apiRoutes: routeProps[] = [
  {
    path: '/api',
    name: 'API'
  }
];

export const DEFAULT_LANDING_PAGE_URL: routeProps = {
  path: '/home',
  name: 'Home'
};

export const DEFAULT_SIGNIN_IN_URL: routeProps = {
  path: '/signin',
  name: 'Sign In'
};

export const DEFAULT_ERROR_URL: routeProps = {
  path: '/error',
  name: 'Error'
};

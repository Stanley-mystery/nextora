export const ROUTES = {
  BASE_PATH: '/',
  NOT_FOUND: '*',
  AUTH: {
    BASE_PATH: '/auth',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CHANGE_DEFAULT_PASSWORD: '/auth/update-password',
  },
  DASHBOARD: '/dashboard',

  MANAGE: {
    BASE_PATH: '/manage',
    USER_MANAGEMENT: '/manage/users',
    USER_DETAILS: '/manage/users/:id',
    ROLES_AND_PERMISSIONS: '/manage/roles-permissions',
    ROLE_DETAILS: '/manage/roles-permissions/:slug',
  },
  PROFILE: '/profile',
};

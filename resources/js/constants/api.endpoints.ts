export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  UTILS: {
    BASE: '/',
    FETCH_BASE_RECORDS: '/base-records',
  },
  AUTH: {
    BASE: '/customer/auth',
    LOGIN: '/admin/auth/login',
    VERIFY_LOGIN_OTP: '/admin/auth/verify-login-otp',
    LOGOUT: '/admin/auth/logout',
    UPDATE_PASSWORD: '/admin/auth/update-password',
    INITIATE_RESET_PASSWORD: '/admin/auth/request-reset-password-email',
    VERIFY_RESET_PASSWORD_OTP: '/admin/auth/verify-reset-otp',
    CREATE_NEW_PASSWORD: '/admin/auth/reset-password',
  },
  USER_MANAGEMENT: {
    BASE: '/admin/user',
    LIST_ADMIN_USERS: '/admin/user',
    LIST_DELETED_ADMIN_USERS: '/admin/user/account/deleted',
    FETCH_ADMIN_USER: '/admin/user/:id',
    VALIDATE_STAFF_ID: '/admin/user/active/directory',
    CREATE_ADMIN_USER: '/admin/user',
    ACTIVATE_ADMIN_USER: '/admin/user/{id}/activate',
    DEACTIVATE_ADMIN_USER: '/admin/user/{id}/deactivate',
    DELETE_ADMIN_USER: '/admin/user/{id}',
  },
  PROFILE: {
    BASE: '/admin/user/me',
    ME: '/admin/user/me',
    UPDATE: '/admin/user/update-profile',
  },
  ACCESS_CONTROL: {
    BASE: '/admin/rbac',
    LIST_ADMIN_ROLES: '/admin/rbac/roles',
    FETCH_ADMIN_ROLE: '/admin/rbac/role',
    FETCH_ROLES_PERMISSIONS: '/admin/rbac/roles-permissions',
    ASSIGN_ROLE_PERMISSIONS: '/admin/rbac/roles/assign-permissions',
  },
};

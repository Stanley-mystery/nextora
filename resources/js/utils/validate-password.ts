import { PASSWORD_RULES } from '@/constants/validation';

const validate = (_: unknown, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Password is required'));
  }

  if (!PASSWORD_RULES.lengthPattern.test(value)) {
    return Promise.reject(new Error('Password must be at least 12 characters long'));
  }

  if (!PASSWORD_RULES.uppercasePattern.test(value)) {
    return Promise.reject(new Error('Password must include at least one uppercase letter'));
  }

  if (!PASSWORD_RULES.lowercasePattern.test(value)) {
    return Promise.reject(new Error('Password must include at least one lowercase letter'));
  }

  if (!PASSWORD_RULES.numberPattern.test(value)) {
    return Promise.reject(new Error('Password must include at least one number'));
  }

  if (!PASSWORD_RULES.specialCharPattern.test(value)) {
    return Promise.reject(new Error('Password must include at least one special character: -_+*&#!.$@'));
  }

  return Promise.resolve();
};

export default { validate };

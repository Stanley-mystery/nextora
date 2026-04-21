interface ApiErrorObject {
  message: string;
}

interface ApiErrorData {
  errors?: string | string[] | ApiErrorObject[];
  error?: {
    details?: string[];
  };
  message?: string;
}

interface ApiError {
  data?: ApiErrorData;
  message?: string;
}

const getApiErrorMessage = (error: unknown): string => {
  if (!error || typeof error !== 'object') {
    return 'An unexpected error occurred';
  }

  const apiError = error as ApiError;

  if (Array.isArray(apiError?.data?.errors) && apiError.data.errors.length > 0) {
    const firstError = apiError.data.errors[0];
    return typeof firstError === 'object' ? firstError.message : firstError;
  }

  if (typeof apiError?.data?.errors === 'string') {
    return apiError.data.errors;
  }

  if (Array.isArray(apiError?.data?.error?.details) && apiError.data.error.details.length > 0) {
    return apiError.data.error.details[0];
  }

  if (apiError?.data?.message) {
    return apiError.data.message;
  }

  if (apiError?.message) {
    return apiError.message;
  }

  return 'An unexpected error occurred';
};

export default getApiErrorMessage;

const validatePhoneNumber = (_: unknown, value: string, minLength: number) => {
  switch (true) {
    case !value:
      return Promise.reject(new Error('Please input your phone number'));
    case !/^[0-9]+$/.test(value):
      return Promise.reject(new Error('Phone number should include only numbers'));
    case value.length < minLength:
      return Promise.reject(new Error(`Phone number must be at least ${minLength} digits`));
    default:
      return Promise.resolve();
  }
};

export default validatePhoneNumber;

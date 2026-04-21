const validateAtLeastOneCharacter = (_: unknown, value: string) => {
  if (!value || value.trim().length < 1) {
    return Promise.reject();
  }
  return Promise.resolve();
};

export default validateAtLeastOneCharacter;

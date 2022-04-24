export const validate = (input: string, state: any | undefined = undefined) => {
  const value = Number(input);

  if (value === 0) {
    return 'Error proper amount - zero value';
  }

  if (!state) {
    return '';
  }

  if (value < state.minValue) {
    return 'Error proper amount - less than provided';
  }

  return '';
};

export const correctState = (input: string, state: any | undefined = undefined) => {
  if (input === '') {
    return '';
  }

  if (validate(input, state) !== '') {
    return 'false';
  }

  return 'true';
};

export const isValidInput = (input: string) => {
  const reg = /^([1-9]\d+|0)?\.?\d*$/;

  return reg.test(input);
};

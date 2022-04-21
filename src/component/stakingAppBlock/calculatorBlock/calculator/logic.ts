const MIN_VALUE = 0;

export const validate = (input: string, minValue = MIN_VALUE) => {
  const value = Number(input);

  if (value === 0) {
    return 'Error proper amount - zero value';
  }

  if (value < minValue) {
    return 'Error proper amount - less than provided';
  }

  return '';
};

export const correctState = (input: string, minValue = MIN_VALUE) => {
  if (input === '') {
    return '';
  }

  if (validate(input, minValue) !== '') {
    return 'false';
  }

  return 'true';
};

export const isValidInput = (input: string) => {
  const reg = /^([1-9]\d+|0)?\.?\d*$/;

  return reg.test(input);
};

export const calculateReward = (input: number, state: any | undefined = undefined) => {
  const res = input * (((state?.apy || 100) / 100) - 1);
  return Math.floor(res * 1000) / 1000;
};

export const validate = (input: string) => {
  if (Number(input) === 0) {
    return 'Error proper amount - zero value';
  }

  return '';
};

export const correctState = (input: string) => {
  if (input === '') {
    return '';
  }

  if (validate(input) !== '') {
    return 'false';
  }

  return 'true';
};

export const isValidInput = (input: string) => {
  const reg = /^([1-9]\d+|0)?\.?\d*$/;

  return reg.test(input);
};

export const calculateReward = (input: number, param: number) => (
  Math.floor(input * param * 1000) / 1000
);

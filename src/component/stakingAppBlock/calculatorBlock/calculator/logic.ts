export const validate = (input: string) => {
  if (Number(input) === 0) {
    return 'Error proper amount - zero value';
  }

  return '';
};

export const isCorrectInput = (input: string) => {
  const reg = /^([1-9]\d+|0)?\.?\d*$/;

  return reg.test(input);
};

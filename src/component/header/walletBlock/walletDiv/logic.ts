const MAX_LENGTH = 13;
const TAIL_LENGTH = 4;
const HEAD_LENGTH = MAX_LENGTH - TAIL_LENGTH - 3;

const reductAddress = (address: string) => {
  if (address.length <= MAX_LENGTH) {
    return address;
  }

  const begin = address.slice(0, HEAD_LENGTH);
  const end = address.slice(address.length - TAIL_LENGTH, address.length);

  return `${begin}...${end}`;
};

export default reductAddress;

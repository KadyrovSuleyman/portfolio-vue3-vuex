import reductAddress from '../logic';

it('short address', () => {
  const addr = '0x00000000001';
  expect(reductAddress(addr)).toBe(addr);
});

it('long address', () => {
  const addr = '0x111100000000000000002222';
  expect(reductAddress(addr)).toBe('0x1111...2222');
});

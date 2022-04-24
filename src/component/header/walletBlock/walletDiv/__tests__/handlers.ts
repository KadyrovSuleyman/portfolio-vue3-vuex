import { nextTick } from 'vue';
import createCopyClickHadnler from '../handlers';

it('createCopyClickHadnler', async () => {
  const state = {
    value: {
      showModal: jest.fn(),
      address: 'address',
    },
  } as any;

  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(),
    },
  });

  expect(state.value.showModal).toBeCalledTimes(0);
  expect(navigator.clipboard.writeText).toBeCalledTimes(0);
  createCopyClickHadnler(state)();
  await nextTick();
  expect(state.value.showModal).toBeCalledTimes(1);
  expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  expect(navigator.clipboard.writeText).toBeCalledWith(state.value.address);
});

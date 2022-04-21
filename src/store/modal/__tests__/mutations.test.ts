/* eslint-disable no-shadow */
import mutations from '../mutations';

const state = {
  first: false,
  second: false,
};

it('show/hide', () => {
  expect(state.first).toBeFalsy();

  mutations.show(state, 'first');
  expect(state).toEqual({
    first: true,
    second: false,
  });

  mutations.show(state, 'second');
  expect(state).toEqual({
    first: true,
    second: true,
  });

  mutations.hide(state, 'second');
  expect(state).toEqual({
    first: true,
    second: false,
  });

  mutations.hide(state, 'first');
  expect(state).toEqual({
    first: false,
    second: false,
  });
});

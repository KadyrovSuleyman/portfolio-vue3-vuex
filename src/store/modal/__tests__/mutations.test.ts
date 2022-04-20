/* eslint-disable no-shadow */
import mutations from '../mutations';
import MODAL from './enum';

const state = {
  first: false,
  second: false,
};

it('show/hide', () => {
  expect(state.first).toBeFalsy();

  mutations.show(state, MODAL.first);
  expect(state).toEqual({
    first: true,
    second: false,
  });

  mutations.show(state, MODAL.second);
  expect(state).toEqual({
    first: true,
    second: true,
  });

  mutations.hide(state, MODAL.second);
  expect(state).toEqual({
    first: true,
    second: false,
  });

  mutations.hide(state, MODAL.first);
  expect(state).toEqual({
    first: false,
    second: false,
  });
});

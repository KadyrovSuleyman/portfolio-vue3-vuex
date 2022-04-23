/* eslint-disable no-param-reassign */
import { ref } from 'vue';
import { Store } from 'vuex';

export const value = ref('');

export const adapt = (store: Store<any>) => ({
  ...store.state,
});

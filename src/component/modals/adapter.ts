import { ref } from 'vue';
import { Store } from 'vuex';

export type ModalsT = {
  [modal: string]: boolean,
}

export const modalsShown = ref<ModalsT>({
  connectWallet: false,
  transactionConfirmed: false,
  replenish: false,
});

const adapt = (store: Store<any>): ModalsT => ({
  ...store.state.modalsShown,

  // ...modalsShown.value,
});
export default adapt;

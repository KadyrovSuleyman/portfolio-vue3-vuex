import { ref } from 'vue';
import { Store } from 'vuex';

const address = ref('0хCb99...8EBb');
const balance = ref('0.029 BUSD');

const adapt = (store: Store<any>) => ({
  // address: store.state.address,
  // balance: store.state.balance,

  address: address.value,
  balance: balance.value,
});

export const generateCopyClickHandler = (store: Store<any>) => () => {
  const state = adapt(store);

  navigator.clipboard.writeText(state.address)
    .then(() => { store.commit('showCopied'); });
};

export default adapt;

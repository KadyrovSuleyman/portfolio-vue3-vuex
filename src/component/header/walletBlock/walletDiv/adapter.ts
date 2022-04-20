import { ref } from 'vue';
import { Store } from 'vuex';

const address = ref('0хCb99...8EBb');
const balance = ref('0.029 BUSD');

const coinName = ref('binance');
const coinLink = ref('icon/walletconnect.svg');

const adapt = (store: Store<any>) => ({
  // address: store.state.address,
  // balance: store.state.balance,
  // coinName: store.state.coinName,
  // coinLink: store.state.coinLink,

  address: address.value,
  balance: balance.value,
  coinName: coinName.value,
  coinLink: coinLink.value,
});

export const generateCopyClickHandler = (store: Store<any>) => () => {
  const state = adapt(store);

  navigator.clipboard.writeText(state.address)
    .then(() => { store.commit('showCopied'); });
};

export default adapt;

import { ref } from 'vue';
import MODAL from '@/store/modal/types';
import { Store } from 'vuex';

const address = ref('0хCb99...8EBb');
const balance = ref(0.029);

const coinName = ref('binance');
const coinLink = ref('icon/walletconnect.svg');
const coinAbbreviation = ref('BUSD');

const adapt = (store: Store<any>) => ({
  address: store.state.account.address,
  balance: store.getters['account/balance'],
  coinName: store.getters['coin/name'],
  coinLink: store.getters['coin/icon'],
  coinAbbreviation: store.getters['coin/abbreviation'],

  // address: address.value,
  // balance: balance.value,
  // coinName: coinName.value,
  // coinLink: coinLink.value,
  // coinAbbreviation: coinAbbreviation.value,
});

export const generateCopyClickHandler = (store: Store<any>) => () => {
  const state = adapt(store);

  navigator.clipboard.writeText(state.address)
    .then(() => { store.dispatch('modal/show', MODAL.copied); });

  store.dispatch('coin/select', 'ethereum');
};

export default adapt;

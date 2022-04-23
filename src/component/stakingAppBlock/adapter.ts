import { ref } from 'vue';
import { Store } from 'vuex';

export const isStaked = ref<boolean>(true);

export const adapt = (store: Store<any>) => ({
  isWalletApproved: store.state.wallet.isApproved,
  isStaked: store.state.stake.isStaked,
});

export const generateViewContractClickHandler = (store: Store<any>) => () => {
  store.commit('stake/mockCountdown', 3000);
};

import { ref } from 'vue';
import { Store } from 'vuex';

export type WalletsListItemT = {
  name: string,
  icon: string,
}

export const walletsList = ref<WalletsListItemT[]>([
  {
    name: 'MetaMask',
    icon: 'icon/metaMask.svg',
  },
  {
    name: 'Walletconnect',
    icon: 'icon/walletconnect.svg',
  },
]);

export const selectedWallet = ref<WalletsListItemT | undefined>();

const adapt = (store: Store<any>) => ({
  // walletsList: store.state.walletsList,
  // selectedWallet: store.state.selectedWallet,

  walletsList: walletsList.value,
  selectedWallet: selectedWallet.value,
});
export default adapt;

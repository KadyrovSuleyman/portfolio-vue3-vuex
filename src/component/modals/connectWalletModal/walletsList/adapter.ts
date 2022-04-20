// import { WalletT } from '@/store/wallet/state';
import { ref } from 'vue';
import { Store } from 'vuex';
import { WalletT } from '@/store/wallet/types.d';

// export type WalletsListItemT = {
//   name: string,
//   icon: string,
// }

// export const walletsList = ref<WalletsListItemT[]>([
// {
//   name: 'MetaMask',
//   icon: 'icon/metaMask.svg',
// },
// {
//   name: 'Walletconnect',
//   icon: 'icon/walletconnect.svg',
// },
// ]);

export const selectedWallet = ref<WalletT | undefined>();

const adapt = (store: Store<any>) => ({
  walletsList: store.state.wallet.list,
  // selectedWallet: store.state.selectedWallet,

  // walletsList: walletsList.value,
  // selectedWallet: selectedWallet.value,
});
export default adapt;

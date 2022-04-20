import { createLogger, createStore } from 'vuex';
import { CoinT } from './coin/types.d';
import { WalletT } from './wallet/types.d';
import modal from './modal';
import wallet from './wallet';
import coin from './coin';
import account from './account';

const store = createStore<any>({
  modules: {
    modal,
    wallet,
    coin,
    account,
  },

  state: {
    isWaiting: false,
    isStaked: false,
    isReplenishAvailable: false,
    isRestakeAvailable: false,
    restakeCountdown: '00:00:09',

    address: 'asdfasdf',
  },
  mutations: {
    changee: (state, obj: { [name: string]: boolean | string }) => {
      Object.keys(obj).forEach((index) => {
        state[index] = obj[index];
      });
    },
  },
});

const walletList: WalletT[] = [{
  name: 'MetaMask',
  icon: 'icon/metaMask.svg',
},
{
  name: 'Walletconnect',
  icon: 'icon/walletconnect.svg',
}];
store.commit('wallet/load-list', walletList);

const coinList: CoinT[] = [
  {
    name: 'binance',
    abbreviation: 'BUSD',
    icon: 'icon/binance.svg',
  },
];
store.commit('coin/load-list', coinList);

export default store;

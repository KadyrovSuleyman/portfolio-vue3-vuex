import { createLogger, createStore } from 'vuex';
import { CoinT } from './coin/types.d';
import { WalletT } from './wallet/types.d';
import { TariffT } from './tariff/types.d';
import modal from './modal';
import wallet from './wallet';
import coin from './coin';
import account from './account';
import stake from './stake';
import tariff from './tariff';
import waiting from './waiting';
import tariffList from './__mocks__/tariffList';

const store = createStore<any>({
  modules: {
    modal,
    wallet,
    coin,
    account,
    stake,
    tariff,
    waiting,
  },

  state: {
    isWaiting: false,
  },
  mutations: {
    changee: (state, obj: { [name: string]: boolean | string }) => {
      Object.keys(obj).forEach((index) => {
        state[index] = obj[index];
      });
    },
  },
});

// const coinList: CoinT[] = [
//   {
//     name: 'binance',
//     abbreviation: 'BUSD',
//     icon: 'icon/binance.svg',
//   },
//   {
//     name: 'ethereum',
//     abbreviation: 'ETH',
//     icon: 'icon/binance.svg',
//   },
// ];
// store.dispatch('coin/load-list', coinList);

// const tariffList: TariffT[] = [
//   {
//     period: 30,
//     apy: 103.23,
//     amountMin: 100,
//     amountMax: 299,
//   },
//   {
//     period: 90,
//     apy: 116.86,
//     amountMin: 100,
//     amountMax: 299,
//   },
//   {
//     period: 150,
//     apy: 129.97,
//     amountMin: 500,
//     amountMax: 1000,
//   },
// ];
store.dispatch('tariff/load-list', tariffList);

export default store;

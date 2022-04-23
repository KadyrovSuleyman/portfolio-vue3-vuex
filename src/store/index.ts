import { createLogger, createStore } from 'vuex';
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
});

store.dispatch('tariff/load-list', tariffList);

export default store;

import { Store } from 'vuex';

const adaptState = (store: Store<any>) => ({ ...store.state });
export default adaptState;

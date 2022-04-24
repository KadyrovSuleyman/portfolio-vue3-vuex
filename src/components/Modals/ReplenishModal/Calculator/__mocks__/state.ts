import { Store } from 'vuex';

const adaptState = (store: Store<any>, props: any) => ({
  ...store.state,
  value: props.value,
  setValue: props.setValue,
});

export default adaptState;

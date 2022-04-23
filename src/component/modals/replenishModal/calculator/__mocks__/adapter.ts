import { Store } from 'vuex';

const adapt = (store: Store<any>, props: any) => ({
  ...store.state,
  value: props.value,
  setValue: props.setValue,
});

export default adapt;

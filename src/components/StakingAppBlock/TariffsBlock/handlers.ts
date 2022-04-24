import { ComputedRef } from 'vue';
import { extractNumber, getSelectListKey } from './logic';
import { StateT } from './adapter';

const createClickHandler = ({ state, className = 'tariffItem' } : {
  className: string,
  state: ComputedRef<StateT>,
}) => (payload: MouseEvent) => {
  payload.preventDefault();

  const targetItem = payload.target as HTMLElement;
  const targetString = getSelectListKey(targetItem, className);

  const key = extractNumber(targetString);
  state.value.select(key);
};

export default createClickHandler;

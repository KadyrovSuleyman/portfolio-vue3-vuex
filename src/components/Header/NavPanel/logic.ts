/* eslint-disable no-param-reassign */
import { ref } from 'vue';

export const navItems = ref<{ [item: string]: boolean }>(
  {
    Stacking: true,
    Bridge: false,
    SHO: false,
  },
);

// ----------------------------
export const selectToClosure = (obj: {[name: string]: boolean }, item: string) => {
  if (obj[item] === undefined) {
    return;
  }

  Object.keys(obj).forEach((key) => {
    if (key === item) {
      obj[key] = true;
      return;
    }
    obj[key] = false;
  });
};

// ----------------------------
export const clickHandlerToClosure = (obj: { [name: string]: boolean }, payload: MouseEvent) => {
  payload.preventDefault();

  const targetItem = (payload.target as HTMLAnchorElement).textContent || '';
  // console.warn(`${targetItem}: sending request`);
  // -----------
  // console.warn(`${targetItem}: sending answer`);
  selectToClosure(obj, targetItem);
};
export const clickHandler = (payload: MouseEvent) => clickHandlerToClosure(navItems.value, payload);

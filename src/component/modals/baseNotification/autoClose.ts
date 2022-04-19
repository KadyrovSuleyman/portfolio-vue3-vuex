import { onMounted, onUnmounted } from 'vue';

export const AUTOCLOSE_TIME = 30000;

const autoClose = (callback: CallableFunction, time = AUTOCLOSE_TIME) => {
  let timer: number;

  onMounted(() => {
    timer = setTimeout(callback, time);
  });

  onUnmounted(() => clearTimeout(timer));
};

export default autoClose;

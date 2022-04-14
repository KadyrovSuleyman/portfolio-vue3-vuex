import { onMounted, onUnmounted } from 'vue';

const AUTOCLOSE_TIME = 5000;

const autoClose = (callback: CallableFunction, time = AUTOCLOSE_TIME) => {
  let timer: number;

  onMounted(() => {
    timer = setTimeout(callback, time);
  });

  onUnmounted(() => clearTimeout(timer));
};

export default autoClose;

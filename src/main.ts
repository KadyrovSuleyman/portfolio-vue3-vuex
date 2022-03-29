import { createApp } from 'vue';
import App from './component/app.vue';
import store from './store';

createApp(App).use(store).mount('#app');

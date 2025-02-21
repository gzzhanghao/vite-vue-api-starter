import 'uno.css';
import './styles/main.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';

import router from './router';

const app = createApp(RouterView);

app.use(createPinia());
app.use(router);

app.mount('#app');

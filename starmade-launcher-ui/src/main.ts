import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { vClickOutside } from './directives/clickOutside';

const app = createApp(App);
app.directive('click-outside', vClickOutside);
app.mount('#app');

import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';  // 引入 Vuex store
import axios from 'axios';

// 设置 axios 的默认 baseURL
axios.defaults.baseURL = 'http://localhost:3000';

// 创建 Vue 应用实例
const app = createApp(App);

// 安装插件
app.use(store);
app.use(router);

// 设置全局属性
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$http = 'http';

// 挂载到 DOM
app.mount('#app');
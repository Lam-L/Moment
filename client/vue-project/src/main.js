import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';  // 引入 Vuex store
import axios from 'axios';

// const app = createApp(App);
// app.use(router);
// app.mount('#app')
axios.default.baseURL = 'http://localhost:3000'

app = createApp(App)
.use(store)
.use(router)  
.mount('#app')
app.config.globalProperties.$axios = axios;

// createApp(App).mount('#app')

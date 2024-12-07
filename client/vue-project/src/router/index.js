import { createRouter, createWebHistory } from 'vue-router';

// 导入页面组件
import Home from '../pages/Home.vue';
import About from '../pages/About.vue'

// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home 
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('../pages/Login.vue')
  }
];

// 创建路由实例并传入配置
const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 History 模式
  routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

// 导入页面组件
import Home from '../pages/Home.vue';
import About from '../pages/About.vue'
import { compile } from 'vue';
import { useStore } from 'vuex';
import store from '../store';

// Vue.use(Router);
// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
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
  },
    {
    path: '/sign-up',
    name: 'SignUp',
    component: ()=> import('../pages/SignUp.vue')
  },
    {
    path: '/post',
    name: 'Post',
    component: ()=> import('../pages/Post.vue'),
    meta: { requiresAuth: true }
  },
   {
    path: '/welcome',
    name: 'Welcome',
    component: ()=> import('../pages/Welcome.vue')
   },
   {
    path: '/profile',
    name: 'Profile',
    component: ()=> import('../pages/Profile.vue')
   },
   {
    path: '/user/:userid/post',
    name: "UserPost",
    component: () => import("../pages/UserPost.vue")
   },
    {
    path: '/user/:userid/following',
    name: "Following",
    component: () => import("../pages/Following.vue")
   },
    {
    path: '/journal-history',
    name: "JournalHistory",
    component: () => import("../pages/JournalHistory.vue")
   }
];



// 创建路由实例并传入配置
const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 History 模式
  routes
});

router.beforeEach((to, from, next) => {
    // 判断目标路由是否需要登录权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 检查用户是否已登录
        if (!store.getters.isLoggedIn) { 
            console.log(store.getters.userid);
            console.log("hey hey baby");
            // 如果未登录，跳转到登录页面
            next({ path: '/login', query: { redirect: to.fullPath } });
        } else {
            console.log(store.getters.userid);
          console.log("baby hey hey")
            next(); // 如果已登录，允许进入
        }
    } else {
        next(); // 对于无需权限的页面，直接允许访问
    }
});

export default router;

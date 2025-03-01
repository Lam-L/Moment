<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <!-- 未登录状态显示登录和注册链接 -->
      <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/sign-up">Sign Up</router-link></li>
      
      <!-- 登录后显示的内容 -->
      <li v-if="isAuthenticated"><router-link to="/post">Posts</router-link></li>
      <li v-if="isAuthenticated"><router-link to="/profile">My Profile</router-link></li>
      <li v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppNavigation',
  data() {
    return {
      // 假设用户的登录状态存储在 localStorage 中
    //   isAuthenticated: false
    };
  },
  created() {
    // 从 localStorage 或 Vuex 获取用户的登录状态
    const authStatus = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = authStatus === 'true';
  },
  methods: {
    async logout() {
        // 触发 Vuex 的 logout action
        await this.$store.dispatch('logout'); // 使用 await 确保 Vuex 完成状态更新

        // 跳转到登录页面
        this.$router.push('/login'); 

        // 清除 token（如果有）
        localStorage.removeItem('token');
    },
  },
  computed: {
    ...mapState(['isAuthenticated']),
    // isAuthenticated: state => state.isAuthenticated,
  },
};
</script>

<style scoped>
/* 导航栏的基础样式 */
nav {
  background-color: #ffffff; /* 使用干净的白色背景 */
  padding: 1rem 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 轻微阴影增加深度感 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  display: flex;
  justify-content: flex-start; /* 导航项在一行内排列 */
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 2rem; /* 项目之间的间距 */
}

router-link {
  color: #333; /* 使用柔和的深灰色 */
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

router-link:hover {
  background-color: #008CBA; /* 蓝色悬停背景 */
  color: #fff; /* 悬停时文字变为白色 */
}

button {
  padding: 0.5rem 1.2rem;
  background-color: #f3a847; /* 温暖的橙色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d6872f; /* 悬停时变暗 */
}
</style>

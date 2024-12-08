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
      <li v-if="isAuthenticated"><router-link to="/my-profile">My Profile</router-link></li>
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
nav {
  background-color: cadetblue;
  color: white;
  padding: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline;
  margin-right: 15px;
}
button {
  background-color: #ff6347;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

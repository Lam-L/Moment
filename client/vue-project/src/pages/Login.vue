<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div class="form-group">
        <button type="submit">Login</button>
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { Login } from '../service/api'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '', // Error message for invalid login
    };
  },
  methods: {
    async handleLogin() {
      try {
        // 调用Login API，传入用户名和密码
        console.log("Hello")
        const response = await Login(this.username, this.password);
        console.log("end hello")

        // 假设登录成功后返回数据中有 token 或用户信息
        console.log('Login success:', response.data);
        this.$store.dispatch('login', response.data.userid);
        // 你可以将 token 存储到 localStorage 或Vuex 中
        localStorage.setItem('token', response.data.token);
        // 登录成功后，跳转到主页
        this.$router.push('/');
      } catch (error) {
        // 捕获错误并显示错误消息
        // this.errorMessage = error.response?.data?.message || 'Invalid username or password';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>

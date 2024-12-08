<template>
  <div class="signup-container">
    <h1>注册</h1>
    
    <form @submit.prevent="handleSubmit" class="signup-form">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          placeholder="请输入用户名"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          placeholder="请输入密码"
          required
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="formData.confirmPassword"
          placeholder="请确认密码"
          required
        />
      </div>

      <button type="submit" class="signup-btn">注册</button>
    </form>

    <p class="login-link">
      已经有账户了？ <router-link to="/login">登录</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 处理提交表单
    async handleSubmit() {
      // 简单的表单验证
      if (this.formData.password !== this.formData.confirmPassword) {
        alert("密码和确认密码不匹配！");
        return;
      }

      try {
        // 假设我们将数据发送到后端进行注册
        const response = await fetch("http://localhost:3000/api/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (data.success) {
          alert("注册成功！");
          this.$router.push("/login");  // 注册成功后跳转到登录页面
        } else {
          alert(data.message || "注册失败，请重试！");
        }
      } catch (error) {
        console.error("注册失败", error);
        alert("注册失败，请稍后重试！");
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.signup-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

input:focus {
  outline: none;
  border-color: #4d90fe;
}

button.signup-btn {
  padding: 12px;
  background-color: #4d90fe;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button.signup-btn:hover {
  background-color: #357ae8;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #4d90fe;
  text-decoration: none;
}
</style>

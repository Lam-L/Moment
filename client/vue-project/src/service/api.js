import axios from 'axios';
import store from '@/store'; 

// 使用环境变量配置基础 URL
// 配置 Axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3000',
  timeout: 5000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});

//注册 API请求
export const Sign  = (username, password) => {
  return api.post('api/')
}


// 登录 API 请求
export const Login = (username, password) => {
  console.log('Login data:', { username, password });  // 打印请求数据

  return api.post('/api/auth/login', { username, password })
    .then(response => {
      console.log('Login response:', response); // 打印响应内容
      const userid = response.data.userid;
      store.dispatch('login', userid);
      return response;  // 返回响应
    })
    .catch(error => {
      console.error('Login error:', error); // 打印错误信息
      throw error;  // 抛出错误
    });
};

// 导出配置好的 api 实例

export default api;
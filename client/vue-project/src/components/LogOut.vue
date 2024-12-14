<template>
  <button @click="handleLogout">Log Out</button>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore(); // Vuex Store 实例
    const router = useRouter(); // Vue Router 实例

    const handleLogout = async () => {
      try {
        // 调用 Vuex 中的 logout action
        await store.dispatch('logout');

        // 重定向到登录页面
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      handleLogout,
    };
  },
};
</script>

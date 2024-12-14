<script setup>
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue';
</script>

<template>
  <div class="app-container">
    <AppNavigation />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  <AppFooter />
</template>

<style scoped>
/* 主容器 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 页面总高度至少为视口高度 */
}

/* 主内容部分 */
.content {
  flex: 1;
}

/* Footer */
.AppFooter {
  margin-top: auto; /* Footer 推到页面底部 */
}
</style>

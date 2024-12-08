<script setup>
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue';
</script>

<template>
  <AppNavigation />
  <router-view></router-view>
  <AppFooter />
</template>

<style scoped>
/* template {
  display: flex;
  flex-direction: column;
} */

</style>

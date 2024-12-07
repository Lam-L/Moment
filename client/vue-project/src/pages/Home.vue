<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <header>
    <router-link to="/about">Go to About</router-link>
    <router-link to="/login">Login</router-link>
    <p>Current route: {{ $route.path }}</p>
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>

</template>
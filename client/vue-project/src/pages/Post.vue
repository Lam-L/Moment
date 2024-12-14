<template>
  <div class="home">
    <h1>Welcome to the Blog</h1>

   <button @click="showModal = true">Create New Post</button>
    <!-- Modal 组件 -->
    <CreatePost :isVisible="showModal" :closeModal="closeModal" />
    <div class="main">
        <PostList />
        <UserList />
    </div>
  </div>
</template>

<script>
import CreatePost from "@/components/CreatePost.vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import { ref } from 'vue';

export default {
  name: "Post",
  components: {
    PostList,
    CreatePost,
    UserList,
  },
  data() {
    return {
        showModal: false,
    }
  },
  
  methods: {
    closeModal() {
        this.showModal = false;
    },
  }
};
</script>

<style scoped>
.main {
  display: flex;
}
.home {
  padding: 20px;
}

.home h1 {
  text-align: center;
}
</style>

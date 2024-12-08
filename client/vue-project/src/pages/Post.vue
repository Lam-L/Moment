<template>
  <div class="home">
    <h1>Welcome to the Blog</h1>

   <button @click="showModal = true">Create New Post</button>
    <!-- Modal 组件 -->
    <CreatePost :isVisible="showModal" :closeModal="closeModal" />
    <PostList />
  </div>
</template>

<script>
import CreatePost from "@/components/CreatePost.vue";
import PostList from "@/components/PostList.vue";
import { ref } from 'vue';

export default {
  name: "Post",
  components: {
    PostList,
    CreatePost,
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
.home {
  padding: 20px;
}

.home h1 {
  text-align: center;
}
</style>

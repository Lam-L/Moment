<template>
  <div class="home">
    

    <!-- Modal 组件 -->
    <CreatePost :isVisible="showModal" :closeModal="closeModal" />
    <div class="main">
        <div class="head">
            <h1>Welcome to the Blog</h1>
            <button @click="showModal = true">Create New Post</button>
        </div>
        <PostList  :userId="this.$store.state.userid" :showDelete="true" />
    </div>
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
  computed: {
    userId() {
        return Number(this.$route.params.userid);
    },
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
  display: flex;
  justify-content: center;
  gap: 50px;

}

.main {
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  justify-content: center;
}

.head {
  display: flex;
  justify-content: center;
}

.home {
  padding: 20px;
}

.home h1 {
  text-align: center;
}
</style>

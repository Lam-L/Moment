<template>
  <div class="post-list">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  name: 'PostList',
  components: {
    PostItem
  },
  data() {
    return {
      posts: []  // 初始化为空数组，后续通过 API 获取
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/post/1');  // 替换为你的 API 地址
        const data = await response.json();
        this.posts = data.posts;  // 假设返回的结构是 { posts: [...] }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  }
};
</script>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
}
</style>

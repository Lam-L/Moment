<template>
  <div class="post-list">
    <PostItem v-for="post in posts" :key="post.id" :post="post" :showDelete="showDelete" @post-deleted="removePost"/>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  name: 'PostList',
  components: {
    PostItem,
  },
  props: {
    userId: {
      type: [Number, null], // 可以是数字（特定用户 ID）或者 null（加载广场帖子）
      default: null,
      required: false,
    },
    showDelete: {
      type: Boolean,
      default: false, // 默认不显示删除按钮
    },
  },
  data() {
    return {
      posts: [], // 初始化为空数组，后续通过 API 获取
    };
  },
  created() {
    this.fetchPosts();
    
  },
  methods: {
    async fetchPosts() {
      try {
        // 动态 API 地址：如果 userId 存在，则加载用户的帖子，否则加载广场帖子
        const apiUrl = this.userId
          ? `http://localhost:3000/api/post/${this.userId}/user` :
            `http://localhost:3000/api/post/${this.$store.state.userid}/square`; // 替换为广场 API

        console.log(apiUrl)

        const response = await fetch(apiUrl);
        const data = await response.json();
        this.posts = data.posts; // 假设返回的结构是 { posts: [...] }
        console.log(this.posts)
        // 如果有用户头像字段，动态设置头像 URL
        this.posts.forEach(
          (item) => (item.userAvatar = `https://randomuser.me/api/portraits/men/${item.userAvatar}.jpg`)
        );

        console.log(this.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },

    removePost(postId) {
      this.posts = this.posts.filter((post) => post.postid !== postId);
      console.log(`Post with ID ${postId} removed from the list.`);
    },
  },
  watch: {
    // 当 userId 变化时，重新加载数据
    userId: 'fetchPosts',
  },
};
</script>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
}
</style>

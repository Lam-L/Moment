<template>
  <div class="post-item">
    <h2>{{ post.posttitle }}</h2>
    <p>{{ post.content }}</p>
    <span>{{ post.userid }}</span>
    <span>{{ post.createdAt }}</span>
    <span>{{ post.likeCount }}</span>
    <span>{{ post.userLiked }}</span>
    <span @click="toggleLike" class="like-icon">
      <span v-if="post.userLiked" role="button">❤️</span>
      <span v-else role="button">🤍</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods:{
    async toggleLike() {
      try {
        // 假设有一个 API 用来更新点赞状态
        const action = this.post.userLiked ? 'unlike' : 'like';
        const response = await fetch(`http://localhost:3000/api/post/${this.post.postid}/like`, {
          method: 'POST',
          body: JSON.stringify({ "userid" : 1 }),
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();

        // 根据返回的结果更新点赞状态和点赞数
        if (data.success) {
          this.post.userLiked = !this.post.userLiked;
          this.post.likeCount += this.post.userLiked ? 1 : -1;
        } else {
          console.error('Failed to update like status');
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    }
  },
  getters: {
    getUserId(state) {
      return state.userid;
    }
  }
};
</script>

<style scoped>
.post-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 20px;
}

.post-item h2 {
  font-size: 1.5em;
}

.post-item p {
  font-size: 1.1em;
}

.post-item span {
  display: block;
  color: #555;
  font-size: 0.9em;
}

.like-icon {
  cursor: pointer; /* 鼠标悬停时显示为可点击 */
  font-size: 1.5em;  /* 增大图标尺寸 */
  display: inline-block;
  margin-left: 10px;
}
</style>

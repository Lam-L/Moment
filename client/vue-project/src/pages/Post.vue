<template>
  <div class="home">
    

    <!-- Modal 组件 -->
    <CreatePost :isVisible="showModal" :closeModal="closeModal" />
    <div class="main">
        <div class="head">
            <h1>Welcome to the Blog</h1>
            <button @click="showModal = true">Create New Post</button>
        </div>
        <PostList />
    </div>
    <UserList />
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

/* 优化创建帖子的按钮 */
.head button {
  background-color: #4CAF50; /* 按钮的背景色，使用绿色更显眼 */
  color: white; /* 按钮文字颜色 */
  font-size: 16px; /* 增大文字尺寸 */
  padding: 10px 20px; /* 添加内边距，增大点击区域 */
  border: none; /* 去掉边框 */
  border-radius: 8px; /* 圆角按钮 */
  cursor: pointer; /* 鼠标悬停时变成指针 */
  transition: all 0.3s ease; /* 添加动画过渡效果 */
}

.head button:hover {
  background-color: #45a049; /* 鼠标悬停时背景色稍微变深 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

.head button:active {
  background-color: #3e8e41; /* 按下按钮时背景色更深 */
  transform: scale(0.98); /* 按下按钮时缩小一点点 */
}

</style>

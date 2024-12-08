<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>Create a New Post</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="newPost.title"
            placeholder="Enter your post title"
            required
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            id="content"
            v-model="newPost.content"
            placeholder="Write your post content here"
            rows="6"
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreatePost',  // 修改组件名为 CreatePost
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      newPost: {
        title: '',
        content: ''
      }
    };
  },
  methods: {
    close() {
      this.closeModal(); // 关闭模态框
    },
async handleSubmit() {
      // 检查是否输入了标题和内容
      console.log(this.$store.state.userid)
      if (!this.newPost.title || !this.newPost.content) {
        alert('Please fill in both title and content!');
        return;
      }

      try {
        // 发送 HTTP 请求到后台 API 创建新帖子
        const response = await axios.post('http://localhost:3000/api/post', {
          posttitle: this.newPost.title,
          userid: this.$store.state.userid,
          content: this.newPost.content
        });

        // 输出后台响应
        console.log('New Post Created:', response.data);

        // 清空表单
        this.newPost.title = '';
        this.newPost.content = '';

        // 关闭模态框
        this.close();

        // 提示用户帖子已创建
        alert('Post created successfully!');
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post.');
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form button {
  background-color: #4caf50;
}

button[type="submit"]:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>

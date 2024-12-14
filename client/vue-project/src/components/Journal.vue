<template>
  <div class="journal-container">
    <h2>Today's Journal</h2>
    <textarea 
      v-model="journalText" 
      placeholder="Write your thoughts here..." 
      rows="6" 
      class="journal-textarea"
    ></textarea>
    <button @click="handleSubmit" class="submit-btn">Submit</button>
    <p v-if="submitted" class="confirmation-message">Your journal has been saved!</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Journal',
  data() {
    return {
      journalText: '',  // 记录日记内容
      submitted: false, // 是否已提交
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // 发送 HTTP 请求到后台 API 创建新帖子
        const response = await axios.post('http://localhost:3000/api/moment', {
          userid: this.$store.state.userid,
          content: this.journalText
        });

        // 输出后台响应
        console.log('New Post Created:', response.data);

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
.journal-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.journal-textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

.confirmation-message {
  text-align: center;
  color: green;
  margin-top: 20px;
}
</style>

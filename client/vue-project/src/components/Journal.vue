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
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="submitted" class="confirmation-message">Your journal has been saved!</p>
    <button @click="viewHistory" class="history-btn">View Journal History</button>
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
      errorMessage: '' // 错误消息
    };
  },
  methods: {
    async handleSubmit() {
      // 校验用户输入是否为空或仅包含空格
      if (!this.journalText.trim()) {
        this.errorMessage = 'Journal content cannot be empty!';
        setTimeout(() => (this.errorMessage = ''), 3000); // 3秒后清除错误消息
        return;
      }

      try {
        // 发送 HTTP 请求到后台 API 创建新帖子
        const response = await axios.post('http://localhost:3000/api/moment', {
          userid: this.$store.state.userid,
          content: this.journalText
        });

        // 输出后台响应
        console.log('New Post Created:', response.data);

        // 提示用户帖子已创建
        this.submitted = true;
        this.journalText = ''; // 清空输入框
        setTimeout(() => (this.submitted = false), 3000);
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post.');
      }
    },
    viewHistory() {
      // 跳转到历史日记页面或触发历史日记的显示逻辑
      this.$router.push('/journal-history');
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

.error-message {
  text-align: center;
  color: red;
  margin-top: 20px;
}

.history-btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.history-btn:hover {
  background-color: #0056b3;
}
</style>

<template>
  <div class="journal-container">
    <h2>Feel Free to Journal</h2>
    <textarea 
      v-model="journalText" 
      placeholder="Write your thoughts here..." 
      rows="6" 
      class="journal-textarea"
    ></textarea>
    <button @click="submitJournal" class="submit-btn">Submit</button>
    <p v-if="submitted" class="confirmation-message">Your journal has been saved!</p>
  </div>
</template>

<script>
export default {
  name: 'Journal',
  data() {
    return {
      journalText: '',  // 记录日记内容
      submitted: false, // 是否已提交
    };
  },
  methods: {
    submitJournal() {
      if (this.journalText.trim()) {
        // 假设在这里你会将日记内容提交到后端，暂时只做本地存储
        console.log('Journal submitted:', this.journalText);
        this.submitted = true;

        // 模拟保存后的清空
        setTimeout(() => {
          this.journalText = '';
          this.submitted = false;
        }, 2000); // 2秒后清空
      } else {
        alert('Please write something before submitting!');
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

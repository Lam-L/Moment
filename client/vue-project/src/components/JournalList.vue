<template>
  <div class="journal-list-container">
    <h2>My Journals</h2>
    <div class="journal-list">
      <JournalItem
        v-for="(journal, index) in journals"
        :key="index"
        :content="journal.content"
        :createdAt="journal.createdAt"
      />
    </div>
  </div>
</template>

<script>
import JournalItem from "./JournalItem.vue";

export default {
  name: "JournalList",
  components: { JournalItem },
  data() {
    return {
      journals: [] // 将从 API 获取的数据放入这里
    };
  },
  created() {
    this.fetchJournals();
  },
  methods: {
    async fetchJournals() {
      try {
        // 假设后端 API 提供获取日记的接口
        const response = await fetch(`http://localhost:3000/api/moment/${this.$store.state.userid}`, {
          method: "GET"
        });
        const data = await response.json();
        this.journals = data.moments;
        console.log(this.journals)

      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    }
  }
};
</script>

<style scoped>
.journal-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.journal-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

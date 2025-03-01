<template>
  <div class="parent-component">
    <div class="month-navigation">
      <button @click="changeMonth(-1)">Previous</button>
      <span>{{ displayMonth }}</span>
      <button @click="changeMonth(1)">Next</button>
    </div>
    <MonthlyMood
      :year="currentYear"
      :month="currentMonth"
      :moods="currentMonthMoods"
      @update-moods="updateMoods"
    />
    <MoodChart :moodData="allMoodData" />
  </div>
</template>

<script>
import MonthlyMood from "./MonthlyMood.vue";
import MoodChart from "./MoodChart.vue";
import axios from "axios";

export default {
  name: "ParentComponent",
  components: { MonthlyMood, MoodChart },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      allMoods: {}, // 缓存所有月份的数据
      currentMonthMoods: [], // 当前月份的心情数据
      allMoodData: [], // 所有心情数据（用于图表）
      userID: null // 当前用户的 ID（假设为 1）
    };
  },
  computed: {
    displayMonth() {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return `${months[this.currentMonth]} ${this.currentYear}`;
    }
  },
  methods: {
    changeMonth(offset) {
      const newMonth = this.currentMonth + offset;
      if (newMonth < 0) {
        this.currentYear -= 1;
        this.currentMonth = 11;
      } else if (newMonth > 11) {
        this.currentYear += 1;
        this.currentMonth = 0;
      } else {
        this.currentMonth = newMonth;
      }

      // 切换月份时重新获取数据
      this.fetchMoods();
    },

    async fetchMoods() {
      const cacheKey = `${this.currentYear}-${this.currentMonth}`;
      try {
        const response = await axios.get("http://localhost:3000/api/mood/", {
          params: { userid: this.$store.state.userid }
        });

        if (Array.isArray(response.data)) {
          const formattedMoods = this.formatMoods(response.data);
          this.currentMonthMoods = formattedMoods;
          // this.$set(this.allMoods, cacheKey, formattedMoods);

          // 更新全局心情数据
          this.allMoodData = response.data.map((item) => ({
            date: item.createdAt,
            mood: item.mood
          }));
        } else {
          console.error("Unexpected response format:", response.data);
          this.currentMonthMoods = [];
        }
      } catch (error) {
        console.error("Error fetching moods:", error);
        this.currentMonthMoods = [];
      }
    },

    formatMoods(moods) {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const formattedMoods = Array.from({ length: daysInMonth }, () => ({ value: null }));

      moods.forEach((mood) => {
        const date = new Date(mood.createdAt);
        if (date.getFullYear() === this.currentYear && date.getMonth() === this.currentMonth) {
          const dayIndex = date.getDate() - 1;
          formattedMoods[dayIndex] = { value: mood.mood };
        }
      });

      return formattedMoods;
    },

    async updateMoods(updatedMoods) {
      const cacheKey = `${this.currentYear}-${this.currentMonth}`;
      this.$set(this.allMoods, cacheKey, updatedMoods);

      try {
        const updatePromises = updatedMoods.map((mood, index) => {
          if (mood.value !== null) {
            const createdAt = new Date(
              this.currentYear,
              this.currentMonth,
              index + 1
            ).toISOString();

            return axios.post("/api/mood", {
              userid: this.userID,
              createdAt,
              mood: mood.value
            });
          }
        });

        await Promise.all(updatePromises);
        this.currentMonthMoods = [...updatedMoods];
        console.log("Moods updated successfully");
      } catch (error) {
        console.error("Error updating moods:", error);
      }
    }
  },
  created() {
    this.fetchMoods();
  }
};
</script>

<style scoped>
.parent-component {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.month-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.month-navigation button {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.month-navigation button:hover {
  background: #0056b3;
}
</style>

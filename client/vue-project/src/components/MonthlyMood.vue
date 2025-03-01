<template>
  <div class="monthly-mood">
    <h2>{{ currentMonth }}</h2>
    <div class="calendar">
      <div class="calendar-header">
        <span v-for="day in weekDays" :key="day" class="calendar-day-name">{{ day }}</span>
      </div>
      <div class="calendar-body">
        <!-- 确保渲染时跳过 null 日期 -->
        <div
          v-for="(date, index) in daysInMonth"
          :key="index"
          v-if="date !== null" 
          class="calendar-day"
          :class="{'has-mood': moods[date - 1]?.mood}"
          :style="{ backgroundColor: this.moodOptions[moods[date - 1]?.value - 1]?.color || '#f0f0f0' }"
          @click="toggleMoodPicker(date)" 
        >
          <span>{{ date }}</span>
          <div v-if="date && visibleMoodIndex === date" class="mood-picker">
            <button
              v-for="mood in moodOptions"
              :key="mood.icon"
              :style="{ backgroundColor: mood.color }"
              @click="setMood(date, mood)"
            >
              {{ mood.icon }}
            </button>
          </div>
          <div v-if="moods[date - 1]?.value" class="mood-icon">
            {{ moodOptions[moods[date - 1]?.value - 1]?.icon }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: "MonthlyMood",
  props: {
    moods: {
      type: Array,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      moodOptions: [
        { value: 1, icon: "😀", color: "#FFD700" },
        { value: 2, icon: "😊", color: "#ADFF2F" },
        { value: 3, icon: "😐", color: "#F0E68C" },
        { value: 4, icon: "😢", color: "#87CEFA" },
        { value: 5, icon: "😡", color: "#FF6347" }
      ],
      visibleMoodIndex: null // 当前显示心情选择器的日期
    };
  },
  computed: {
    currentMonth() {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return `${months[this.month]} ${this.year}`;
    },
    daysInMonth() {
      const days = [];
      const firstDay = new Date(this.year, this.month, 1);
      const lastDay = new Date(this.year, this.month + 1, 0);
      const firstDayWeekday = firstDay.getDay();
      const totalDays = lastDay.getDate();

      // 填充空白占位
      for (let i = 0; i < firstDayWeekday; i++) {
        days.push(null);
      }

      // 填充日期
      for (let i = 1; i <= totalDays; i++) {
        days.push(i);
      }
      return days;
    }
  },
  methods: {
    toggleMoodPicker(date) {
      this.visibleMoodIndex = this.visibleMoodIndex === date ? null : date;
    },

    // 设置心情并发送 POST 请求
    async setMood(date, mood) {
      const formattedDate = new Date(this.year, this.month, date+1).toISOString().split('T')[0]; // 格式化日期
      
      try {
        const userid = this.$store.state.userid; // 假设为当前用户 ID

        // 发送 POST 请求到后端 API
        const response = await axios.post('http://localhost:3000/api/mood/', {
          userid,
          createdAt: formattedDate, // 精确到点击的日期
          mood: mood.value
        });

        if (response.status === 201) {
          console.log("Mood added successfully", response.data);

          // 更新本地 moods 数据
          const dayIndex = date - 1; // 日期对应的索引
          if (!this.moods[dayIndex]) {
            this.moods[dayIndex] = {};
          }
          this.moods[dayIndex].value = mood.value;
          this.moods[dayIndex].mood = mood.icon;
          this.moods[dayIndex].color = mood.color;

          this.$emit('update-moods', this.moods); // 通知父组件更新数据
        }
      } catch (error) {
        console.error("Error adding mood:", error);
      }

      // 隐藏心情选择器
      this.visibleMoodIndex = null;
    }
  }
};
</script>


<style scoped>
.monthly-mood {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-header {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 10px;
}

.calendar-day-name {
  font-weight: bold;
  color: #555;
  width: 40px;
  text-align: center;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 100%;
}

.calendar-day {
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
}

.calendar-day:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.mood-picker {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.mood-picker button {
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mood-picker button:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}

.mood-icon {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
}
</style>

<template>
  <div class="monthly-mood">
    <h2>{{ currentMonth }}</h2>
    <div class="calendar">
      <div class="calendar-header">
        <span v-for="day in weekDays" :key="day" class="calendar-day-name">{{ day }}</span>
      </div>
      <div class="calendar-body">
        <div
          v-for="(date, index) in daysInMonth"
          :key="index"
          class="calendar-day"
          :class="{'has-mood': moods[index]?.mood}"
          :style="{ backgroundColor: moods[index]?.color || '#f0f0f0' }"
          @click="toggleMoodPicker(index)"
        >
          <span>{{ date }}</span>
          <div v-if="visibleMoodIndex === index" class="mood-picker">
            <button
              v-for="mood in moodOptions"
              :key="mood.icon"
              :style="{ backgroundColor: mood.color }"
              @click="setMood(index, mood)"
            >
              {{ mood.icon }}
            </button>
          </div>
          <div v-if="moods[index]?.mood" class="mood-icon">
            {{ moods[index].icon }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthlyMood",
  data() {
    return {
      currentDate: new Date(),
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // 星期名称
      moodOptions: [
        { icon: "😀", color: "#FFD700" },
        { icon: "😊", color: "#ADFF2F" },
        { icon: "😐", color: "#F0E68C" },
        { icon: "😢", color: "#87CEFA" },
        { icon: "😡", color: "#FF6347" }
      ],
      moods: [], // 每天的心情状态
      visibleMoodIndex: null // 当前显示心情选择器的日期索引
    };
  },
  computed: {
    currentMonth() {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    },
    // 计算当前月的日期列表
    daysInMonth() {
      const days = [];
      const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      // 获取本月的第一天是星期几
      const firstDayWeekday = firstDay.getDay();
      // 获取本月的天数
      const totalDays = lastDay.getDate();
      
      // 填充空白日期
      for (let i = 0; i < firstDayWeekday; i++) {
        days.push(null);
      }
      // 填充实际日期
      for (let i = 1; i <= totalDays; i++) {
        days.push(i);
      }
      return days;
    }
  },
  methods: {
    toggleMoodPicker(index) {
      this.visibleMoodIndex = this.visibleMoodIndex === index ? null : index;
    },
    setMood(index, mood) {
      if (!this.moods[index]) {
        this.moods[index] = {};
      }
      this.moods[index].mood = mood.icon;
      this.moods[index].color = mood.color;
      this.moods[index].icon = mood.icon;
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

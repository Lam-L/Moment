<template>
  <div class="habit-tracker">
    <div class="habitName">{{ habitName }}</div>
    
    <div class="calendar">
      <div class="day-grid">
        <!-- 循环渲染31个格子 -->
        <div 
          v-for="(day, index) in daysInMonth" 
          :key="index"
          class="day-box" 
          :class="{'completed': isChecked(day)}"
        >
          <input 
            type="checkbox" 
            v-model="completedDays[day - 1]" 
            :id="'day' + day" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HabitTracker',
  props: {
    habitName: {
      type: String,
      required: true
    },
    completedDays: {
      type: Array,
      default: () => Array(31).fill(false), // 默认所有天数没有完成
    }
  },
  data() {
    return {
      daysInMonth: Array.from({ length: 31 }, (_, i) => i + 1), // 创建31天的数组
    };
  },
  methods: {
    isChecked(day) {
      return this.completedDays[day - 1];
    }
  }
};
</script>

<style scoped>
.habit-tracker {
  display: flex;
  padding: 20px;
  font-family: Arial, sans-serif;
  align-items: center;
}

.habitName {
  text-align: center;
  width: 100px;
}

.calendar {
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-content: center;
}

.day-grid {
  display: flex;
  /* display: grid;
  grid-template-columns: repeat(7, 1fr); */
  gap: 10px;
  width: 100%;
  /* max-width: 600px; */
}

.day-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-box input {
  width: 20px;
  height: 20px;
}

.day-box label {
  font-size: 14px;
  margin-top: 5px;
}

.completed label {
  color: green;
}

.completed input {
  background-color: #90EE90; /* 绿色 */
}
</style>

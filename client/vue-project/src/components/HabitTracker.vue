<template>
  <div>
    <!-- 遍历 habitList，渲染 HabitTrackerItem 组件 -->
    <HabitTrackerItem 
      v-for="(habit, index) in habitList" 
      :key="index"
      :habitName="habit.name" 
      :completedDays="habit.completedDays"
    />
  </div>
</template>

<script>
import HabitTrackerItem from './HabitTrackerItem.vue';
import axios from 'axios';

export default {
  components: {
    HabitTrackerItem
  },
  data() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // 获取本月的所有日期
    const getAllDatesInMonth = (startDate, endDate) => {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1); // 增加一天
      }
      return dates;
    };

    const allDates = getAllDatesInMonth(firstDayOfMonth, lastDayOfMonth);

    return {
      habitList: [], // 最终从 API 返回的习惯列表
      firstDay: formatDate(firstDayOfMonth),
      lastDay: formatDate(lastDayOfMonth),
    };
  },
  created() {
    this.fetchHabits();
  },
  methods: {
    async fetchHabits() {
      try {
        const url = `http://localhost:3000/api/habit/${this.$store.state.userid}?start_date=${this.firstDay}&end_date=${this.lastDay}`;
        const response = await axios.get(url);

        // 假设返回数据格式是按照习惯名称分组的，如：
        // { Running: [...] } 等
        this.habitList = Object.keys(response.data.habits).map(habitName => {
          const habitLogs = response.data.habits[habitName];
          const completedDays = this.generateCompletedDays(habitLogs);

          return {
            name: habitName,
            completedDays
          };
        });
      } catch (error) {
        alert('Failed to fetch habits.');
      }
    },

    // 生成 completedDays 数组，表示每一天是否打卡
    generateCompletedDays(habitLogs) {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const allDates = this.getAllDatesInMonth(firstDayOfMonth, lastDayOfMonth);
      const completedDays = allDates.map(date => {
        const logForDay = habitLogs.find(log => {
          const logDate = new Date(log.createdAt);
          return logDate.toISOString().split('T')[0] === date;
        });
        return logForDay ? true : false; // 有记录则打卡，没记录则未打卡
      });

      return completedDays;
    },

    getAllDatesInMonth(startDate, endDate) {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1); // 增加一天
      }
      return dates;
    }
  }
};
</script>
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

export default {
  components: {
    HabitTrackerItem
  },
  data() {
    return {
      // habitList 存储多个习惯的对象，每个对象有 habitName 和 completedDays
      habitList: [
        {
          name: "Drink Water", 
          completedDays: Array(31).fill(false) // 初始状态，假设前31天都没有完成
        },
        {
          name: "Exercise", 
          completedDays: Array(31).fill(false)
        },
        {
          name: "Read Book", 
          completedDays: Array(31).fill(false)
        }
      ]
    };
  }
};
</script>

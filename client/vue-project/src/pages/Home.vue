<template>
  <header>
  </header>
  <main>
    <div class="main-container">
      <ParentComponent />
      <section class="journal-section">
        <Journal/>
      </section>  
      <section class="meditation-section">
        <h2 class="meditation-title">Today's Meditation</h2>
        <p class="meditation-content">
          Start your day with peace and calm. Take a few moments to breathe deeply and center your mind.
          Focus on the present moment, and let go of any distractions.
        </p>
        <button class="meditation-btn" @click="startMeditation">Start Meditation</button>
    </section>
    </div>
    <HabitTracker :completedDays="completedDays" />
    <!-- <MoodChart /> -->
  </main>

</template>

<script>
import HabitTracker from '../components/HabitTracker.vue';
import Journal from '@/components/Journal.vue';
import MonthlyMood from '@/components/MonthlyMood.vue';
import ParentComponent from '@/components/ParentComponent.vue';
import MoodChart from '@/components/MoodChart.vue';
export default {
  components: {
    HabitTracker,
    Journal,
    MonthlyMood,
    ParentComponent,
    MoodChart,
  },
  data() {
    return {
      // 初始状态，假设前31天都没有完成
      completedDays: Array(31).fill(false)
    };
  },
  computed: {
    userid() {
      return this.$store.state.userid;
    }
  }
};
</script>

<style>
.main-container {
  display: flex;
}

.journal-section {
  border-radius: 10px;
  padding: 30px;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.journal-title {
  width: 100%;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.journal-textarea {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  resize: none;
  outline: none;
}

.journal-btn {
  background-color: #ff8c00;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.journal-btn:hover {
  background-color: #e67e00;
}

.journal-btn:active {
  background-color: #d16a00;
}

.save-confirmation {
  margin-top: 15px;
  font-size: 16px;
  color: #28a745;
}


/* Meditation UI */
.meditation-section {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.meditation-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4caf50;
}

.meditation-content {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

.meditation-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.meditation-btn:hover {
  background-color: #45a049;
}

.meditation-btn:active {
  background-color: #388e3c;
}
</style>

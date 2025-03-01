<template>
  <div class="mood-chart">
    <h2>Mood Statistics</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <!-- 始终渲染 Canvas，除非加载中 -->
    <canvas v-show="!loading && !error" id="moodChart"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import {
  Chart,
  BarController, // 控制柱状图
  BarElement, // 绘制柱状图
  CategoryScale, // 用于 X 轴的分类刻度
  LinearScale, // 用于 Y 轴的线性刻度
  Tooltip, // 提示框
  Legend // 图例
} from "chart.js";

// 注册 Chart.js 组件
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
  name: "MoodChart",
  data() {
    return {
      stats: [], // 存储从 API 获取的统计数据
      loading: true, // 加载状态
      error: null, // 错误消息
      chart: null // 图表实例
    };
  },
  async mounted() {
    // 获取当前日期范围
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0];
    const userId = this.$store.state.userid; // 从 Vuex 中获取用户 ID

    try {
      // 发起请求获取统计数据
      const response = await axios.get("http://localhost:3000/api/mood/stats", {
        params: { startDate, endDate, userId }
      });

      this.stats = response.data.stats; // 保存返回的统计数据
      console.log("stats",this.stats)
      this.$nextTick(() => this.renderChart()); // 确保 DOM 渲染完成后调用图表渲染
    } catch (error) {
      console.error("Error fetching mood stats:", error);
      this.error = "Failed to load mood statistics.";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    renderChart() {
      // 检查 Canvas 元素是否存在
      const canvas = document.getElementById("moodChart");
      if (!canvas) {
        console.error("Canvas element not found!");
        this.error = "Failed to render chart: Canvas not found.";
        return;
      }

      // 获取 Canvas 上下文
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context!");
        this.error = "Failed to render chart: Unable to get canvas context.";
        return;
      }

      // 检查数据是否为空
      if (!this.stats.length) {
        this.error = "No mood data available for the selected time range.";
        return;
      }

      // 准备数据用于图表渲染
      const labels = this.stats.map((item) => item.mood); // 心情名称
      const data = this.stats.map((item) => item.count); // 心情数量

      // 销毁之前的图表实例（如果存在）
      if (this.chart) {
        this.chart.destroy();
      }

      // 创建新的图表
      this.chart = new Chart(ctx, {
        type: "bar", // 使用柱状图
        data: {
          labels,
          datasets: [
            {
              label: "Mood Count",
              data,
              backgroundColor: [
                "#FF6384", // 颜色可以自定义
                "#36A2EB",
                "#FFCE56",
                "#4CAF50",
                "#FF9F40"
              ],
              borderColor: "#ddd",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Mood"
              }
            },
            y: {
              title: {
                display: true,
                text: "Count"
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.mood-chart {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.loading {
  font-size: 18px;
  color: #666;
}

.error {
  font-size: 16px;
  color: red;
}
</style>

<template>
  <div class="journal-item">
    <div class="journal-header">
      <p class="journal-date">{{ createdAt }}</p>
    </div>
    <div class="journal-content">
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "JournalItem",
  props: {
    content: {
      type: String,
      required: false
    },
    createdAt: {
      type: String,
      required: false
    }
  },
  computed: {
    // formattedDate() {
    //   // 按数据库格式解析日期字符串
    //   const date = new Date(this.createdAt.replace(" ", "T")); // 替换空格为 `T`，以适配 ISO 格式

    //   // 使用自定义格式化日期
    //   const options = {
    //     year: "numeric",
    //     month: "long", // 如 "December"
    //     day: "numeric",
    //     hour: "2-digit",
    //     minute: "2-digit"
    //   };
    //   return date.toLocaleDateString(undefined, options); // 根据用户的区域设置显示日期
    // }
  }
};
</script>

<style scoped>
.journal-item {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.journal-header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.journal-date {
  font-size: 14px;
  color: #888;
  text-align: right;
}

.journal-content {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}
</style>

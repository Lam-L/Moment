<template>
  <section class="user-list">
    <h2>Your Following List</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div
        class="user-item"
        v-for="user in followingUsers"
        :key="user.id"
      >
        <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
        <div class="user-info">
          <h3>{{ user.username }}</h3>
          <p>{{ user.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "FollowingPage",
  data() {
    return {
      followingUsers: [], // 存储关注的用户数据
      loading: true, // 是否加载中
      error: null // 错误信息
    };
  },
  async mounted() {
    const userId = this.$store.state.userid; // 当前用户的 ID
    try {
      // 调用 API 获取关注列表
      const response = await axios.get(
        `http://localhost:3000/api/user/${userId}/following`
      );
    
      this.followingUsers = response.data.following.map((item) => {
            // 返回修改后的 item 对象
            return {
                ...item, // 保留其他属性
                avatar: `https://randomuser.me/api/portraits/men/${item.avatar}.jpg` // 修改 avatar
            };
        });
      console.log(this.followingUsers)
    } catch (err) {
      console.error("Error fetching following list:", err);
      this.error = "Failed to load following list.";
    } finally {
      this.loading = false; // 关闭加载状态
    }
  }
};
</script>

<style scoped>
.user-list {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.loading {
  font-size: 18px;
  color: #666;
  margin: 20px 0;
}

.error {
  font-size: 16px;
  color: red;
  margin: 20px 0;
}

.user-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  text-align: left;
}

.user-info h3 {
  margin: 0;
  font-size: 18px;
}

.user-info p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}
</style>

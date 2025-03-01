<template>
  <section class="user-list">
    <h2>Users You Might Be Interested In</h2>
    <div class="user-item" v-for="user in users" :key="user.id">
      <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-info">
        <h3>{{ user.username }}</h3>
        <p>{{ user.description }}</p>
        <button @click="followUser(user)" class="follow-btn">
          {{ user.isFollowing ? 'Unfollow' : 'Follow' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: "UserList",
  data() {
    return {
      // 模拟静态用户数据，可以替换为从 API 或 Vuex 中获取数据
      users: null,
    };
  },
  created() {
    this.fetchRandomUser();
  },
  methods: {
    async fetchRandomUser(){
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${this.$store.state.userid}/similar-users`)
        this.users = response.data.similarUsers;
        this.users.map((item) => item.avatar = `https://randomuser.me/api/portraits/men/${item.avatar}.jpg`)
      } catch (err) {
        console.log(err);
        this.error = "What"
      }
    },
    async followUser(user) {
      const myUserId = localStorage.getItem("userid"); // 假设本地存储了当前用户ID
      if (!myUserId) {
        alert("User ID not found. Please log in.");
        return;
      }

      console.log(myUserId)
      console.log(user.id)

      try {
        // 调用后端API切换关注状态
        const response = await fetch(`http://localhost:3000/api/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followerId: myUserId, // 当前用户ID
            followedId: user.id // 当前用户ID
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // 更新本地用户的关注状态
          user.isFollowing = !user.isFollowing;
          console.log(data.message);
        } else {
          console.error(data.message);
          alert("Failed to update follow status.");
        }
      } catch (error) {
        console.error("Error following user:", error);
        alert("An error occurred while updating follow status.");
      }
    },
  },
};
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.user-info p {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.follow-btn {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.follow-btn:hover {
  background-color: #0056b3;
}
</style>

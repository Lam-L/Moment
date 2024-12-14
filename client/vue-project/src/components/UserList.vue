<template>
  <section class="user-list">
    <h2>Users You Might Be Interested In</h2>
    <div class="user-item" v-for="user in users" :key="user.id">
      <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <p>{{ user.description }}</p>
        <button @click="followUser(user.id)" class="follow-btn">
          {{ user.isFollowing ? 'Unfollow' : 'Follow' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      // 模拟静态用户数据，可以替换为从 API 或 Vuex 中获取数据
      users: [
        {
          id: 1,
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          description: 'Lover of technology and books.',
          isFollowing: false,
        },
        {
          id: 2,
          name: 'Jane Smith',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          description: 'Travel enthusiast and photographer.',
          isFollowing: false,
        },
        {
          id: 3,
          name: 'Sam Wilson',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          description: 'Music producer and gamer.',
          isFollowing: false,
        },
        // 添加更多用户...
      ]
    };
  },
  methods: {
    followUser(userId) {
      const user = this.users.find(u => u.id === userId);
      if (user) {
        user.isFollowing = !user.isFollowing;
        // 在此你可以将更新的关注状态同步到后端或者 Vuex
        console.log(user.isFollowing ? 'Following user' : 'Unfollowed user');
      }
    }
  }
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

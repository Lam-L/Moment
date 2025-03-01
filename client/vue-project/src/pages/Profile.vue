<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-container">
            <img :src=user.avatar alt="头像" class="avatar" />
          </div>
          <h2 class="user-name">{{ user.username }}</h2>
          <div class="user-navigation">
            <button @click="navigateTo('following')" class="nav-item">Following</button>
            <button @click="navigateTo('followers')" class="nav-item">Followers</button>
            <button @click="navigateTo('posts')" class="nav-item">Posts</button>
          </div>
        </div>
        <div class="profile-info">
          <div class="info-item">
            <strong>email:</strong> <span>{{ user.email }}</span>
          </div>
          <div class="info-item">
            <strong>age:</strong> <span>{{ user.age }}</span>
          </div>
          <div class="info-item">
            <strong>city:</strong> <span>{{ user.city }}</span>
          </div>
          <div class="info-item">
            <strong>description</strong> <span>{{ user.description }}</span>
          </div>
          <div class="info-item">
            <strong>like-count:</strong> <span>{{ totalLikes }}</span>
          </div>
                    <div class="info-item">
            <strong>Active Days This Month:</strong> <span>{{ ActiveDaysThisMonth}}</span>
          </div>
        </div>
        <div class="settings">
          <h3>设置</h3>
          <label for="theme">选择主题:</label>
          <select v-model="selectedTheme" @change="updateTheme" class="theme-select">
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        username: '张三',
        email: 'zhangsan@example.com',
        age: 25,
        city: '北京',
      },
      totalLikes: 0, 
      selectedTheme: 'light',
      ActiveDaysThisMonth:0,
    };
  },
  methods: {
    navigateTo(section) {
      switch (section) {
        case "following":
          this.$router.push({ name: "Following", params: { userid: this.$store.state.userid } });
          break;
        case "followers":
          this.$router.push({ name: "FollowersPage", params: { userid: this.$store.state.userid } });
          break;
        case "posts":
          this.$router.push({ name: "UserPost", params: { userid: this.$store.state.userid } });
          break;
        default:
          console.error("Unknown navigation section:", section);
      }
    },
    getYearsBetweenNowAndDate(givenDate) {
      // 获取当前日期
      const now = new Date();
      // 确保输入的日期是一个 Date 对象
      const targetDate = new Date(givenDate);

      // 获取年份
      const currentYear = now.getFullYear();
      const targetYear = targetDate.getFullYear();

      // 获取月份和日期，用于判断是否完整跨年
      const currentMonth = now.getMonth();
      const targetMonth = targetDate.getMonth();
      const currentDay = now.getDate();
      const targetDay = targetDate.getDate();

      // 计算基础的年份差
      let yearDifference = targetYear - currentYear;

      // 检查是否需要调整年份差（比如跨年但未满整年）
      if (
        targetMonth < currentMonth || 
        (targetMonth === currentMonth && targetDay < currentDay)
      ) {
        yearDifference -= 1;
      }

        return -yearDifference;
    },

    updateTheme() {
      document.body.className = this.selectedTheme;
    },
    async fetchUserProfile() {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${this.$store.state.userid}/profile`);
        if (response.data.success) {
          this.user = response.data.user;
          console.log(this.user.avatar)
          this.user.avatar = `https://randomuser.me/api/portraits/men/${this.user.avatar}.jpg`;
          this.user.age = this.getYearsBetweenNowAndDate(this.user.dob)
          console.log(this.user)
          this.selectedTheme = this.user.theme || 'light';
          this.updateTheme(); // 初始化主题
        }
      } catch (error) {
        console.error('获取用户信息失败', error);
      }
    },
    async fetchTotalLikes() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${this.$store.state.userid}/likes-count`
        );
        if (response.data.message === "Total likes retrieved successfully") {
          this.totalLikes = response.data.totalLikes;
        } else {
          console.error("Failed to fetch total likes");
        }
      } catch (error) {
        console.error("获取用户点赞总数失败", error);
      }
    },
    async fetchActiveDays() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${this.$store.state.userid}/active-days`
        );
  
          this.ActiveDaysThisMonth = response.data.activeDays;
          console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    },


  },
  watch: {
    selectedTheme(newTheme) {
      this.updateTheme();
    },
  },
  mounted() {
    this.updateTheme(); // 初始化主题
    this.fetchUserProfile();
    this.fetchTotalLikes();
    this.fetchActiveDays();
  },
};
</script>

<style scoped>
/* 全局样式 */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s, color 0.3s;
}

body.light {
  background-color: #FFEBEE; /* 浅粉色背景 */
  color: #333;
}

body.dark {
  background-color: #FF7043; /* 深橙色背景 */
  color: white;
}

/* 页面内容布局 */
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.container {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明背景 */
}

/* 用户信息卡片 */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
}

.avatar-container {
  margin-bottom: 10px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #FF7043; /* 边框色与主题主色一致 */
}

.user-name {
  font-size: 1.8em;
  color: #FF7043;
  margin-top: 10px;
}

/* 用户跳转按钮样式 */
.user-navigation {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
}

.nav-item {
  background-color: #ff7043; /* 主色 */
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: #e64a19;
}

.nav-item:active {
  background-color: #d84315;
}


/* 用户信息展示 */
.profile-info {
  width: 100%;
  margin-bottom: 30px;
}

.info-item {
  font-size: 1.2em;
  margin: 10px 0;
}

.info-item strong {
  color: #FF7043;
}

/* 设置区域 */
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.theme-select {
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #FF7043;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

.theme-select option {
  background-color: #FFEBEE;
}
</style>

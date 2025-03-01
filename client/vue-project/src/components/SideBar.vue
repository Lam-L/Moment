<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1 class="logo">MyApp</h1>
    </div>
    <div class="sidebar-nav">
      <ul>
        <li
          v-for="(item, index) in navItems"
          :key="index"
          :class="{ active: selected === index }"
          @click="setActive(index)"
        >
          <!-- 使用 router-link 来跳转到相应的页面 -->
          <router-link :to="item.path" class="nav-item">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      selected: 0,  // 默认选中 Home
      navItems: [
        { name: 'Home', icon: 'fas fa-home', path: '/' },
        { name: 'Explore', icon: 'fas fa-search', path: '/#explore' },
        { name: 'Messages', icon: 'fas fa-envelope', path: '/#messages' },
        { name: 'Profile', icon: 'fas fa-user', path: '/#profile' }
      ]
    };
  },
  methods: {
    // 设置选中的导航项
    setActive(index) {
      this.selected = index;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}

.sidebar {
  width: 80px;
  height: 100vh;
  background-color: #ffffff;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
}

.sidebar-header {
  margin-top: 20px;
  margin-bottom: 30px;
}

.logo {
  font-size: 22px;
  font-weight: 600;
  color: #1da1f2;
  cursor: pointer;
  transition: opacity 0.3s;
}

.logo:hover {
  opacity: 0.7;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.sidebar-nav li {
  width: 100%;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: relative;
}

.sidebar-nav li i {
  margin-right: 20px;
  font-size: 20px;
  color: #333;
  transition: color 0.2s ease;
}

.sidebar-nav li:hover {
  background-color: #f0f0f0;
  transform: translateX(5px);
  border-radius: 10px;
}

.sidebar-nav li.active {
  background-color: #1da1f2;
  color: white;
  transform: translateX(5px);
  border-radius: 10px;
}

.sidebar-nav li.active i {
  color: white;
}

.sidebar-nav li span {
  font-size: 14px;
  opacity: 1; /* 始终显示文本 */
  transition: opacity 0.2s ease;
  margin-left: 10px;
}

.sidebar-nav li.active span {
  opacity: 1;
}

.sidebar-nav li:hover span {
  opacity: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.nav-item:hover {
  color: #fff;
}

/* 添加媒体查询以适应不同屏幕大小 */
@media (max-width: 768px) {
  .sidebar {
    width: 60px;  /* 更适合移动端 */
  }

  .sidebar-nav li i {
    margin-right: 10px;
    font-size: 18px;  /* 移动端字体大小适当缩小 */
  }

  .sidebar-nav li span {
    font-size: 12px; /* 移动端文本略小 */
    margin-left: 8px;
  }

  /* 调整选中的状态文本大小 */
  .sidebar-nav li.active span {
    font-size: 12px;
  }
}
</style>

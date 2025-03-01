<template>
  <div class="post-item">
    <!-- Post Header (User Info + Post Title) -->
    <div class="post-header">
      <div class="user-avatar">
        <img :src="post.userAvatar" alt="User Avatar" />
      </div>
      <div class="post-info">
        <span class="username">{{ post.username }}</span>
        <span class="created-at">{{ post.createdAt }}</span>
        <button v-if="showDelete" @click="onDelete" class="delete-btn">Delete</button>
      </div>
    </div>

    <!-- Post Title -->
    <div v-if="isEditing" class="edit-title">
      <input v-model="editedTitle" placeholder="Edit title here..." />
      <button @click="updateTitle" class="save-btn">Save</button>
      <button @click="cancelEdit" class="cancel-btn">Cancel</button>
    </div>
    <h2 v-else class="post-title">
      {{ post.posttitle }}
      <button v-if="showDelete" @click="editTitle" class="edit-btn">Edit</button>
    </h2>

    <!-- Post Content -->
    <p class="post-content">{{ post.content }}</p>

    <!-- Like and Interaction -->
    <div class="post-interactions">
      <div class="likes">
        <span class="like-count">{{ post.likeCount }} Likes</span>
        <span @click="toggleLike" class="like-icon">
          <span v-if="post.userLiked" role="button" class="liked">❤️</span>
          <span v-else role="button" class="unliked">🤍</span>
        </span>
      </div>

      <div class="comments">
        <span>💬 {{ post.commentCount }} Comments</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
    showDelete: {
      type: Boolean,
      default: false, // 默认不显示删除按钮
    },
  },
  data() {
    return {
      isEditing: false,
      editedTitle: this.post.posttitle, // 用于存储编辑中的标题
    };
  },
  methods: {
    editTitle() {
      this.isEditing = true; // 开启编辑模式
    },
    cancelEdit() {
      this.isEditing = false; // 取消编辑模式
      this.editedTitle = this.post.posttitle; // 重置为原始标题
    },
    async updateTitle() {
      try {
        // 调用更新 API
        const response = await fetch(`http://localhost:3000/api/post/${this.post.postid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: this.$store.state.userid, // 当前用户 ID
            posttitle: this.editedTitle, // 新标题
          }),
        });

        const data = await response.json();
        if (response.ok) {
          this.post.posttitle = this.editedTitle; // 更新本地标题
          this.isEditing = false; // 退出编辑模式
          alert(data.message || "Title updated successfully!");
        } else {
          alert(data.message || "Failed to update title.");
        }
      } catch (error) {
        console.error("Error updating title:", error);
        alert("An error occurred while updating the title.");
      }
    },
    async toggleLike() {
      try {
        const action = this.post.userLiked ? "unlike" : "like";
        const response = await fetch(`http://localhost:3000/api/post/${this.post.postid}/like`, {
          method: "POST",
          body: JSON.stringify({ userid: this.$store.state.userid }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          this.post.userLiked = !this.post.userLiked;
          this.post.likeCount += this.post.userLiked ? 1 : -1;
        } else {
          console.error("Failed to update like status");
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    },
    async onDelete() {
      if (!confirm("Are you sure you want to delete this post?")) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/post/${this.post.postid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: this.post.userid,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          this.$emit("post-deleted", this.post.postid); // 通知父组件
        } else {
          alert(data.message || "Failed to delete the post.");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred while trying to delete the post.");
      }
    },
  },
};
</script>

<style scoped>
/* Post Item Container */
.post-item {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.post-item:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Post Header */
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.post-info .username {
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
}

.post-info .created-at {
  font-size: 0.9em;
  color: #888;
  margin-left: 10px;
}

/* Post Title */
.post-title {
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
}

.edit-title {
  display: flex;
  gap: 10px;
}

.edit-title input {
  flex: 1;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-title button {
  padding: 10px 15px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #4caf50;
  color: #fff;
}

.cancel-btn {
  background-color: #f44336;
  color: #fff;
}

.edit-btn {
  margin-left: 10px;
  font-size: 0.9em;
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
}

.edit-btn:hover {
  text-decoration: underline;
}

/* Other styles omitted for brevity */
</style>

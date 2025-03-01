const { Router } = require("express");
const db = require("../services/db");

const router = Router();

// 删除用户的帖子
router.delete("/:postid", async (req, res, next) => {
  const postId = req.params.postid;
  const { userid } = req.body; // 用户 ID 从请求体中获取，确保删除权限

  if (!userid) {
    return res.status(400).json({ message: "User ID is required to delete a post" });
  }
  try {
    // 检查帖子是否属于该用户
    const [rows] = await db.query(
      "SELECT * FROM posts WHERE postid = ? AND userid = ?",
      [postId, userid]
    );

    if (rows.length === 0) {
      return res.status(403).json({
        message: "You are not authorized to delete this post or the post does not exist",
      });
    }
        // 删除与该帖子相关的点赞和评论（如果需要）
    await db.query("DELETE FROM likes WHERE postid = ?", [postId]);
    await db.query("DELETE FROM comments WHERE postid = ?", [postId]);
    // 删除帖子
    await db.query("DELETE FROM posts WHERE postid = ?", [postId]);
    res.json({
      
      message: "Post deleted successfully",
      postId,
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

router.get("/:userid/user", async (req, res, next) => {
  try {
    const userId = req.params.userid;

    // 查询用户所有帖子以及点赞信息
    //get all user's post and 
    const [rows] = await db.query(
      `
      SELECT p.*, 
             IFNULL(COUNT(l.likeid), 0) AS likeCount,
             EXISTS (SELECT 1 FROM likes lu WHERE lu.postid = p.postid AND lu.userid = ?) AS userLiked,
             u.username AS username,
             u.email AS userEmail,
             u.avatar AS userAvatar,
             p.postid AS postid
      FROM posts p
      LEFT JOIN likes l ON p.postid = l.postid
      LEFT JOIN users u ON p.userid = u.userid
      WHERE p.userid = ?  -- 只获取当前用户的帖子
      GROUP BY p.postid
      ORDER BY p.createdAt DESC
      `,
      [userId, userId] // 参数绑定，防止 SQL 注入
    );

    // 如果没有找到帖子
    if (rows.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    // 返回结果
    res.json({
      message: "User posts retrieved successfully",
      posts: rows,
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

router.get("/:userid/square", async (req, res, next) => {
  try {
    const userId = req.params.userid;
    const [rows] = await db.query(`
        SELECT p.*, 
       IFNULL(COUNT(l.likeid), 0) AS likeCount,
       EXISTS (SELECT 1 FROM likes lu WHERE lu.postid = p.postid AND lu.userid = ?) AS userLiked,
       u.userid AS userId,
       u.username AS username,
       u.email AS userEmail,     
       u.avatar AS userAvatar
      FROM posts p
      LEFT JOIN likes l ON p.postid = l.postid
      LEFT JOIN users u ON p.userid = u.userid  -- 连接到 user 表，获取发布者信息
      GROUP BY p.postid
      ORDER BY p.createdAt DESC
    `, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.json({
      message: "Posts retrieved successfully",
      posts: rows,  // 返回所有帖子
    });
  } catch (err) {
    next(err);  // 捕获错误并传递给下一个错误处理中间件
  }
});


router.post("/", async (req, res, next) => {
  const { posttitle, content, userid } = req.body;
  console.log(req.body);

  if (!content || !userid || !posttitle) {
    return res.status(400).json({ message: "Content and userid are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO posts (posttitle ,content, userid, createdAt) VALUES (?, ?, ?, ?)",
      [posttitle, content, userid, new Date()]
    );

    res.json({
      message: "Post created successfully",
      postId: result.insertId,
      createdAt: new Date(),
    });
  } catch (err) {
    next(err);
  }
});

// 点赞
router.post("/:postid/like", async (req, res, next) => {
  const { userid } = req.body;
  const postid = req.params.postid;
  const date = new Date();
  console.log(postid);
  console.log(date);
  console.log(userid)
  try {
    const [result] = await db.query(
      "INSERT INTO likes (postid, userid, createdAt) VALUES (?, ?, ?)",
      [postid, userid, date]
    );
    res.json({
      success: true,
      message: "Like created successfully",
      postId: result.insertId,
      createdAt: new Date(),
    });
  }catch (err){
    next(err);
  }
});

// 更新用户博文标题
router.put("/:postid", async (req, res, next) => {
  const postId = req.params.postid;
  const { userid, posttitle } = req.body; // 获取用户 ID 和新的标题

  if (!userid || !posttitle) {
    return res.status(400).json({ message: "User ID and new post title are required" });
  }

  try {
    // 检查帖子是否属于该用户
    const [rows] = await db.query(
      "SELECT * FROM posts WHERE postid = ? AND userid = ?",
      [postId, userid]
    );

    if (rows.length === 0) {
      return res.status(403).json({
        message: "You are not authorized to update this post or the post does not exist",
      });
    }

    // 更新帖子标题
    await db.query("UPDATE posts SET posttitle = ? WHERE postid = ?", [posttitle, postId]);

    res.json({
      message: "Post title updated successfully",
      postId,
      newTitle: posttitle,
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

// 获取用户收到的点赞总数
router.get("/:userid/likes-count", async (req, res, next) => {
  const userId = req.params.userid;

  try {
    const [rows] = await db.query(
      `
      SELECT SUM(likeCount) AS totalLikes
      FROM (
        SELECT COUNT(l.likeid) AS likeCount
        FROM posts p
        LEFT JOIN likes l ON p.postid = l.postid
        WHERE p.userid = ?
        GROUP BY p.postid
      ) AS likes
      `,
      [userId]
    );

    const totalLikes = rows[0]?.totalLikes || 0;

    res.json({
      message: "Total likes retrieved successfully",
      userId,
      totalLikes,
    });
  } catch (err) {
    next(err);
  }
});

// 获取用户未参与的帖子
router.get("/:userid/unengaged-posts", async (req, res, next) => {
  try {
    const userId = req.params.userid;

    // 查询用户未点赞或评论过的帖子
    const [rows] = await db.query(
      `
      SELECT p.postid, p.posttitle, p.content, p.userid AS userid, u.username AS author
      FROM posts p
      JOIN users u ON p.userid = u.userid
      WHERE p.postid NOT IN (
          SELECT postid
          FROM likes
          WHERE userid = ?
          UNION
          SELECT postid
          FROM comments
          WHERE userid = ?
      )
      LIMIT 10
      `,
      [userId, userId] // 参数绑定，防止 SQL 注入
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No unengaged posts found" });
    }

    res.json({
      success: true,
      unengagedPosts: rows, // 返回未参与的帖子列表
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

router.get("/:userid/active-days", async (req, res, next) => {
  const userId = req.params.userid;

  try {
    const [rows] = await db.query(
      `
        SELECT COUNT(DISTINCT DATE(createdAt)) AS activeDays
        FROM posts
        WHERE userid = ?
        AND createdAt >= NOW() - INTERVAL 30 DAY
      `,
      [userId]
    );

    const activeDays = rows[0] ? rows[0].activeDays : 0;

    res.json({
      message: "Active days retrieved successfully",
      userId,
      activeDays,
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

module.exports = router;

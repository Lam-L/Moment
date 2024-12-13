const { Router } = require("express");
const db = require("../services/db");

const router = Router();

router.get("/:userid", async (req, res, next) => {
  try {
    const userId = req.params.userid;
    // 查询所有帖子
    const [rows] = await db.query(`
      SELECT p.*, 
             IFNULL(COUNT(l.likeid), 0) AS likeCount,
             IFNULL(COUNT(lu.likeid), 0) > 0 AS userLiked
      FROM posts p
      LEFT JOIN likes l ON p.postid = l.postid
      LEFT JOIN likes lu ON p.postid = lu.postid AND lu.userid = ?  -- 判断当前用户是否点赞
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

module.exports = router;

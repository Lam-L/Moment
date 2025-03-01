const { Router } = require("express");
const db = require("../services/db");

const router = Router();

// 获取用户信息的接口
router.get("/:userid/profile", async (req, res, next) => {
  try {
    const userId = req.params.userid;

    // 查询用户信息
    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE userid = ?
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // 返回用户信息
    res.json({
      success: true,
      user: rows[0], // 直接返回用户信息
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

// 获取我关注的用户列表
router.get("/:userid/following", async (req, res, next) => {
  try {
    const userId = req.params.userid;

    // 查询当前用户关注的所有用户
    const [rows] = await db.query(
      `
      SELECT u.userid, u.username, u.description, u.avatar
      FROM users u
      INNER JOIN follows f ON u.userid = f.followed_id
      WHERE f.follower_id = ?
      `,
      [userId]
    );

    res.json({
      success: true,
      following: rows, // 关注的用户列表
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

router.get("/:userid/random-unfollowed", async (req, res, next) => {
  try {
    const userId = req.params.userid;

    // 查询未关注的用户并随机返回5个
    const [rows] = await db.query(
      `
      SELECT u.userid, u.username, u.description, u.avatar
      FROM users u
      WHERE u.userid != ?
      AND u.userid NOT IN (
        SELECT followed_id
        FROM follows
        WHERE follower_id = ?
      )
      ORDER BY RAND()
      LIMIT 5
      `,
      [userId, userId]
    );

    res.json({
      success: true,
      randomUnfollowedUsers: rows, // 随机未关注的用户列表
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

// 获取除我之外的所有用户列表
router.get("/:userid/other-users", async (req, res, next) => {
  try {
    const userId = req.params.userid;

    // 查询除了当前用户以外的所有用户
    const [rows] = await db.query(
      `
      SELECT userid, username, description, avatar
      FROM users
      WHERE userid != ?
      `,
      [userId]
    );

    res.json({
      success: true,
      users: rows, // 其他用户列表
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});

// 新增功能：获取与用户点赞过相同帖子的其他用户
router.get("/:userid/similar-users", async (req, res, next) => {
  try {
    const userId = req.params.userid;

    // 使用子查询找到点赞过相同帖子的其他用户
    const [rows] = await db.query(
      `
      SELECT DISTINCT l1.userid, u.username, u.avatar, u.description
      FROM likes l1
      INNER JOIN users u ON l1.userid = u.userid
      WHERE l1.postid IN (
        SELECT postid
        FROM likes
        WHERE userid = ?
      )
      AND l1.userid != ?
      LIMIT 5
      `,
      [userId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No similar users found" });
    }

    res.json({
      success: true,
      similarUsers: rows, // 与用户点赞过相同帖子的其他用户
    });
  } catch (err) {
    next(err); // 捕获错误并传递给错误处理中间件
  }
});
module.exports = router;


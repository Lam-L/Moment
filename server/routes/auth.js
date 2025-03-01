const { Router } = require("express");
const passport = require("passport");
const db = require("../services/db");

const router = Router();

router.post("/sign-up", async (req, res, next) => {
  const { username, password, email, description, city, avatar } = req.body;

  // 检查必填字段是否存在
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // 插入用户数据到数据库
    const [result] = await db.query(
      "INSERT INTO users (username, password, email, description, city, avatar) VALUES (?, ?, ?, ?, ?, ?)",
      [username, password, email || null, description || null, city || null, avatar || null]
    );

    // 返回成功响应
    res.json({ message: "User created successfully", userId: result.insertId });
  } catch (err) {
    // 捕获错误并传递给错误处理中间件
    console.error("Error creating user:", err);
    next(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    res.json({ 
      success: true, 
      message: "Login successful",
      userid: req.user.userid,
    })
  }
);

module.exports = router;

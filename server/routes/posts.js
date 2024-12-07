const express = require("express");
const db = require("../services/db");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { content, userid } = req.body;

  if (!content || !userid) {
    return res.status(400).json({ message: "Content and userid are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO posts (content, userid, createdAt) VALUES (?, ?, ?)",
      [content, userid, new Date()]
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

module.exports = router;

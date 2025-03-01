const { Router } = require("express");
const db = require("../services/db");

const router = Router();

router.get("/:userid", async (req, res, next) => {
  const { userid } = req.params;

  try {
    // 查询 moments 表，获取特定用户的所有数据
    const [moments] = await db.query(
      "SELECT * FROM moments WHERE userid = ? ORDER BY createdAt DESC",
      [userid]
    );

    // 返回 moments 数据
    res.json({
      message: "Moments retrieved successfull!!!y",
      moments,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { commenttitle, content, userid, tagid } = req.body;
  console.log(req.body);

  try {
    const [result] = await db.query(
      "INSERT INTO moments (commenttitle ,content, userid, tagid, createdAt) VALUES (?, ?, ?, ?, ?)",
      [commenttitle, content, userid, tagid, new Date()]
    );

    res.json({
      message: "Moment created successfully",
      momentId: result.insertId,
      createdAt: new Date(),
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;

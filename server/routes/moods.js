const { Router } = require("express");
const db = require("../services/db");

const router = Router();

// 按时间范围统计心情数量
router.get("/stats", async (req, res) => {
  const { startDate, endDate, userId } = req.query;

  // 校验是否传入了用户 ID 和时间范围
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "startDate and endDate are required." });
  }
  if (!userId) {
    return res.status(400).json({ error: "userId is required." });
  }

  try {
    const query = `
      SELECT mood, COUNT(*) AS count 
      FROM mood 
      WHERE userid = ? AND createdAt BETWEEN ? AND ? 
      GROUP BY mood
      Order By COUNT(*)
    `;
    const [rows] = await db.execute(query, [userId, startDate, endDate]);

    // 返回结果
    res.json({
      message: "Mood statistics retrieved successfully",
      stats: rows
    });
  } catch (error) {
    console.error("Error fetching mood stats:", error);
    res.status(500).json({ error: "Failed to fetch mood stats" });
  }
});

// 获取所有 mood 数据或根据用户 ID 查询
router.get("/", async (req, res) => {
  const { userid } = req.query;

  try {
    let query = "SELECT * FROM mood";
    const params = [];
    if (userid) {
      query += " WHERE userid = ?";
      params.push(userid);
    }
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching moods:", error);
    res.status(500).json({ error: "Failed to fetch moods" });
  }
});

// 根据 moodID 获取特定的 mood 数据
router.get("/:moodID", async (req, res) => {
  const { moodID } = req.params;

  try {
    const [rows] = await db.execute("SELECT * FROM mood WHERE moodID = ?", [moodID]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Mood not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching mood:", error);
    res.status(500).json({ error: "Failed to fetch mood" });
  }
});

// 添加新的 mood 数据
router.post("/", async (req, res) => {
  const { userid, createdAt, mood } = req.body;

  if (!userid || !createdAt || mood == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO mood (userid, createdAt, mood) VALUES (?, ?, ?)",
      [userid, createdAt, mood]
    );

    res.status(201).json({ message: "Mood created", moodID: result.insertId });
  } catch (error) {
    console.error("Error creating mood:", error);
    res.status(500).json({ error: "Failed to create mood" });
  }
});

// 更新特定的 mood 数据
router.put("/:moodID", async (req, res) => {
  const { moodID } = req.params;
  const { userid, createdAt, mood } = req.body;

  if (!userid || !createdAt || mood == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.execute(
      "UPDATE mood SET userid = ?, createdAt = ?, mood = ? WHERE moodID = ?",
      [userid, createdAt, mood, moodID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mood not found" });
    }

    res.json({ message: "Mood updated" });
  } catch (error) {
    console.error("Error updating mood:", error);
    res.status(500).json({ error: "Failed to update mood" });
  }
});

// 删除特定的 mood 数据
router.delete("/:moodID", async (req, res) => {
  const { moodID } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM mood WHERE moodID = ?", [moodID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mood not found" });
    }

    res.json({ message: "Mood deleted" });
  } catch (error) {
    console.error("Error deleting mood:", error);
    res.status(500).json({ error: "Failed to delete mood" });
  }
});



module.exports = router;

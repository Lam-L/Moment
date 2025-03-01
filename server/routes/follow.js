const { Router } = require("express");
const db = require("../services/db");

const router = Router();

// 关注用户
router.post("/", async (req, res, next) => {
    const { followerId, followedId } = req.body;

    if (followerId === followedId) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    try {
        const [existing] = await db.query(
            "SELECT * FROM follows WHERE follower_id = ? AND followed_id = ?",
            [followerId, followedId]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "You already follow this user" });
        }

        await db.query(
            "INSERT INTO follows (follower_id, followed_id, created_at) VALUES (?, ?, ?)",
            [followerId, followedId, new Date()]
        );

        res.status(200).json({ message: "Followed successfully" });
    } catch (err) {
        next(err);
    }
});

// 取消关注
router.delete("/", async (req, res, next) => {
    const { followerId, followedId } = req.body;

    try {
        const [result] = await db.query(
            "DELETE FROM user_followers WHERE follower_id = ? AND followed_id = ?",
            [followerId, followedId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Follow relationship not found" });
        }

        res.status(200).json({ message: "Unfollowed successfully" });
    } catch (err) {
        next(err);
    }
});

// 获取关注列表
router.get("/:userId/follows", async (req, res, next) => {
    const { userId } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT followed_id FROM user_followers WHERE follower_id = ?",
            [userId]
        );

        res.status(200).json({ follows: rows.map(row => row.followed_id) });
    } catch (err) {
        next(err);
    }
});

// 获取粉丝列表
router.get("/:userId/followers", async (req, res, next) => {
    const { userId } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT follower_id FROM user_followers WHERE followed_id = ?",
            [userId]
        );

        res.status(200).json({ followers: rows.map(row => row.follower_id) });
    } catch (err) {
        next(err);
    }
});

module.exports = router;

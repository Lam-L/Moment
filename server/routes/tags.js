// 1. 获取所有标签 (可选过滤用户ID)
const { Router } = require("express");
const db = require("../services/db");

const router = Router();
router.get('/tags', async (req, res) => {
    const { userid } = req.query;
    let sql = 'SELECT * FROM tags';
    const params = [];
    if (userid) {
        sql += ' WHERE userid = ?';
        params.push(userid);
    }

    try {
        const [results] = await db.query(sql, params);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. 根据 tagid 获取标签详情
router.get('/tags/:tagid', async (req, res) => {
    const { tagid } = req.params;
    const sql = 'SELECT * FROM tags WHERE tagid = ?';

    try {
        const [results] = await db.query(sql, [tagid]);
        if (results.length === 0) return res.status(404).json({ error: 'Tag not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. 创建新标签
router.post('', async (req, res) => {
    const { userid, tagName } = req.body;
    if (!userid || !tagName) {
        return res.status(400).json({ error: 'userid and tagName are required' });
    }

    const sql = 'INSERT INTO tags (userid, tagName) VALUES (?, ?)';
    try {
        const [result] = await db.query(sql, [userid, tagName]);
        res.status(201).json({ message: 'Tag created', tagid: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. 更新标签名称
router.put('/tags/:tagid', async (req, res) => {
    const { tagid } = req.params;
    const { tagName } = req.body;
    if (!tagName) {
        return res.status(400).json({ error: 'tagName is required' });
    }

    const sql = 'UPDATE tags SET tagName = ? WHERE tagid = ?';
    try {
        const [result] = await db.query(sql, [tagName, tagid]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Tag not found' });
        res.json({ message: 'Tag updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. 删除标签
router.delete('/:tagid', async (req, res) => {
    const { tagid } = req.params;
    const sql = 'DELETE FROM tags WHERE tagid = ?';
    try {
        const [result] = await db.query(sql, [tagid]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Tag not found' });
        res.json({ message: 'Tag deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 导出路由
module.exports = router;
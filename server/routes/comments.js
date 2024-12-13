const { Router } = require("express");
const db = require("../services/db");

const router = Router();

router.post("/", async(req, res, next) => {
    const { postid, content, userid  } = req.body;

    try{
        const result = await db.query(
            `insert into comments(postid, content, userid, createdAt)
            values(?, ?, ?, ?)`,
            [postid, content, userid, new Date()]
        )

        res.status(201).json({
            message: "success",
        })

    } catch(err){
        console.error(err);
        res.status(500).json({"message": "Server Internal Error"});
    }
})

module.exports = router;
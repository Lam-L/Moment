const { Router } = require("express");
const db = require("../services/db");
const router = Router();
const { groupBy } = require('../utils/lodash');
const { now } = require("lodash");

router.get("/:userid", async(req, res, next) => {
    try{
        const userid = req.params.userid;
        const { start_date, end_date } = req.query;
        const query = 
        `SELECT
        h.*, hl.*
        from habits h
        left join habit_logs hl
        on 
        h.habitid = hl.habitid
        where h.userid = ?
        and (hl.createdAt between ? and ? or ? is NULL);
        `
        const [rows] = await db.query(query
        ,[userid, start_date, end_date, start_date]);
        
        const groupedHabits = groupBy(rows, 'habitid');

        res.json({
            habits: groupedHabits,
        }
        );

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})


//create habit
router.post("", async(req, res, next) => {
    try{
        const { habitname ,description, userid } = req.body;

        const result = await db.query(`
            INSERT INTO habits(habitname, description, userid) 
            values(?, ?, ?)
            `,[habitname, description, userid]
        );

        res.status(201).json({
            message: "习惯创建成功",
            habitId: result.insertId
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({"message":" Server Internal Error"});
    }
})

//create habit
router.post("/habit-log", async(req, res, next) => {
    try{
        const { habitid } = req.body;

        const result = await db.query(`
            INSERT INTO habit_logs(habitid, createdAt) 
            values(?, ?)
            `,[habitid, new Date()]
        );

        res.status(201).json({
            message: "记录成功",
            habitId: result.insertId
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({"message":" Server Internal Error"});
    }
})

module.exports = router;
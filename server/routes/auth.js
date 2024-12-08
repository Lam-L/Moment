const { Router } = require("express");
const passport = require("passport");
const db = require("../services/db");

const router = Router();

router.post("/sign-up", async (req, res, next) => {

  const { username, password } = req.body;
  console.log("test")
  try {
    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );

    res.json({ message: "User created successfully", userId: result.insertId });
  } catch (err) {
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

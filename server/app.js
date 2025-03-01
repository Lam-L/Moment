const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const corsMiddleware = require("./middleware/cors");
const configurePassport = require("./services/passport");

// 路由模块
const momentRoutes = require("./routes/moments");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const habitRoutes = require("./routes/habits");
const commentRoutes = require("./routes/comments");
const tagRoutes = require("./routes/tags");
const moodRoutes = require("./routes/moods");
const followRoutes = require("./routes/follow");
const userRoutes = require("./routes/user");

const app = express();


// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware);
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

// 配置 Passport
configurePassport(passport);

// 路由
app.use("/api/auth", authRoutes);
app.use("/api/moment", momentRoutes);
app.use("/api/post", postRoutes);
app.use("/api/habit", habitRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/user", userRoutes);

// 启动服务器
app.listen(3000, () => console.log("Server running at http://localhost:3000"));

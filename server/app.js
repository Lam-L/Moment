const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const corsMiddleware = require("./middleware/cors");
const configurePassport = require("./services/passport");

// 路由模块
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/posts");

const app = express();

// 设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// 启动服务器
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
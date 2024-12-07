const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");

function configurePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
          username,
        ]);
        const user = rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      const user = rows[0];
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = configurePassport;

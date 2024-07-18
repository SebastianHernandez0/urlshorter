const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  registrarUsuario,
  consultarUsuarioByid,
  verificarUsuario,
} = require("../models/userMode");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        
        let user = await verificarUsuario(email);
        if (!user) {
            user = await registrarUsuario(email);
        }
        console.log("Usuario registrado: ", user);
        return done(null, user);
      } catch (error) {
        console.log("Error during authentication", error );
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(async (user, done) => {
    try {
        console.log("Serializing user: ", user);
        done(null, user.id);
      } catch (error) {
        console.error("Error serializing user", error);
        done(error, null);
      }
});

passport.deserializeUser(async(id, done) => {
    try {
        console.log("Deserializing user ID:", id);
        const user = await consultarUsuarioByid(id);
        if (!user) {
          throw new Error('User not found');
        }
        done(null, user);
      } catch (error) {
        console.error("Error deserializing user", error);
        done(error, null);
      }}
);

module.exports = passport;

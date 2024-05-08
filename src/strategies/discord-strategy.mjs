import passport from "passport";
import { Strategy } from "passport-discord";
import dotenv from "dotenv";
import { DiscordUser } from "../mongoose/schemas/discord.user.mjs";

dotenv.config();

passport.serializeUser((user, done) => {
  console.log("inside the serialize user");
  //   console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await DiscordUser.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (error) {
    // done(error, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CCALLBACK_URL,
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log(profile);

      let findUser;
      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id });
      } catch (err) {
        return done(err, null);
      }
      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
            locale: profile.locale,
          });
          const newSavedUser = await newUser.save();
          done(null, newSavedUser);
        }
        return done(null, findUser);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);

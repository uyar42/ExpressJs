import passport from "passport";

import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  console.log("inside the serialize user");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside the deserialize user");
  console.log("DEserializing......");
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log("using ");
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("User not found");
      if (!comparePassword(password, findUser.password))
        throw new Error("Bad credentials!");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);

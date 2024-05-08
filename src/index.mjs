import express, { response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";
import passport from "passport";
// import "./strategies/local-strategy.mjs";
import "./strategies/discord-strategy.mjs ";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();

mongoose
  .connect("mongodb://localhost/express_tutorial")
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "mehmetov",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on  Port ${PORT}`);
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.status(200).send({ msg: "Successs" });
});
app.get(
  "/api/auth/discord",
  passport.authenticate("discord"),
  (req, res) => {}
);

app.get(
  "/api/auth/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    console.log(req.session);
    console.log(req.user);
    res.sendStatus(200);
  }
);

app.get("/api/auth/status", (req, res) => {
  console.log("Inside /auth/status");
  // console.log(req.user);
  // console.log(req.session);
  // console.log(req.sessionID);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
  });
  return res.send(200);
});

// app.get("/", (req, res) => {
//   console.log(req.session);
//   console.log(req.session.id);
//   req.session.visited = true;
//   res.cookie("hello", "world", { maxAge: 10000, signed: true });
//   res.status(201).send({ msg: "Hello" });
// });

// app.post("/api/auth", (req, res) => {
//   const {
//     body: { username, password },
//   } = req;

//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: "Bad credentials" });

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// app.get("/api/auth/status", (req, res) => {
//   req.sessionStore.get(req.sessionID, (err, sessionData) => {
//     if (err) {
//       console.log(err);
//       throw err;
//     }
//     console.log(sessionData);
//   });
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: "not auth" });
// });

// app.post("/api/cart", (req, res) => {
//   if (!req.session.user) return res.sendStatus(401);

//   const { body: item } = req;

//   const { cart } = req.session;
//   if (cart) cart.push(item);
//   else req.session.cart = [item];
//   return res.status(201).send(item);
// });

// app.get("/api/cart", (req, res) => {
//   if (!req.session.user) return res.sendStatus(401);
//   return res.send(req.session.cart ?? []);
// });

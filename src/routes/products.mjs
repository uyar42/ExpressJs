import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  // console.log(req.headers.cookie, "headrescooki");
  // console.log(req.signedCookies, "signedcookie");
  // console.log(req.session);
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });
  if (req.signedCookies.hello && req.signedCookies.hello === "world") {
    return res.send([{ id: 123, name: "chicken-breast", price: 23.44 }]);
  }
  return res.status(403).send([{ msg: "Sorry we need the cookies" }]);
});

export default router;

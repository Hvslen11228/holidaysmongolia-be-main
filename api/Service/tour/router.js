const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { tours, tours_cat, tours_cats, tours_catss } = require("./controller");
router.get("/type/:id", userif, tours);
router.get("/cat/:id", userif, tours_cat);
router.get("/cats/:id", userif, tours_catss);
router.get("/cat/", userif, tours_cat);
router.get("/c/:id", userif, tours_cats);
module.exports = router;

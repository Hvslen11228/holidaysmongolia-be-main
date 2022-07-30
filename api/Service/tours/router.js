const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { tours, tours_cat } = require("./controller");
router.get("/:id", userif, tours);
router.get("/cat/:id", userif, tours_cat);
module.exports = router;

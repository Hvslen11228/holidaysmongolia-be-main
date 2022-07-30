const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { menu_1 } = require("./controller");

router.get("/menu_tours", userif, menu_1);
module.exports = router;

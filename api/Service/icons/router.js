const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { one, all, update } = require("./controller");
router.get("/", userif, all);
router.get("/:id", userif, one);
router.put("/:id", userif, update);
module.exports = router;

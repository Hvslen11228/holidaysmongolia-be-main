const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { page, project } = require("./controller");
router.get("/", userif, page);
module.exports = router;

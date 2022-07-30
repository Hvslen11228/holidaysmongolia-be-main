const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { page, project } = require("./controller");
router.get("/:id/page", userif, page);
router.get("/:id/project", userif, project);
module.exports = router;

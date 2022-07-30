const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { create, create_all, page, update, remove } = require("./controller");
router.post("/", userif, create);
router.post("/:id/all", userif, create_all);
router.put("/:id", userif, update);
router.delete("/:id", userif, remove);
router.get("/:id", userif, page);
module.exports = router;

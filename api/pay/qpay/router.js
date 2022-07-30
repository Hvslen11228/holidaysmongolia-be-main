const router = require("express").Router();
const { checkToken, authorize } = require("../../../auth/token_validation");
const {
  create_simple,
  create,
  checke,
  create_simple_page,
} = require("./controller");
router.post("/create_simple/:id", checkToken, create_simple);
// router.post("/create/:id", checkToken, create);
router.get("/:id", checke);
// router.post("/create_simple/:id/page", checkToken, create_simple_page);
module.exports = router;

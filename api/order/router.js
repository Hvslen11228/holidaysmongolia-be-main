const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../auth/token_validation");
const { add, show } = require("./controller");

router.post("/:id", checkToken, add);
router.get("/:id", checkToken, show);
// router.get("/", checkToken, getUser);
// //update data
// router.put("/", checkToken, updateUser);
module.exports = router;

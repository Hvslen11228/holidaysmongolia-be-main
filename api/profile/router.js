const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../auth/token_validation");
const { getUser, updateUser } = require("./controller");

router.post("/", checkToken, getUser);
router.get("/", checkToken, getUser);
//update data
router.put("/", checkToken, updateUser);
module.exports = router;

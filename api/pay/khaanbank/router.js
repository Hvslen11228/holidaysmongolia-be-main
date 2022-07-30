const router = require("express").Router();
const { checkToken, authorize } = require("../../../auth/token_validation");
const { checking_page, checking_user } = require("./controller");

router.post("/:id/page", checkToken, checking_page);
router.post("/:id/user", checking_user);
module.exports = router;

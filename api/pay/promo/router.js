const router = require("express").Router();
const { checkToken, authorize } = require("../../../auth/token_validation");
const { promo_checking } = require("./controller");

router.post("/", checkToken, promo_checking);
module.exports = router;

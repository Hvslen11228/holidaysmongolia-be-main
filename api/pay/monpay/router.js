const router = require("express").Router();
const { checkToken, authorize } = require("../../../auth/token_validation");
const { create, checker, callback } = require("./controller");
router.post("/create/:id", checkToken, create);
router.get("/checker/:id", checker);
router.get("/callback/:id", callback);
module.exports = router;

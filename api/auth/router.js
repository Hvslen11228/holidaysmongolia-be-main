const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../auth/token_validation");
const {
  create,
  login,
  forgot_mail,
  forgot_code,
  forgot_password,
  username_checker,
  _checker,
  promo,
  validation_mail,
  validation_code,
} = require("./controller");
router.post("/", create);
router.get("/username/:id", username_checker);
router.get("/checker/:id", _checker);
router.post("/login", login);
router.post("/forgot/mail", forgot_mail);
router.post("/forgot/code", forgot_code);
router.post("/forgot/password", forgot_password);
router.post("/promo", promo);
router.get("/validation/:id/mail", validation_mail);
router.get("/validation/:id", validation_code);
module.exports = router;

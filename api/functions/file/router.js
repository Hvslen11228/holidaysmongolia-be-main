const router = require("express").Router();
const {
  checkToken,
  authorize,
  userif,
} = require("../../../auth/token_validation");
const { pages_media, file_upload } = require("./controller");
router.get("/:id", pages_media);
router.post("/", file_upload);
module.exports = router;

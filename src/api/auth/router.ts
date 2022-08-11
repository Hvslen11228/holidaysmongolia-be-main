import { Router } from "express";
const router = Router();
import {
  create,
  login,
  forgot_mail,
  forgot_code,
  forgot_password,
} from "./controller";
router.post("/", create);
router.post("/login", login);
router.post("/forgot/mail", forgot_mail);
router.post("/forgot/code", forgot_code);
router.post("/forgot/password", forgot_password);
export default router;

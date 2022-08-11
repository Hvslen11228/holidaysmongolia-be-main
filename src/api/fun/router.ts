import { Router } from "express";
const router = Router();
import { menu } from "./controller";
import { checkToken, authorize } from "../../auth/token_validation";
router.get("/menu", menu);
export default router;

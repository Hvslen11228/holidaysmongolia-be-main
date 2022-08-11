import { Router } from "express";
const router = Router();
import { getone, update, remove_ } from "./controller";
import { checkToken, authorize } from "../../auth/token_validation";
router.get("/", checkToken, getone);
router.put("/", checkToken, update);
router.delete("/", checkToken, remove_);
export default router;

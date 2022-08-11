import { Router } from "express";
const router = Router();
import { menu, location } from "./controller";
import { checkToken, authorize } from "../../auth/token_validation";
router.get("/menu", menu);
router.get("/location", location);
export default router;

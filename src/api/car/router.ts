import { Router } from "express";
const router = Router();
import { getall, create, remove, update } from "./controller";
import { checkToken, authorize } from "../../auth/token_validation";
router.get("/", checkToken, getall);
router.post("/", checkToken, create);
router.delete("/:id", checkToken, remove);
router.put("/:id", checkToken, update);
export default router;

import { Router } from "express";
const router = Router();
import {
  getall,
  one,
  create,
  remove,
  update,
  getall_my,
  createXanadu,
  onexanadu,
} from "./controller";
import { checkToken, authorize } from "../../../auth/token_validation";
router.get("/", checkToken, getall);
router.get("/find/my", checkToken, getall_my);
router.get("/:id", checkToken, one);
router.post("/", checkToken, create);
router.delete("/:id", checkToken, remove);
router.put("/:id", checkToken, update);
router.post("/xanadu", checkToken, createXanadu);
router.get("/:id/xanadu/order", checkToken, onexanadu);
export default router;

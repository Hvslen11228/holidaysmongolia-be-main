import { Router } from "express";
const router = Router();
import { create, callback, checker, notification } from "./controller";
router.post("/create", create);
router.get("/", callback);
router.get("/notification", notification);
router.post("/notification", notification);
router.get("/checker/:id", checker);
export default router;

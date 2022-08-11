import { Router } from "express";
const router = Router();
import categoryRouter from "./category/router";
import tourRouter from "./tours/router";
import authorRouter from "./author/router";
router.use("/category", categoryRouter);
router.use("/tour", tourRouter);
router.use("/author", authorRouter);
export default router;

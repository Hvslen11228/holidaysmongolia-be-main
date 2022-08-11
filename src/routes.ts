import { Request, Response, Router } from "express";
import authRouter from "./api/auth/router";
import profileRouter from "./api/profile/router";
import funRouter from "./api/fun/router";
// Routes
const router = Router();
const routers = Router();
//
router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/verify_token", profileRouter);

router.use("/fun", funRouter);
//

routers.use("/api/v1", router);
// Router not found
routers.all("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "404",
  });
});

export default routers;

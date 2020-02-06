import { Router, Request, Response } from "express";

const router = Router();

router.get("/get_devices", (req: Request, res: Response) => {
  res.send("")
})

export default router;
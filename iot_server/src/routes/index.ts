import { Router } from 'express';
import devices from "./devices";
import lights from "./lights";

// Init router and path
const router = Router();

// Add sub-routes
// router.use('/users', UserRouter);
router.use("/", devices);
router.use("/", lights);

// Export the base-router
export default router;

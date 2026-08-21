import {Router} from "express";
import { signup,signin,logout } from "../controllers/user.controller.js";
const router=Router();
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/logout",logout);
export default router;
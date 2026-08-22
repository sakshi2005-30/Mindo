import {Router} from "express"
import {createContent} from "../controllers/content.controller.js"
import {userMiddleware} from "../middlewares/user.middleware.js"
const router=Router();
router.post("/",userMiddleware,createContent);
export default router;
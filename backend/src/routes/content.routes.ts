import {Router} from "express"
import {createContent,getContent} from "../controllers/content.controller.js"
import {userMiddleware} from "../middlewares/user.middleware.js"
const router=Router();
router.post("/",userMiddleware,createContent);
router.get("/",userMiddleware,getContent)
export default router;
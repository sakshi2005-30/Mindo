import {Router} from "express"
import {createContent,getContent,deleteContent} from "../controllers/content.controller.js"
import {userMiddleware} from "../middlewares/user.middleware.js"
const router=Router();
router.post("/",userMiddleware,createContent);
router.get("/",userMiddleware,getContent);
router.delete("/:contentId",userMiddleware,deleteContent);
export default router;
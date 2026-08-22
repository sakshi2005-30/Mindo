import {shareBrain,getPublicBrain} from "../controllers/link.controller.js"
import {Router} from "express"
import {userMiddleware} from "../middlewares/user.middleware.js"
const router=Router()
router.post("/share",userMiddleware,shareBrain);
router.get("/:sharelink",getPublicBrain);
export default router;
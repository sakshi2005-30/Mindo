import {shareBrain} from "../controllers/link.controller.js"
import {Router} from "express"
import {userMiddleware} from "../middlewares/user.middleware.js"
const router=Router()
router.post("/share",userMiddleware,shareBrain);
export default router;
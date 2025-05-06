import Router from 'express';
import {
    registerUser,
    logInUser,
    logOutUser,
    refreshAccessToken,
    changePasssword
} from '../controllers/user.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(logInUser)
router.route("/logout").get(verifyToken,logOutUser)
router.route("/refreshtoken").get(verifyToken,refreshAccessToken)
router.route("/changepassword").post(verifyToken,changePasssword)

export default router
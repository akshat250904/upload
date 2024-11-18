import { Router } from "express";

import { getAllEditors, signin, signup } from "../controllers/creator.controller.js";


const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/getAllEditors").get(getAllEditors)

export default router
import express from "express"
import { testingAPI } from "../controllers/auth.controllers.js"
const authRouter = express.Router();

authRouter.get("/tests" , testingAPI);
export default authRouter;
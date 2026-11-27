import express from "express"
import { loginUser, registerUser, testingAPI } from "../controllers/auth.controllers.js"
const authRouter = express.Router();

authRouter.get("/tests" , testingAPI);
authRouter.post("/register" , registerUser)
authRouter.post("/login" , loginUser);  ``
export default authRouter;

 
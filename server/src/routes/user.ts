import express, { Router, Request, Response } from 'express';
import { UserModel } from '../models/user';
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({ username })

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
});

export { router as userRouter };
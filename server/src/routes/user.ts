import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from '../models/user';
import { UserErrors } from '../errors';

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body;
    try {
        const user = await UserModel.findOne({ username })

        if (user) {
            return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        return res.json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ type: err, message: err.message });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body;
    try {
        const user: IUser = await UserModel.findOne({ username });

    } catch (err) {
        res.status(500).json({ type: err, message: err.message })
    }
});

export { router as userRouter };
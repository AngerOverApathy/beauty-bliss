import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../models/user';
import { UserErrors } from '../errors';

// Create a new Router object for handling HTTP requests
const router = Router();

// POST endpoint for user registration
router.post("/register", async (req: Request, res: Response) => {
    // Extract username and password from the request body
    const {username, password} = req.body;
    try {
        // Check if a user with the provided username already exists
        const user = await UserModel.findOne({ username });
        if (user) {
            // If user exists, return a 400 error
            return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
        }

        // Hash the user's password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance and save it to the database
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        // Return success message upon successful registration
        return res.json({ message: 'User registered successfully' });
    } catch (err) {
        // Handle any errors during the process
        return res.status(500).json({ type: err, message: err.message });
    }
});

// POST endpoint for user login
router.post("/login", async (req: Request, res: Response) => {
    // Extract username and password from the request body
    const {username, password} = req.body;
    try {
        // Retrieve the user by username
        const user: IUser = await UserModel.findOne({ username });
        if (!user) {
            // If no user is found, return a 400 error
            return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // If the password doesn't match, return a 400 error
            return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
        }

        // Create a JSON Web Token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Return the token and user ID
        res.json({ token, userID: user._id });

    } catch (err) {
        // Handle any errors during the process
        res.status(500).json({ type: err, message: err.message })
    }
});

export { router as userRouter };
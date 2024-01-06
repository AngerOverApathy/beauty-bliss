import {Router, Request, Response} from 'express';
import { verifyToken } from './user';
import { ProductModel } from '../models/product';
import { UserModel } from '../models/user';
import { UserErrors, ProductErrors } from '../errors';

const router = Router()

router.get('/', verifyToken, async (_, res: Response) => {
    try {
        // Retrieve all products from the database
        const products = await ProductModel.find({})
        // Send the list of products as JSON response
        res.json({products})
    } catch (err) {
        // In case of any errors, respond with a 400 status and the error message
        res.status(400).json({ err })
    }
})

// Define a POST route for handling the checkout process
router.post('/checkout', verifyToken, async (req: Request, res: Response) => {
    // Extract customerID and cartItems from the request body
    const { customerID, cartItems } = req.body

    try {
        // Find the user in the database by their ID
        const user = await UserModel.findById(customerID)
        // Extract product IDs from the cart items
        const productIDs = Object.keys(cartItems)
        // Find the products in the database based on the extracted IDs
        const products = await ProductModel.find({ _id: { $in: productIDs } })

        // Check if the user exists
        if (!user) {
            // If not, return an error response
            return res.status(400).json({ type: UserErrors.NO_USER_FOUND })
        }

        // Check if all products in the cart exist
        if (products.length !== productIDs.length) {
            // If any product is missing, return an error response
            return res.status(400).json({  type: ProductErrors.NO_PRODUCT_FOUND })
        }

        // Initialize total price variable
        let totalPrice = 0;
        // Loop through each item in the cart
        for (const item in cartItems) {
            // Find the corresponding product from the database result
            const product = products.find((product) => product._id.toString() === item)
        
            // Check if the product exists
            if (!product) {
                // If not, return an error response
                return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND })
            }

            // Check if there's enough stock of the product
            if (product.stockQuantity < cartItems.quantity) {
                // If not, return an error response
                return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK })
            }

            // Add the price for this item to the total price
            totalPrice += product.price * cartItems[item]
        }
        
    } catch (err) {
        // In case of any errors, respond with a 400 status and the error message
        res.status(400).json({ err })
    }
})

export { router as productRouter }

import { Schema, model } from 'mongoose';

// Define an interface for User data structure
export interface IUser {
    _id?: string; // Optional MongoDB document ID
    username: string; // User's username
    password: string; // User's password
    availableMoney: number; // User's available money
    //purchasedItems: string[]; // Array of purchased item identifiers
}

// Define the User schema that maps to the MongoDB collection
const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true }, // Username must be unique and is required
    password: { type: String, required: true }, // Password is required
    availableMoney: { type: Number, required: true, default: 5000 }, // Available money with a default value of 5000
    //purchasedItems: { type: Array, required: true, default: [] } // Array of purchased items, required with a default empty array
});

// Create a model from the schema to interact with the 'user' collection
export const UserModel = model<IUser>('user', UserSchema); // 'user' is the name of the collection in MongoDB

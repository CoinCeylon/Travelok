import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import cors from "cors";
import connectDB from "./utils/db.js";


dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

console.log("Attempting to connect to MongoDB...");

// Set a timeout for MongoDB connection
const connectWithTimeout = () => {
    return Promise.race([
        mongoose.connect("mongodb://localhost/hotel-registry"),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('MongoDB connection timeout')), 5000)
        )
    ]);
};

connectWithTimeout().then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    console.log("Continuing without MongoDB...");
});

// Start server regardless of MongoDB connection
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

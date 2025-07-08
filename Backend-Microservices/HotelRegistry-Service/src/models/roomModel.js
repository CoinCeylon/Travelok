import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    type: String, // Deluxe, Standard
    description: String,
    price: Number,
    count: Number
});

export const Room = mongoose.model("Room", roomSchema);
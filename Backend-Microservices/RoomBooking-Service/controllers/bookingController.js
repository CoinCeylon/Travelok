const db = require("../db/connection");
const { Bookings } = require("../models/Bookings");

const createBooking = async (req, res) => {
  const { roomId, walletAddress } = req.body;

  try {
    const newBooking = await Bookings.createBooking(roomId, walletAddress);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
};

module.exports = {
  createBooking,
};

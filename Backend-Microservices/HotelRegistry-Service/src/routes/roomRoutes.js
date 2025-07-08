import express from 'express';
const router = express.Router();
import { createRoom, getRoomsByHotel } from "../controllers/roomController.js";

router.post("/", createRoom);
router.get("/:hotelId", getRoomsByHotel);

export default router;
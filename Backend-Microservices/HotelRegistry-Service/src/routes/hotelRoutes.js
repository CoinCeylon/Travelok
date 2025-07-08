import express from 'express';
import multer from 'multer';
import { getRegisteredHotels, registerHotel, verifyHotel } from '../controllers/hotelController.js';

const router = express.Router();
const upload = multer(); // memory storage

router.post("/register", upload.fields([
    { name: "license", maxCount: 1 },
    { name: "image", maxCount: 1 }
]), registerHotel);

router.post('/verify/:id', verifyHotel);
router.get('/', getRegisteredHotels);

export default router;
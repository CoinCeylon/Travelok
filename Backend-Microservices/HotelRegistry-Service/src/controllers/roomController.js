import { Room } from "../models/roomModel.js";

export async function createRoom(req, res) {
    console.log('Received create room payload:', req.body);
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export async function getRoomsByHotel(req, res) {
    try {
        const rooms = await Room.find({ hotelId: req.params.hotelId });
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const db = require("../db/connection");

class Bookings {
  static async createBooking(roomId, walletAddress) {
    const result = await db.query(
      `INSERT INTO bookings (room_id, wallet_address) 
         VALUES ($1, $2) 
         RETURNING *`,
      [roomId, walletAddress]
    );
    return result.rows[0];
  }
}

module.exports = { Bookings };

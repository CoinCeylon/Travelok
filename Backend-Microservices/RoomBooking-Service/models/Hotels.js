const db = require("../db/connection");

class Hotels {
  static async getAllHotels() {
    const result = await db.query("SELECT * FROM hotels");
    return result.rows;
  }

  static async getHotelsByLocation(location) {
    const result = await db.query(
      `SELECT 
  rooms.room_id,
  brands.brand_name,
  hotels.distance,
  hotels.hotel_facilities,
  hotel_images.hotel_image,
  locations.location,
  hotels.name,
   property_ratings.property_rating,
  hotels.ratings,
  rooms.price,
  room_types.room_type,
  rooms.images,
  CASE 
    WHEN bookings.room_id IS NULL THEN false
    ELSE true
  END AS is_booked
FROM rooms
LEFT JOIN hotels ON hotels.hotel_id = rooms.hotel_id
LEFT JOIN room_types ON room_types.room_type_id = rooms.room_type_id
LEFT JOIN property_ratings ON hotels.property_rating_id = property_ratings.property_rating_id
LEFT JOIN brands ON hotels.brand_id = brands.brand_id
LEFT JOIN hotel_images ON hotels.hotel_id = hotel_images.hotel_id
LEFT JOIN locations ON hotels.location_id = locations.location_id
LEFT JOIN bookings ON rooms.room_id = bookings.room_id
WHERE locations.location = $1`,
      [location]
    );
    return result.rows;
  }

  static async getAllLocations() {
    const result = await db.query("SELECT DISTINCT location FROM locations");
    return result.rows.map((row) => row.location);
  }
}

module.exports = { Hotels };

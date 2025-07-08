const express = require("express");
const cors = require("cors");
const db = require("./db/connection");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

db.connect((err, client, release) => {
  if (err) {
    console.error("Failed to connect to Aiven PostgreSQL:", err.stack);
  } else {
    console.log("Connected to Aiven PostgreSQL database");
    client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
      (err, results) => {
        release();
        if (err) {
          console.error("Query error:", err);
        } else {
          console.log("Database tables:", results.rows);
        }
      }
    );
  }
});

app.use("/api/hotels/", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

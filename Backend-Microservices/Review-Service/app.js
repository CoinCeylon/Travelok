// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',  // allow only your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // allowed methods
}));

const reviewRoutes = require('./routes/reviewRoutes');
const hotelRoutes = require('./routes/HotelRoutes');

app.use('/api/reviews', reviewRoutes);
app.use('/api/hotels', hotelRoutes);

mongoose.connect("mongodb+srv://travelok:travelok@cluster0.jjpsoo4.mongodb.net/review-service", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`🚀 Review service running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));

# 🏨 Hotel Booking Backend

A robust backend service for the Hotel Booking platform, built with Node.js and Express.js. This service handles all API endpoints, data persistence, and seamless integration with a PostgreSQL database hosted on Aiven.io.

## 🌟 Features

- **RESTful API** - Complete CRUD operations for hotels, bookings, and users
- **Database Integration** - PostgreSQL with Aiven.io cloud hosting
- **Booking Management** - Real-time availability checking and reservation handling
- **Search & Filtering** - Advanced hotel search with multiple criteria
- **Error Handling** - Comprehensive error handling and logging

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hotel-booking-backend.git
   cd hotel-booking-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
The backend will run on `http://localhost:5000`.

## 🗄️ Database

This project uses **PostgreSQL** database hosted on **Aiven.io** for reliable, scalable cloud database management.

### 🔍 Database Exploration

Want to explore the database visually?

1. **Download [DBeaver](https://dbeaver.io/download/)** - Free universal database tool
2. **Create a new PostgreSQL connection** in DBeaver
3. **Use your `.env` credentials:**
   - Host: `DB_HOST`
   - Port: `DB_PORT`
   - Database: `DB_DATABASE`
   - Username: `DB_USER`
   - Password: `DB_PASSWORD`

## 📁 Project Structure

```
backend/
├── controllers/          # Route controllers and business logic
│   ├── hotelController.js    # Hotel management
│   ├── bookingController.js  # Booking operations
├── models/              # Database query logic
│   ├── Hotel.js             # Hotel model
│   └── Booking.js           # Booking model
├── routes/              # API route definitions
│   ├── hotels.js            # Hotel routes
│   ├── bookings.js          # Booking routes
├── utils/               # Utility functions
│   └── config.js            # Read the env file
├── db/                  # PostgreSQL connection setup
│   └── db.js            # Connect with database
├── server.js            # Application entry point
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🛠️ API Endpoints

### Hotel Routes
```http
GET    /api/hotels            # Get all hotels (with filters)
```

### Booking Routes
```http
POST   /api/bookings          # Create new booking
```

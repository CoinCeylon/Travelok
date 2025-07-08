# 📝 TravelOK Review Service

A decentralized review microservice for the TravelOK platform. Built using **Node.js + Express**, this backend handles review submissions, IPFS storage via **Pinata**, blockchain metadata recording via **Cardano (Blockfrost API)**, and MongoDB persistence.

---

## 🌟 Features

- **RESTful API** – Review submission, viewing, and verification
- **Decentralized Storage** – Upload reviews to IPFS via Pinata
- **Cardano Blockchain Integration** – Store IPFS CID as on-chain metadata using Lucid
- **MongoDB Integration** – Store review metadata and indexes
- **Wallet Integration** – Support Lace Wallet via Mesh SDK in frontend
- **Secure Signing** – Backend signs TXs using a platform-controlled wallet
- **Validation** – Only verified guests can submit reviews (optional PoS check)

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js (v16 or higher)
- npm
- A MongoDB instance (local or Atlas)
- Pinata account (for IPFS)
- Blockfrost account (Cardano access)

---

### 📦 Installation

```bash
git clone https://github.com/Travelok/review-service
cd review-service
npm install
```

---

### ▶️ Run the server

```bash
npm start
```

> The server runs on: **http://localhost:8080**

---

## 🗄️ Database

This service uses **MongoDB** to store review metadata and blockchain references.

---

### 🔍 Database Exploration

Use a tool like **MongoDB Compass** or **NoSQLBooster** to explore collections.

Example connection string in `.env`:

```env
MONGO_URI=your_mongo_uri
```

Collections:
- `reviews` – stores review metadata, IPFS CID, txHash, wallet, rating, etc.

---

## 📁 Project Structure

```
review-service/
├── controllers/          # Route controllers and logic
│   └── reviewController.js
├── models/               # MongoDB Mongoose models
│   └── Review.js
├── routes/               # Express route definitions
│   └── reviewRoutes.js
├── services/             # IPFS, Blockchain, and DB services
│   ├── ipfsService.js
│   ├── blockchainService.js
│   └── dbService.js
├── utils/                # Utility components
│   └── eventEmitter.js
├── .env                  # Environment variables
├── server.js             # Entry point
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

---

## 🔐 Environment Variables

Create a `.env` file in the root and include the following:

```env
PORT=8080
MONGO_URI=your_mongo_uri

# Pinata
PINATA_JWT=your_pinata_jwt_token_here

# Blockfrost
BLOCKFROST_API_KEY=your_blockfrost_key

# Lucid (platform wallet)
PLATFORM_PRIVATE_KEY=a10101...your_cose_key_here
```

---

## 🛠️ API Endpoints

### **Review Routes**

| Method | Endpoint                      | Description                           |
|--------|-------------------------------|---------------------------------------|
| POST   | /api/reviews/submit           | Submit a new review                   |

---

## 🔗 Blockchain & IPFS

- **IPFS:** Reviews are pinned using Pinata (`pinJSONToIPFS`).
- **Cardano:** Each review’s CID is recorded on-chain via Lucid using Blockfrost.
- **Mesh SDK:** Used on frontend to sign TXs with Lace wallet for user-generated reviews.

---

## 📦 Tech Stack

| Component          | Tech Used                          |
|-------------------|-------------------------------------|
| Backend Framework | Node.js + Express                   |
| Database           | MongoDB + Mongoose ORM              |
| Storage (Docs)     | IPFS via Pinata                     |
| Blockchain         | Cardano + Blockfrost API            |
| Wallet Integration | Lace Wallet (Mesh SDK – frontend)   |
| Signing (Backend)  | Lucid (platform wallet)             |
| Env Management     | dotenv (`.env` file)                |

---

## 📜 License

MIT © 2025 TravelOK

---

## ✨ Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.
# Travelok Wallet Binding Service

## Overview

The Travelok Wallet Binding Service enables secure Cardano wallet binding for Travelok's booking system using cryptographic authentication.

**Components:**
- **Server:** Backend for challenge generation and signature verification.

## Key Features

- Support for major Cardano wallets (Nami, Lace, Eternal)
- Cryptographic authentication using Ed25519 signatures
- Session-based challenge management
- Responsive UI with step-by-step binding flow

## Technical Requirements

- Node.js v18+
- Cardano wallet browser extension (Nami, Lace, or Eternal)

## Setup Instructions

1. **Install Dependencies**
    ```bash
    cd server
    npm install
    ```

2. **Generate SSL Certificates**
    ```bash
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
    ```

3. **Start Development Server**
    ```bash
    cd server
    npm start
    ```

## Service Endpoints

### Client

- Access at: [https://localhost:3000](https://localhost:3000)

### API Endpoints

| Endpoint               | Method | Description                              |
|------------------------|--------|------------------------------------------|
| `/api/wallet-config`   | GET    | Returns supported wallets configuration  |
| `/api/auth-challenge`  | POST   | Generates authentication challenge       |
| `/api/verify-wallet`   | POST   | Verifies signature and binds wallet      |

## Workflow Sequence

1. User connects wallet through browser interface.
2. Server generates unique nonce challenge.
3. User signs challenge message with wallet.
4. Server verifies cryptographic signature.
5. Wallet is bound to user account on successful verification.

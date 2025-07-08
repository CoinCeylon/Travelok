import https from 'node:https';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { resolve } from 'node:path';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { 
  loadWalletConfig, 
  generateNonce, 
  validateAddress,
  verifySignature
} from './auth-utils.js';

dotenv.config();
const app = express();
const PORT = 3000;

console.log("PORT", PORT);

const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

const SESSION_SECRET = process.env.SESSION_SECRET || 'development-secret';

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true, // Set to true for HTTPS
    sameSite: 'none', // Required for cross-origin requests with credentials
    maxAge: 300000
  }
}));

app.use(express.static(join(__dirname, '../client')));

// Wallet config cache
let walletConfig;

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' https:;");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// 1. Get wallet configuration
app.get('/api/wallet-config', async (req, res) => {
  try {
    walletConfig = walletConfig || await loadWalletConfig();
    console.log('Loaded wallet config:', walletConfig);
    res.json(walletConfig);
  } catch (error) {
    console.error('Wallet config endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Generate authentication challenge
app.post('/api/auth-challenge', (req, res) => {
  const { address } = req.body;

  console.log('Received address:', address); 
  
  if (!validateAddress(address)) {
    return res.status(400).json({ error: 'Invalid Cardano address' });
  }

  const nonce = generateNonce();
  req.session.nonce = nonce;
  req.session.address = address;
  req.session.timestamp = Date.now();
  
  res.json({ 
    nonce,
    message: `Sign this message to authenticate: ${nonce}` 
  });
});

// 3. Verify signature and bind wallet
app.post('/api/verify-wallet', async (req, res) => {
  const { address, signature, key, message, messageHex } = req.body;
  
  // Session validation
  if (!req.session.nonce || req.session.address !== address) {
    return res.status(400).json({ error: 'Session expired or invalid' });
  }

  // Cleanup old sessions
  if (Date.now() - req.session.timestamp > 300000) {
    req.session.destroy();
    return res.status(400).json({ error: 'Session expired' });
  }

  try {
    // Verify the message matches what we sent
    const expectedMessage = `Sign this message to authenticate: ${req.session.nonce}`;
    if (message !== expectedMessage) {
      return res.status(400).json({ error: 'Message mismatch' });
    }

    // Verify cryptographic signature
    const isValid = await verifySignature(
      address,
      signature,
      key,
      message,
      messageHex // Pass the hex version for verification
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Success - Bind wallet to user
    req.session.destroy();
    
    res.json({ 
      success: true,
      message: 'Wallet bound successfully!',
      address
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Verification failed: ' + error.message });
  }
});

const server = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}, app);

server.listen(PORT, () => {
  console.log(`Auth service running on https://localhost:${PORT}`);
});
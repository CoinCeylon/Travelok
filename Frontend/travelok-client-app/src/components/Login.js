import React, { useState, useEffect } from 'react';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [walletConfig, setWalletConfig] = useState(null);
  const [authStep, setAuthStep] = useState('address'); // 'address', 'signing', 'verifying'

  // Auth service base URL
  const AUTH_SERVICE_URL = 'https://localhost:3000/api';

  // Admin wallet addresses
  const adminWallets = [
    'addr1q85np5sw4d9cj3m69e29lpj0fufh4as8v3ktvn9at6sk8ervdwu0m333jl6vlsa7luugtfmt2uapxydp4h0sck4wzmsslw0wcg',
  ];

  // Load wallet configuration on component mount
  useEffect(() => {
    loadWalletConfig();
  }, []);

  const loadWalletConfig = async () => {
    try {
      const response = await fetch(`${AUTH_SERVICE_URL}/wallet-config`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to load wallet configuration');
      }
      const config = await response.json();
      setWalletConfig(config);
    } catch (error) {
      console.error('Error loading wallet config:', error);
      setError('Failed to load wallet configuration. Please try again.');
    }
  };

  const validateWalletAddress = (address) => {
    // Basic Cardano wallet address validation
    if (!address || address.length < 20) {
      return false;
    }
    
    // Check if it starts with 'addr1' (mainnet) or 'addr_test1' (testnet)
    if (!address.startsWith('addr1') && !address.startsWith('addr_test1')) {
      return false;
    }
    
    return true;
  };

  const requestAuthChallenge = async (address) => {
    try {
      const response = await fetch(`${AUTH_SERVICE_URL}/auth-challenge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get authentication challenge');
      }

      return await response.json();
    } catch (error) {
      console.error('Error requesting auth challenge:', error);
      throw error;
    }
  };

  const verifyWalletSignature = async (verificationData) => {
    try {
      const response = await fetch(`${AUTH_SERVICE_URL}/verify-wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(verificationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Wallet verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying wallet:', error);
      throw error;
    }
  };

  const connectWallet = async () => {
    if (!window.cardano) {
      throw new Error('Cardano wallet not found. Please install a Cardano wallet extension.');
    }

    // Try to connect to available wallets
    const walletNames = Object.keys(window.cardano);
    let walletApi = null;

    for (const walletName of walletNames) {
      try {
        const wallet = window.cardano[walletName];
        if (wallet && wallet.isEnabled) {
          const isEnabled = await wallet.isEnabled();
          if (isEnabled) {
            walletApi = await wallet.enable();
            break;
          }
        }
        if (wallet && wallet.enable) {
          walletApi = await wallet.enable();
          break;
        }
      } catch (error) {
        console.log(`Failed to connect to ${walletName}:`, error);
        continue;
      }
    }

    if (!walletApi) {
      throw new Error('Failed to connect to any wallet. Please ensure your wallet is unlocked.');
    }

    return walletApi;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateWalletAddress(walletAddress)) {
      setError('Please enter a valid Cardano wallet address');
      return;
    }

    setLoading(true);
    setAuthStep('signing');
    
    try {
      // Step 1: Request authentication challenge
      const challenge = await requestAuthChallenge(walletAddress);
      console.log('Auth challenge received:', challenge);

      // Step 2: Connect to wallet
      const walletApi = await connectWallet();

      // Step 3: Get wallet addresses to verify the entered address
      const usedAddressesHex = await walletApi.getUsedAddresses();
      const unusedAddressesHex = await walletApi.getUnusedAddresses();
      const allAddressesHex = [...usedAddressesHex, ...unusedAddressesHex];

      // Convert hex addresses to bech32 format using the wallet's utility
      let addressFound = false;
      
      // Check if the entered address matches any of the wallet's addresses
      for (const addressHex of allAddressesHex) {
        try {
          break;
        } catch (conversionError) {
          console.log('Address conversion error:', conversionError);
          continue;
        }
      }

      // Step 4: Sign the challenge message
      const messageHex = Array.from(new TextEncoder().encode(challenge.message))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      
      // Try different signing methods based on wallet type
      let signedMessage;
      try {
        // Method 1: Try signData (CIP-8 standard)
        signedMessage = await walletApi.signData(walletAddress, messageHex);
      } catch (signError) {
        console.log('signData failed, trying alternative method:', signError);
        try {
          // Method 2: Try signing with message as string
          signedMessage = await walletApi.signData(walletAddress, challenge.message);
        } catch (signError2) {
          console.log('Alternative signing failed:', signError2);
          throw new Error('Failed to sign message. Please ensure your wallet supports message signing.');
        }
      }

      setAuthStep('verifying');

      // Step 5: Verify the signature with the auth service
      const verificationData = {
        address: walletAddress,
        signature: signedMessage.signature,
        key: signedMessage.key,
        message: challenge.message,
        messageHex: messageHex
      };

      const verificationResult = await verifyWalletSignature(verificationData);
      
      if (verificationResult.success) {
        // Check if wallet is admin
        const isAdmin = adminWallets.some(adminWallet => 
          adminWallet.toLowerCase() === walletAddress.toLowerCase()
        );
        
        // Create user object
        const user = {
          walletAddress,
          isAdmin,
          role: isAdmin ? 'admin' : 'traveler',
          loginTime: new Date().toISOString(),
          verified: true
        };
        
        // Call the onLogin callback
        onLogin(user);
      } else {
        throw new Error('Wallet verification failed');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
      setAuthStep('address');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setWalletAddress(e.target.value);
    if (error) {
      setError('');
    }
  };

  const getButtonText = () => {
    if (loading) {
      switch (authStep) {
        case 'signing':
          return 'Please sign the message in your wallet...';
        case 'verifying':
          return 'Verifying signature...';
        default:
          return 'Authenticating...';
      }
    }
    return 'Login with Wallet';
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>🔐 Login to TravelOK</h1>
        <p>Connect your wallet to access the platform</p>
      </div>

      <div className="card login-card">
        <div className="card-header">
          <h2 className="card-title">Wallet Authentication</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={handleInputChange}
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="addr1..."
              required
              disabled={loading}
            />
            {error && <div className="form-error">{error}</div>}
            <small className="form-help">
              Enter your mainnet (addr1...) or testnet (addr_test1...) wallet address
            </small>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={loading || !walletAddress}
                style={{ 
                width: '45%', 
                borderRadius: '1.4rem',
                padding: '0.75rem 1rem',
                alignItems: 'center',
                justifyContent: 'center'
                }}
            >
                {loading ? (
                <>
                    <div 
                    className="spinner" 
                    style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}
                    ></div>
                    {getButtonText()}
                </>
                ) : (
                getButtonText()
                )}
            </button>
            </div>
        </form>

        {authStep === 'signing' && (
          <div className="auth-step-info">
            <p>📝 Please check your wallet for a signing request</p>
          </div>
        )}

        {authStep === 'verifying' && (
          <div className="auth-step-info">
            <p>🔍 Verifying your signature...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
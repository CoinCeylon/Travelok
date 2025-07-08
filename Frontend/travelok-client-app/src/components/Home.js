import React from 'react';
import '../styles/HotelRegistry.css';

const Home = ({ setActiveTab }) => {
  const features = [
    {
      icon: '🔐',
      title: 'Blockchain Security',
      description: 'Secure hotel registration using Cardano blockchain technology with immutable records.'
    },
    {
      icon: '🎨',
      title: 'NFT Certificates',
      description: 'Verified hotels receive unique NFT certificates as proof of authenticity.'
    },
    {
      icon: '🌐',
      title: 'IPFS Storage',
      description: 'Decentralized document storage ensuring permanent accessibility and transparency.'
    },
    {
      icon: '⚡',
      title: 'Fast Verification',
      description: 'Streamlined verification process with real-time status updates and notifications.'
    },
    {
      icon: '🤝',
      title: 'Decentralized Trust',
      description: 'Build guest trust with transparent, tamper-proof hotel records on the blockchain.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access and manage your hotel registration from any device, anywhere, anytime.'
    }
  ];

  const stats = [
    { number: '150+', label: 'Registered Hotels' },
    { number: '98%', label: 'Verification Rate' },
    { number: '24/7', label: 'Platform Uptime' },
    { number: '50+', label: 'Countries Served' }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">TravelOK</span>
          </h1>
          <p className="hero-subtitle">
            The future of hotel registration and verification powered by blockchain technology. 
            Secure, transparent, and decentralized hotel management platform.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => setActiveTab('register')}
            >
              🏨 Register Your Hotel
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => setActiveTab('hotels')}
            >
              🔍 Browse Hotels
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-icon">🏨</span>
              <span className="hero-card-title">Hotel Certificate</span>
            </div>
            <div className="hero-card-body">
              <div className="certificate-badge">✅ Verified</div>
              <div className="certificate-details">
                <p><strong>Grand Palace Hotel</strong></p>
                <p>Colombo, Sri Lanka</p>
                <p className="nft-hash">NFT: 0x1a2b3c...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose TravelOK?</h2>
          <p>Experience the next generation of hotel registration with cutting-edge blockchain technology</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple steps to get your hotel verified and listed on our platform</p>
        </div>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Register Hotel</h3>
              <p>Submit your hotel information, location, and business license through our secure form.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Add Room Details</h3>
              <p>Specify your room types, amenities, pricing, and availability for guests.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Admin Verification</h3>
              <p>Our team reviews your submission and verifies all provided information.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>NFT Certificate</h3>
              <p>Receive your unique NFT certificate and get listed on our platform.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Go Live</h3>
              <p>Your hotel profile goes live for guests to discover and book instantly.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">6</div>
            <div className="step-content">
              <h3>Manage & Monitor</h3>
              <p>Easily update your listings, track bookings, and monitor verification status in real time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of hotels already using our platform for secure and transparent operations.</p>
          <div className="cta-actions">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => setActiveTab('register')}
            >
              Start Registration
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => setActiveTab('booking')}
            >
              Book a Room
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

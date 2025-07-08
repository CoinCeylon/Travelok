import React from 'react';
import '../styles/HotelRegistry.css';

const Footer = ({ setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>🏨 TravelOK</h3>
            <p>
              Revolutionizing hotel registration and verification through blockchain technology. 
              Secure, transparent, and decentralized hotel management platform.
            </p>
            <div className="footer-social">
              <button
                className="social-link"
                aria-label="Twitter"
                onClick={() => window.open('https://twitter.com/travelok', '_blank')}
              >
                🐦
              </button>
              <button
                className="social-link"
                aria-label="LinkedIn"
                onClick={() => window.open('https://linkedin.com/company/travelok', '_blank')}
              >
                💼
              </button>
              <button
                className="social-link"
                aria-label="GitHub"
                onClick={() => window.open('https://github.com/travelok/hotel-registry', '_blank')}
              >
                🐙
              </button>
              <button
                className="social-link"
                aria-label="Discord"
                onClick={() => window.open('https://discord.gg/travelok', '_blank')}
              >
                💬
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <button
                  className="footer-link"
                  onClick={() => handleNavigation('home')}
                >
                  <span>🏠</span>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => handleNavigation('hotels')}
                >
                  <span>🏨</span>
                  <span>Browse Hotels</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => handleNavigation('register')}
                >
                  <span>📝</span>
                  <span>Register Hotel</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => handleNavigation('booking')}
                >
                  <span>📅</span>
                  <span>Book Now</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>
                <button
                  className="footer-link"
                  onClick={() => alert('Help Center - Coming Soon! Contact us for immediate assistance.')}
                >
                  <span>❓</span>
                  <span>Help Center</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => alert('Contact Us: support@travelok.com | +1 (555) 123-4567')}
                >
                  <span>📞</span>
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => window.open('https://github.com/your-repo/hotel-registry-docs', '_blank')}
                >
                  <span>📋</span>
                  <span>Documentation</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => alert('Privacy Policy - We protect your data with blockchain security. Full policy coming soon.')}
                >
                  <span>🔒</span>
                  <span>Privacy Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="footer-section">
            <h3>Technology</h3>
            <ul>
              <li>
                <button
                  className="footer-link"
                  onClick={() => window.open('https://cardano.org/', '_blank')}
                >
                  <span>⛓️</span>
                  <span>Cardano Blockchain</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => window.open('https://ipfs.tech/', '_blank')}
                >
                  <span>🌐</span>
                  <span>IPFS Storage</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => alert('Each verified hotel receives a unique NFT as proof of authenticity on the Cardano blockchain.')}
                >
                  <span>🎨</span>
                  <span>NFT Certificates</span>
                </button>
              </li>
              <li>
                <button
                  className="footer-link"
                  onClick={() => alert(' Automated verification and NFT minting powered by Cardano smart contracts.')}
                >
                  <span>🔐</span>
                  <span>Smart Contracts</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} TravelOK. All rights reserved. | 
            Built with ❤️ on Cardano | 
            Powered by React & Blockchain Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

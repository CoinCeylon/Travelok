import React, { useState } from 'react';
import '../styles/HotelRegistry.css';
import '../styles/Login.css';
import logo from '../assets/logo.png';

const Header = ({ activeTab, setActiveTab, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseNavigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Booking' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'register', label: 'Register' },
  ];

  // Add login tab if user is not logged in
  const navigationItems = user ? [
    ...baseNavigationItems,
    ...(user.isAdmin ? [{ id: 'verify', label: 'Verify', icon: '✅' }] : [])
  ] : [
    ...baseNavigationItems,
    { id: 'login', label: 'Login' }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setActiveTab('home');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo */}
        <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <img
              src={logo}
              style={{ width: '75px', height: '75px' }}
          />
          <span>TravelOK</span>
        </a>


        {/* Desktop Navigation */}
        <nav className="header-nav">
          <ul className="nav-links">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className={`nav-link ${
                    activeTab === item.id ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* User Info & Logout */}
          {user && (
            <div className="user-info">
              <div className="user-details">
                <span className="user-role">
                  {user.isAdmin ? '🛡️ Admin' : '👤 Traveler'}
                </span>
                <span className="user-wallet">
                  {user.walletAddress.slice(0, 8)}...{user.walletAddress.slice(-4)}
                </span>
              </div>
              <button 
                className="logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                🚪
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className={`mobile-nav-link ${
                  activeTab === item.id ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
            
            {user && (
              <div className="mobile-user-info">
                <div className="mobile-user-details">
                  <span className="user-role">
                    {user.isAdmin ? '🛡️ Admin' : '👤 Traveler'}
                  </span>
                  <span className="user-wallet">
                    {user.walletAddress.slice(0, 8)}...{user.walletAddress.slice(-4)}
                  </span>
                </div>
                <button 
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
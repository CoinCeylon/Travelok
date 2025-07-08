import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Booking from "./features/booking/index";
import HotelRegistrationWizard from "./components/HotelRegistrationWizard";
import VerificationPanel from "./components/VerificationPanel";
import RegisteredHotelsDisplay from "./components/RegisteredHotelsDisplay";
import Login from "./components/Login";
import "./styles/HotelRegistry.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [refreshKey, setRefreshKey] = useState(0);
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('travelok_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('travelok_user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('travelok_user', JSON.stringify(userData));
    
    // Redirect based on user role
    if (userData.isAdmin) {
      setActiveTab('verify');
    } else {
      setActiveTab('booking');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('travelok_user');
    setActiveTab('home');
  };

  const handleRegistrationComplete = () => {
    setRefreshKey((prev) => prev + 1);
    setActiveTab("hotels");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <Home setActiveTab={setActiveTab} />;
      
      case 'booking':
        if (!user) {
          return (
            <div className="access-denied">
              <h2>🔐 Login Required</h2>
              <p>Please login to access the booking system</p>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveTab('login')}
                style={{ 
                width: '30%', 
                borderRadius: '1.4rem',
                padding: '0.75rem 1rem',
                alignItems: 'center',
                justifyContent: 'center'
                }}
              >
                Go to Login
              </button>
            </div>
          );
        }
        return <Booking user={user} />;
      
      case 'hotels':
        return <RegisteredHotelsDisplay key={refreshKey} />;
      
      case 'register':
        return <HotelRegistrationWizard onComplete={handleRegistrationComplete} />;
      
      case 'verify':
        if (!user || !user.isAdmin) {
          return (
            <div className="access-denied">
              <h2>🛡️ Admin Access Required</h2>
              <p>You need admin privileges to access the verification panel</p>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveTab('login')}
              >
                Login as Admin
              </button>
            </div>
          );
        }
        return <VerificationPanel key={refreshKey} />;
      
      case 'login':
        if (user) {
          // If already logged in, redirect to appropriate page
          if (user.isAdmin) {
            setActiveTab('verify');
          } else {
            setActiveTab('booking');
          }
          return null;
        }
        return <Login onLogin={handleLogin} />;
      
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-layout">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLogout={handleLogout}
      />

        <main className="main-content">{renderActiveTab()}</main>

        <Footer setActiveTab={setActiveTab} className="app-footer" />
      </div>
  );
}

export default App;
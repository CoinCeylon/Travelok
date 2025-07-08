import React, { useEffect, useState } from 'react';
import { getHotels, verifyHotel, getRoomsByHotel } from '../api';
import '../styles/HotelRegistry.css';

const VerificationPanel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await getHotels();
      const hotelsData = Array.isArray(response.data) ? response.data : 
                        Array.isArray(response.data.hotels) ? response.data.hotels : [];
      setHotels(hotelsData);
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelRooms = async (hotelId) => {
    try {
      const response = await getRoomsByHotel(hotelId);
      setHotelRooms(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      setHotelRooms([]);
    }
  };

  const handleVerify = async (hotelId) => {
    try {
      setVerifyingId(hotelId);
      const response = await verifyHotel(hotelId);
      
      alert(`Hotel verified successfully! NFT minted. Transaction Hash: ${response.data.txHash}`);
      
      // Refresh hotels list
      await fetchHotels();
      
      // Close modal if this hotel was selected
      if (selectedHotel && selectedHotel._id === hotelId) {
        setSelectedHotel(null);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setVerifyingId(null);
    }
  };

  const openHotelDetails = async (hotel) => {
    setSelectedHotel(hotel);
    if (hotel._id) {
      await fetchHotelRooms(hotel._id);
    }
  };

  const closeModal = () => {
    setSelectedHotel(null);
    setHotelRooms([]);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const pendingHotels = hotels.filter(hotel => !hotel.isVerified);
  const verifiedHotels = hotels.filter(hotel => hotel.isVerified);

  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1> Hotel Verification</h1>
        <p>Admin panel for reviewing and verifying hotel registrations</p>
      </div>

      {/* Pending Verifications */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Pending Verifications ({pendingHotels.length})</h2>
          <p>Hotels waiting for admin verification</p>
        </div>

        {pendingHotels.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#6b7280',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No pending verifications</p>
            <p>All hotels have been verified!</p>
          </div>
        ) : (
          <div className="hotel-grid">
            {pendingHotels.map((hotel) => (
              <div key={hotel._id} className="hotel-card">
                <div className="hotel-card-header">
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{hotel.name}</h3>
                  <p style={{ margin: 0, opacity: 0.9 }}>{hotel.location}</p>
                </div>
                <div className="hotel-card-body">
                  <div style={{ marginBottom: '1rem' }}>
                    <div className="hotel-status pending">
                      ⏳ Pending Verification
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                    <p style={{ margin: '0.25rem 0' }}>
                      <strong>Wallet:</strong> {hotel.walletAddress?.slice(0, 15)}...
                    </p>
                    {hotel.licenseIPFSHash && (
                      <p style={{ margin: '0.25rem 0' }}>
                        <strong>License:</strong> 
                        <a 
                          href={`https://ipfs.io/ipfs/${hotel.licenseIPFSHash}`} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ color: '#2563eb', marginLeft: '0.5rem' }}
                        >
                          View Document
                        </a>
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => openHotelDetails(hotel)}
                      style={{ flex: 1, fontSize: '0.875rem' }}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleVerify(hotel._id)}
                      disabled={verifyingId === hotel._id}
                      style={{ flex: 1, fontSize: '0.875rem' }}
                    >
                      {verifyingId === hotel._id ? (
                        <>
                          <div className="spinner" style={{ width: '0.875rem', height: '0.875rem' }}></div>
                          Verifying...
                        </>
                      ) : (
                        'Verify & Mint NFT'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verified Hotels */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Verified Hotels ({verifiedHotels.length})</h2>
          <p>Successfully verified and minted hotels</p>
        </div>

        {verifiedHotels.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#6b7280',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <p>No verified hotels yet</p>
          </div>
        ) : (
          <div className="hotel-grid">
            {verifiedHotels.map((hotel) => (
              <div key={hotel._id} className="hotel-card">
                <div className="hotel-card-header">
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{hotel.name}</h3>
                  <p style={{ margin: 0, opacity: 0.9 }}>{hotel.location}</p>
                </div>
                <div className="hotel-card-body">
                  <div style={{ marginBottom: '1rem' }}>
                    <div className="hotel-status verified">
                      ✅ Verified
                    </div>
                  </div>
                  
                  {hotel.nftTxHash && (
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                      <p style={{ margin: '0.25rem 0' }}>
                        <strong>NFT Transaction:</strong>
                        <a 
                          href={`https://preprod.cardanoscan.io/transaction/${hotel.nftTxHash}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#2563eb', marginLeft: '0.5rem' }}
                        >
                          {hotel.nftTxHash.slice(0, 10)}...
                        </a>
                      </p>
                    </div>
                  )}

                  <button
                    className="btn btn-secondary"
                    onClick={() => openHotelDetails(hotel)}
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{selectedHotel.name}</h2>
              <button 
                onClick={closeModal}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Hotel Information</h3>
              <p><strong>Location:</strong> {selectedHotel.location}</p>
              <p><strong>Wallet Address:</strong> {selectedHotel.walletAddress}</p>
              <p><strong>Status:</strong> {selectedHotel.isVerified ? '✅ Verified' : '⏳ Pending'}</p>
            </div>

            {hotelRooms.length > 0 && (
              <div>
                <h3>Rooms ({hotelRooms.length})</h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {hotelRooms.map((room, index) => (
                    <div key={index} style={{ 
                      padding: '1rem', 
                      background: '#f8fafc', 
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ margin: '0 0 0.25rem 0' }}>{room.type}</h4>
                          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                            {room.description}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '700', color: '#059669' }}>${room.price}/night</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{room.count} rooms</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationPanel;

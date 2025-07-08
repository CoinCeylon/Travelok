import React, { useEffect, useState } from 'react';
import { getHotels, getRoomsByHotel } from '../api';
import '../styles/HotelRegistry.css';

const RegisteredHotelsDisplay = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'verified', 'pending'
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter hotels based on status and search term
  const filteredHotels = hotels.filter(hotel => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'verified' && hotel.isVerified) ||
                         (filter === 'pending' && !hotel.isVerified);
    
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const verifiedCount = hotels.filter(h => h.isVerified).length;
  const pendingCount = hotels.filter(h => !h.isVerified).length;

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
        <h1>Registered Hotels</h1>
        <p>Browse all verified and pending hotels in our decentralized registry</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Hotel Directory ({hotels.length})</h2>
          <p>Complete list of hotels on our platform</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#dbeafe', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1d4ed8' }}>{hotels.length}</div>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>Total Hotels</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#dbeafe', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>{verifiedCount}</div>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>Verified</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#dbeafe', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'indianred' }}>{pendingCount}</div>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>Pending</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Search hotels by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('all')}
            >
              All ({hotels.length})
            </button>
            <button
              className={`btn ${filter === 'verified' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('verified')}
            >
              Verified ({verifiedCount})
            </button>
            <button
              className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({pendingCount})
            </button>
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#6b7280',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              {searchTerm ? 'No hotels found matching your search' : 'No hotels registered yet'}
            </p>
            {searchTerm && (
              <button 
                className="btn btn-secondary"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="hotel-grid">
            {filteredHotels.map((hotel) => (
                <div key={hotel._id} className="hotel-card">
                  {hotel.imageIPFSHash ? (
                      <img
                          src={`https://ipfs.io/ipfs/${hotel.imageIPFSHash}`}
                          alt={hotel.name}
                          className="hotel-image"
                          style={{
                            width: '100%',
                            height: '180px',
                            objectFit: 'cover',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px'
                          }}
                      />
                  ) : (
                      <div
                          style={{
                            width: '100%',
                            height: '180px',
                            backgroundColor: '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px'
                          }}
                      >
                        No Image Available
                      </div>
                  )}

                  <div className="hotel-card-header" style={{ padding: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{hotel.name}</h3>
                    <p style={{ margin: 0, opacity: 0.9 }}>{hotel.location}</p>
                  </div>

                  <div className="hotel-card-body" style={{ padding: '0 1rem 1rem 1rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div className={`hotel-status ${hotel.isVerified ? 'verified' : 'pending'}`}>
                        {hotel.isVerified ? '✅ Verified' : '⏳ Pending Verification'}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                      <p style={{ margin: '0.25rem 0' }}>
                        <strong>Wallet:</strong> {hotel.walletAddress?.slice(0, 15)}...
                      </p>
                      {hotel.isVerified && hotel.nftTxHash && (
                          <p style={{ margin: '0.25rem 0' }}>
                            <strong>NFT:</strong>
                            <a
                                href={`https://preprod.cardanoscan.io/transaction/${hotel.nftTxHash}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#2563eb', marginLeft: '0.5rem' }}
                            >
                              View Transaction
                            </a>
                          </p>
                      )}
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

                    <button
                        className="btn btn-primary"
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
            maxWidth: '700px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ margin: '0 0 0.25rem 0' }}>{selectedHotel.name}</h2>
                <div className={`hotel-status ${selectedHotel.isVerified ? 'verified' : 'pending'}`}>
                  {selectedHotel.isVerified ? '✅ Verified Hotel' : '⏳ Pending Verification'}
                </div>
              </div>
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



            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                  className="btn btn-secondary"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                  onClick={() => alert('Review feature coming soon!')}
              >
                ⭐ View Reviews
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Hotel Information</h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
                  <span style={{ fontWeight: '600' }}>Location:</span>
                  <span>{selectedHotel.location}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
                  <span style={{ fontWeight: '600' }}>Wallet Address:</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {selectedHotel.walletAddress?.slice(0, 20)}...{selectedHotel.walletAddress?.slice(-10)}
                  </span>
                </div>
                {selectedHotel.nftTxHash && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
                    <span style={{ fontWeight: '600' }}>NFT Transaction:</span>
                    <a 
                      href={`https://preprod.cardanoscan.io/transaction/${selectedHotel.nftTxHash}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#2563eb' }}
                    >
                      {selectedHotel.nftTxHash.slice(0, 15)}...
                    </a>
                  </div>
                )}
              </div>
            </div>

            {hotelRooms.length > 0 && (
              <div>
                <h3 style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  Available Rooms ({hotelRooms.length})
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                  {hotelRooms.map((room, index) => (
                    <div key={index} style={{ 
                      padding: '1rem', 
                      background: '#f8fafc', 
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 0.25rem 0', color: '#1f2937' }}>{room.type}</h4>
                          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                            {room.description}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                          <div style={{ fontWeight: '700', color: '#059669', fontSize: '1.125rem' }}>
                            ${room.price}/night
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            {room.count} room{room.count > 1 ? 's' : ''} available
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hotelRooms.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#6b7280',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <p>No room information available</p>
              </div>
            )}
          </div>

        </div>


      )}


    </div>
  );
};

export default RegisteredHotelsDisplay;

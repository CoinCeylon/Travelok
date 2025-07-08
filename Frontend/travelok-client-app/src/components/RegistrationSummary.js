import React, { useState } from 'react';
import '../styles/HotelRegistry.css';

const RegistrationSummary = ({ formData, rooms, onPrevious, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      alert('Hotel and rooms registered successfully!');
      onComplete();
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      setSubmitError(
          error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };


  const totalRooms = rooms.reduce((sum, room) => sum + room.count, 0);
  const averagePrice = rooms.length > 0 
    ? (rooms.reduce((sum, room) => sum + (room.price * room.count), 0) / totalRooms).toFixed(2)
    : 0;

  return (
    <div className="card fade-in">
      <div className="card-header">
        <h2 className="card-title">Registration Summary</h2>
        <p>Please review your information before submitting</p>
      </div>

      {/* Hotel Information Summary */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
          Hotel Information
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Hotel Name:</span>
            <span style={{ color: '#1f2937' }}>{formData.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Location:</span>
            <span style={{ color: '#1f2937' }}>{formData.location}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Wallet Address:</span>
            <span style={{ color: '#1f2937', fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {formData.walletAddress.slice(0, 20)}...{formData.walletAddress.slice(-10)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>License Document:</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>
              ✓ {formData.license.name} ({(formData.license.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Hotel Image:</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>
              ✓ {formData.image.name} ({(formData.image.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
        </div>
      </div>

      {/* Rooms Summary */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
          Rooms Summary
        </h3>
        
        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#dbeafe', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1d4ed8' }}>{rooms.length}</div>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>Room Types</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#dcfce7', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>{totalRooms}</div>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>Total Rooms</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#fef3c7', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d97706' }}>${averagePrice}</div>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>Avg. Price</div>
          </div>
        </div>

        {/* Room Details */}
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {rooms.map((room, index) => (
            <div key={room.id} style={{ 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#1f2937' }}>{room.type}</h4>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                    {room.description}
                  </p>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                  <div style={{ fontWeight: '700', color: '#059669', fontSize: '1.125rem' }}>
                    ${room.price}/night
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {room.count} room{room.count > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div style={{ 
        padding: '1.5rem', 
        background: '#fef9e7', 
        borderRadius: '8px', 
        border: '1px solid #fbbf24',
        marginBottom: '2rem'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#92400e' }}>Important Information</h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#92400e' }}>
          <li>Your hotel information will be stored on IPFS for decentralization</li>
          <li>After submission, an admin will review and verify your hotel</li>
          <li>Upon verification, an NFT will be minted to your wallet address</li>
          <li>This process may take 1-3 business days</li>
          <li>Make sure all information is accurate as it cannot be easily changed later</li>
        </ul>
      </div>

      {/* Error Display */}
      {submitError && (
        <div style={{ 
          padding: '1rem', 
          background: '#fef2f2', 
          borderRadius: '8px', 
          border: '1px solid #fca5a5',
          marginBottom: '2rem'
        }}>
          <p style={{ margin: 0, color: '#dc2626', fontWeight: '600' }}>
            ❌ {submitError}
          </p>
        </div>
      )}

      <div className="btn-group">
        <button 
          type="button" 
          className="btn btn-secondary btn-lg"
          onClick={onPrevious}
          disabled={isSubmitting}
        >
          ← Previous
        </button>
        <button 
          type="button" 
          className="btn btn-success btn-lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}></div>
              Submitting...
            </>
          ) : (
            'Submit Registration'
          )}
        </button>
      </div>
    </div>
  );
};

export default RegistrationSummary;

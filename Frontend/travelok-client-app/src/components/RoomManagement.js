// import React, { useState } from 'react';
// import '../styles/HotelRegistry.css';
//
// const RoomManagement = ({ rooms, setRooms, onNext, onPrevious }) => {
//   const [currentRoom, setCurrentRoom] = useState({
//     type: '',
//     description: '',
//     price: '',
//     count: 1
//   });
//   const [errors, setErrors] = useState({});
//
//   const handleRoomChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentRoom(prev => ({
//       ...prev,
//       [name]: value
//     }));
//
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };
//
//   const validateRoom = () => {
//     const newErrors = {};
//
//     if (!currentRoom.type?.trim()) {
//       newErrors.type = 'Room type is required';
//     }
//
//     if (!currentRoom.description?.trim()) {
//       newErrors.description = 'Description is required';
//     }
//
//     if (!currentRoom.price || currentRoom.price <= 0) {
//       newErrors.price = 'Price must be greater than 0';
//     }
//
//     if (!currentRoom.count || currentRoom.count <= 0) {
//       newErrors.count = 'Count must be greater than 0';
//     }
//
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//
//   const addRoom = () => {
//     if (validateRoom()) {
//       const newRoom = {
//         ...currentRoom,
//         id: Date.now(), // Simple ID generation
//         price: parseFloat(currentRoom.price),
//         count: parseInt(currentRoom.count)
//       };
//
//       setRooms(prev => [...prev, newRoom]);
//       setCurrentRoom({
//         type: '',
//         description: '',
//         price: '',
//         count: 1
//       });
//       setErrors({});
//     }
//   };
//
//   const removeRoom = (roomId) => {
//     setRooms(prev => prev.filter(room => room.id !== roomId));
//   };
//
//   const editRoom = (room) => {
//     setCurrentRoom(room);
//     removeRoom(room.id);
//   };
//
//   const handleNext = () => {
//     if (rooms.length === 0) {
//       alert('Please add at least one room before proceeding');
//       return;
//     }
//     onNext();
//   };
//
//   const roomTypes = [
//     'Standard Room',
//     'Deluxe Room',
//     'Suite',
//     'Executive Suite',
//     'Presidential Suite',
//     'Family Room',
//     'Twin Room',
//     'Single Room',
//     'Double Room',
//     'Triple Room'
//   ];
//
//   return (
//     <div className="card fade-in">
//       <div className="card-header">
//         <h2 className="card-title">Room Management</h2>
//         <p>Add the different types of rooms available in your hotel</p>
//       </div>
//
//       {/* Add Room Form */}
//       <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px' }}>
//         <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Add New Room</h3>
//
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
//           <div className="form-group">
//             <label className="form-label">Room Type *</label>
//             <select
//               name="type"
//               value={currentRoom.type}
//               onChange={handleRoomChange}
//               className={`form-input ${errors.type ? 'error' : ''}`}
//             >
//               <option value="">Select room type</option>
//               {roomTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//             {errors.type && <div className="form-error">{errors.type}</div>}
//           </div>
//
//           <div className="form-group">
//             <label className="form-label">Price per Night (USD) *</label>
//             <input
//               type="number"
//               name="price"
//               value={currentRoom.price}
//               onChange={handleRoomChange}
//               className={`form-input ${errors.price ? 'error' : ''}`}
//               placeholder="0.00"
//               min="0"
//               step="0.01"
//             />
//             {errors.price && <div className="form-error">{errors.price}</div>}
//           </div>
//
//           <div className="form-group">
//             <label className="form-label">Number of Rooms *</label>
//             <input
//               type="number"
//               name="count"
//               value={currentRoom.count}
//               onChange={handleRoomChange}
//               className={`form-input ${errors.count ? 'error' : ''}`}
//               min="1"
//             />
//             {errors.count && <div className="form-error">{errors.count}</div>}
//           </div>
//         </div>
//
//         <div className="form-group">
//           <label className="form-label">Description *</label>
//           <textarea
//             name="description"
//             value={currentRoom.description}
//             onChange={handleRoomChange}
//             className={`form-input ${errors.description ? 'error' : ''}`}
//             placeholder="Describe the room amenities, size, view, etc."
//             rows="3"
//             style={{ resize: 'vertical' }}
//           />
//           {errors.description && <div className="form-error">{errors.description}</div>}
//         </div>
//
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={addRoom}
//         >
//           Add Room
//         </button>
//       </div>
//
//       {/* Room List */}
//       {rooms.length > 0 && (
//         <div>
//           <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Added Rooms ({rooms.length})</h3>
//           <div className="room-list">
//             {rooms.map((room) => (
//               <div key={room.id} className="room-item">
//                 <div className="room-info">
//                   <h4>{room.type}</h4>
//                   <p>{room.description}</p>
//                   <p style={{ fontWeight: '600', color: '#10b981' }}>
//                     ${room.price}/night • {room.count} room{room.count > 1 ? 's' : ''}
//                   </p>
//                 </div>
//                 <div className="room-actions">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => editRoom(room)}
//                     style={{ padding: '0.5rem 1rem' }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => removeRoom(room.id)}
//                     style={{ padding: '0.5rem 1rem' }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//
//       {rooms.length === 0 && (
//         <div style={{
//           textAlign: 'center',
//           padding: '3rem',
//           color: '#6b7280',
//           background: '#f9fafb',
//           borderRadius: '8px',
//           border: '2px dashed #e5e7eb'
//         }}>
//           <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No rooms added yet</p>
//           <p>Add your first room using the form above</p>
//         </div>
//       )}
//
//       <div className="btn-group">
//         <button
//           type="button"
//           className="btn btn-secondary btn-lg"
//           onClick={onPrevious}
//         >
//           ← Previous
//         </button>
//         <button
//           type="button"
//           className="btn btn-primary btn-lg"
//           onClick={handleNext}
//         >
//           Next: Review & Submit →
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default RoomManagement;


import React, { useState } from 'react';
import axios from 'axios';
import '../styles/HotelRegistry.css';

const RoomManagement = ({ rooms, setRooms, onNext, onPrevious }) => {
  const hotelId = localStorage.getItem('registeredHotelId');
  const [currentRoom, setCurrentRoom] = useState({
    type: '',
    description: '',
    price: '',
    count: 1
  });
  const [errors, setErrors] = useState({});

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoom(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateRoom = () => {
    const newErrors = {};
    if (!currentRoom.type?.trim()) newErrors.type = 'Room type is required';
    if (!currentRoom.description?.trim()) newErrors.description = 'Description is required';
    if (!currentRoom.price || currentRoom.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!currentRoom.count || currentRoom.count <= 0) newErrors.count = 'Count must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addRoom = () => {
    if (validateRoom()) {
      const newRoom = {
        ...currentRoom,
        id: Date.now(),
        price: parseFloat(currentRoom.price),
        count: parseInt(currentRoom.count)
      };
      setRooms(prev => [...prev, newRoom]);
      setCurrentRoom({ type: '', description: '', price: '', count: 1 });
      setErrors({});
    }
  };

  const removeRoom = (roomId) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
  };

  const editRoom = (room) => {
    setCurrentRoom(room);
    removeRoom(room.id);
  };

  const API_BASE = 'http://localhost:5001';

  const handleNext = async () => {
    if (rooms.length === 0) {
      alert('Please add at least one room before proceeding');
      return;
    }

    try {
      console.log("Hotel ID:", hotelId);

      await Promise.all(
          rooms.map(room =>
              axios.post(`${API_BASE}/api/rooms`, {
                hotelId: hotelId,
                type: room.type,
                description: room.description,
                price: room.price,
                count: room.count
              })
          )
      );
      onNext(); // Proceed to next step
    } catch (err) {
      console.error('Failed to save rooms:', err);
      alert('Failed to save rooms. Please try again.');
    }
  };

  const roomTypes = [
    'Standard Room', 'Deluxe Room', 'Suite', 'Executive Suite',
    'Presidential Suite', 'Family Room', 'Twin Room',
    'Single Room', 'Double Room', 'Triple Room'
  ];

  return (
      <div className="card fade-in">
        <div className="card-header">
          <h2 className="card-title">Room Management</h2>
          <p>Add the different types of rooms available in your hotel</p>
        </div>

        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Add New Room</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Room Type *</label>
              <select
                  name="type"
                  value={currentRoom.type}
                  onChange={handleRoomChange}
                  className={`form-input ${errors.type ? 'error' : ''}`}
              >
                <option value="">Select room type</option>
                {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <div className="form-error">{errors.type}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Price per Night (USD) *</label>
              <input
                  type="number"
                  name="price"
                  value={currentRoom.price}
                  onChange={handleRoomChange}
                  className={`form-input ${errors.price ? 'error' : ''}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
              />
              {errors.price && <div className="form-error">{errors.price}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Number of Rooms *</label>
              <input
                  type="number"
                  name="count"
                  value={currentRoom.count}
                  onChange={handleRoomChange}
                  className={`form-input ${errors.count ? 'error' : ''}`}
                  min="1"
              />
              {errors.count && <div className="form-error">{errors.count}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
                name="description"
                value={currentRoom.description}
                onChange={handleRoomChange}
                className={`form-input ${errors.description ? 'error' : ''}`}
                placeholder="Describe the room amenities, size, view, etc."
                rows="3"
                style={{ resize: 'vertical' }}
            />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          <button type="button" className="btn btn-primary" onClick={addRoom}>
            Add Room
          </button>
        </div>

        {rooms.length > 0 ? (
            <div>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Added Rooms ({rooms.length})</h3>
              <div className="room-list">
                {rooms.map((room) => (
                    <div key={room.id} className="room-item">
                      <div className="room-info">
                        <h4>{room.type}</h4>
                        <p>{room.description}</p>
                        <p style={{ fontWeight: '600', color: '#10b981' }}>
                          ${room.price}/night • {room.count} room{room.count > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="room-actions">
                        <button className="btn btn-secondary" onClick={() => editRoom(room)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => removeRoom(room.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6b7280',
              background: '#f9fafb',
              borderRadius: '8px',
              border: '2px dashed #e5e7eb'
            }}>
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No rooms added yet</p>
              <p>Add your first room using the form above</p>
            </div>
        )}

        <div className="btn-group">
          <button type="button" className="btn btn-secondary btn-lg" onClick={onPrevious}>
            ← Previous
          </button>
          <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
            Next: Review & Submit →
          </button>
        </div>
      </div>
  );
};

export default RoomManagement;

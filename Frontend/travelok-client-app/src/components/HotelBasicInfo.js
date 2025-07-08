// import React, { useState } from 'react';
// import '../styles/HotelRegistry.css';
//
// const HotelBasicInfo = ({ formData, setFormData, onNext }) => {
//   const [errors, setErrors] = useState({});
//   const [dragOver, setDragOver] = useState(false);
//   const [imageDragOver, setImageDragOver] = useState(false);
//
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//
//     if (files && files.length > 0) {
//       const file = files[0];
//       setFormData(prev => ({ ...prev, [name]: file }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };
//
//   const handleImageDrop = (e) => {
//     e.preventDefault();
//     setImageDragOver(false);
//     const droppedFile = Array.from(e.dataTransfer.files).find(file =>
//         ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
//     );
//     if (droppedFile) {
//       setFormData(prev => ({ ...prev, image: droppedFile }));
//     }
//   };
//
//   const validateForm = () => {
//     const newErrors = {};
//
//     if (!formData.name?.trim()) newErrors.name = 'Hotel name is required';
//     if (!formData.location?.trim()) newErrors.location = 'Location is required';
//     if (!formData.walletAddress?.trim()) newErrors.walletAddress = 'Wallet address is required';
//
//     if (!formData.license) {
//       newErrors.license = 'License document is required';
//     } else {
//       const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//       if (!allowedTypes.includes(formData.license.type)) {
//         newErrors.license = 'Please upload a PDF, JPG, or PNG file';
//       }
//       if (formData.license.size > 10 * 1024 * 1024) {
//         newErrors.license = 'File size must be less than 10MB';
//       }
//     }
//
//     if (!formData.image) {
//       newErrors.image = 'Hotel image is required';
//     } else {
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//       if (!allowedTypes.includes(formData.image.type)) {
//         newErrors.image = 'Please upload a JPG or PNG image';
//       }
//       if (formData.image.size > 10 * 1024 * 1024) {
//         newErrors.image = 'Image size must be less than 10MB';
//       }
//     }
//
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//
//   const handleNext = () => {
//     if (validateForm()) onNext();
//   };
//
//   return (
//       <div className="card fade-in">
//         <div className="card-header">
//           <h2 className="card-title">Hotel Information</h2>
//           <p>Please provide basic information about your hotel</p>
//         </div>
//
//         {/* Name */}
//         <div className="form-group">
//           <label className="form-label">Hotel Name *</label>
//           <input
//               type="text"
//               name="name"
//               value={formData.name || ''}
//               onChange={handleChange}
//               className={`form-input ${errors.name ? 'error' : ''}`}
//               placeholder="Enter your hotel name"
//           />
//           {errors.name && <div className="form-error">{errors.name}</div>}
//         </div>
//
//         {/* Location */}
//         <div className="form-group">
//           <label className="form-label">Location *</label>
//           <input
//               type="text"
//               name="location"
//               value={formData.location || ''}
//               onChange={handleChange}
//               className={`form-input ${errors.location ? 'error' : ''}`}
//               placeholder="Enter hotel location (e.g., Colombo, Sri Lanka)"
//           />
//           {errors.location && <div className="form-error">{errors.location}</div>}
//         </div>
//
//         {/* Wallet Address */}
//         <div className="form-group">
//           <label className="form-label">Wallet Address *</label>
//           <input
//               type="text"
//               name="walletAddress"
//               value={formData.walletAddress || ''}
//               onChange={handleChange}
//               className={`form-input ${errors.walletAddress ? 'error' : ''}`}
//               placeholder="addr1..."
//           />
//           {errors.walletAddress && <div className="form-error">{errors.walletAddress}</div>}
//           <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
//             This will be used for NFT minting and verification
//           </small>
//         </div>
//
//         {/* License Upload */}
//         <div className="form-group">
//           <label className="form-label">Business License *</label>
//           <div
//               className={`file-upload ${dragOver ? 'dragover' : ''} ${errors.license ? 'error' : ''}`}
//               onDragOver={e => { e.preventDefault(); setDragOver(true); }}
//               onDragLeave={e => { e.preventDefault(); setDragOver(false); }}
//               onDrop={e => {
//                 e.preventDefault();
//                 setDragOver(false);
//                 const file = e.dataTransfer.files[0];
//                 if (file) setFormData(prev => ({ ...prev, license: file }));
//               }}
//               onClick={() => document.getElementById('license-input').click()}
//           >
//             <input
//                 id="license-input"
//                 type="file"
//                 name="license"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 onChange={handleChange}
//                 style={{ display: 'none' }}
//             />
//             <div>
//               {formData.license ? (
//                   <>
//                     <p style={{ margin: 0, fontWeight: '600', color: '#10b981' }}>
//                       ✓ {formData.license.name}
//                     </p>
//                     <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
//                       {(formData.license.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </>
//               ) : (
//                   <>
//                     <p style={{ margin: 0, fontWeight: '600' }}>
//                       📄 Drop your license file here or click to browse
//                     </p>
//                     <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
//                       Supports PDF, JPG, PNG (max 10MB)
//                     </p>
//                   </>
//               )}
//             </div>
//           </div>
//           {errors.license && <div className="form-error">{errors.license}</div>}
//         </div>
//
//         {/* Hotel Image */}
//         <div className="form-group">
//           <label className="form-label">Hotel Image *</label>
//           <div
//               className={`file-upload ${imageDragOver ? 'dragover' : ''} ${errors.image ? 'error' : ''}`}
//               onDragOver={e => { e.preventDefault(); setImageDragOver(true); }}
//               onDragLeave={e => { e.preventDefault(); setImageDragOver(false); }}
//               onDrop={handleImageDrop}
//               onClick={() => document.getElementById('image-input').click()}
//           >
//             <input
//                 id="image-input"
//                 type="file"
//                 name="image"
//                 accept="image/jpeg,image/png,image/jpg"
//                 style={{ display: 'none' }}
//                 onChange={handleChange}
//             />
//             <div>
//               {formData.image ? (
//                   <p style={{ margin: 0, fontWeight: '500', color: '#10b981' }}>
//                     ✓ {formData.image.name} ({(formData.image.size / 1024 / 1024).toFixed(2)} MB)
//                   </p>
//               ) : (
//                   <>
//                     <p style={{ margin: 0, fontWeight: '600' }}>
//                       🖼️ Drop hotel image here or click to browse
//                     </p>
//                     <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
//                       Supports JPG, PNG (max 10MB)
//                     </p>
//                   </>
//               )}
//             </div>
//           </div>
//           {errors.image && <div className="form-error">{errors.image}</div>}
//         </div>
//
//         {/* Next */}
//         <div className="btn-group">
//           <button
//               type="button"
//               className="btn btn-primary btn-lg"
//               onClick={handleNext}
//           >
//             Next > Add Rooms →
//           </button>
//         </div>
//       </div>
//   );
// };
//
// export default HotelBasicInfo;



import React, { useState } from 'react';
import '../styles/HotelRegistry.css';
import { registerHotel } from '../api';

const HotelBasicInfo = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [dragOver, setDragOver] = useState(false);
  const [imageDragOver, setImageDragOver] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (files && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setImageDragOver(false);
    const droppedFile = Array.from(e.dataTransfer.files).find(file =>
        ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
    );
    if (droppedFile) {
      setFormData(prev => ({ ...prev, image: droppedFile }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Hotel name is required';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';
    if (!formData.walletAddress?.trim()) newErrors.walletAddress = 'Wallet address is required';

    if (!formData.license) {
      newErrors.license = 'License document is required';
    } else {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(formData.license.type)) {
        newErrors.license = 'Please upload a PDF, JPG, or PNG file';
      }
      if (formData.license.size > 10 * 1024 * 1024) {
        newErrors.license = 'File size must be less than 10MB';
      }
    }

    if (!formData.image) {
      newErrors.image = 'Hotel image is required';
    } else {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = 'Please upload a JPG or PNG image';
      }
      if (formData.image.size > 10 * 1024 * 1024) {
        newErrors.image = 'Image size must be less than 10MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) return;

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('walletAddress', formData.walletAddress);
    data.append('license', formData.license);
    data.append('image', formData.image);

    try {
      const response = await registerHotel(data);
      const hotelId = response.data.hotel._id;

      localStorage.setItem('registeredHotelId', hotelId); // Optional, for global access

      onNext(hotelId); // Pass to next step (add rooms)
    } catch (err) {
      console.error('Hotel submission failed:', err);
      alert("Hotel registration failed. Please try again.");
    }
  };

  return (
      <div className="card fade-in">
        <div className="card-header">
          <h2 className="card-title">Hotel Information</h2>
          <p>Please provide basic information about your hotel</p>
        </div>

        {/* Hotel Name */}
        <div className="form-group">
          <label className="form-label">Hotel Name *</label>
          <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your hotel name"
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="form-label">Location *</label>
          <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className={`form-input ${errors.location ? 'error' : ''}`}
              placeholder="Enter hotel location (e.g., Colombo, Sri Lanka)"
          />
          {errors.location && <div className="form-error">{errors.location}</div>}
        </div>

        {/* Wallet Address */}
        <div className="form-group">
          <label className="form-label">Wallet Address *</label>
          <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress || ''}
              onChange={handleChange}
              className={`form-input ${errors.walletAddress ? 'error' : ''}`}
              placeholder="addr1..."
          />
          {errors.walletAddress && <div className="form-error">{errors.walletAddress}</div>}
          <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            This will be used for NFT minting and verification
          </small>
        </div>

        {/* License Upload */}
        <div className="form-group">
          <label className="form-label">Business License *</label>
          <div
              className={`file-upload ${dragOver ? 'dragover' : ''} ${errors.license ? 'error' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={e => { e.preventDefault(); setDragOver(false); }}
              onDrop={e => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) setFormData(prev => ({ ...prev, license: file }));
              }}
              onClick={() => document.getElementById('license-input').click()}
          >
            <input
                id="license-input"
                type="file"
                name="license"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <div>
              {formData.license ? (
                  <>
                    <p style={{ margin: 0, fontWeight: '600', color: '#10b981' }}>
                      ✓ {formData.license.name}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {(formData.license.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
              ) : (
                  <>
                    <p style={{ fontWeight: '600' }}>
                      📄 Drop your license file here or click to browse
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Supports PDF, JPG, PNG (max 10MB)
                    </p>
                  </>
              )}
            </div>
          </div>
          {errors.license && <div className="form-error">{errors.license}</div>}
        </div>

        {/* Hotel Image */}
        <div className="form-group">
          <label className="form-label">Hotel Image *</label>
          <div
              className={`file-upload ${imageDragOver ? 'dragover' : ''} ${errors.image ? 'error' : ''}`}
              onDragOver={e => { e.preventDefault(); setImageDragOver(true); }}
              onDragLeave={e => { e.preventDefault(); setImageDragOver(false); }}
              onDrop={handleImageDrop}
              onClick={() => document.getElementById('image-input').click()}
          >
            <input
                id="image-input"
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/jpg"
                style={{ display: 'none' }}
                onChange={handleChange}
            />
            <div>
              {formData.image ? (
                  <p style={{ fontWeight: '500', color: '#10b981' }}>
                    ✓ {formData.image.name} ({(formData.image.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
              ) : (
                  <>
                    <p style={{ fontWeight: '600' }}>
                      🖼️ Drop hotel image here or click to browse
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Supports JPG, PNG (max 10MB)
                    </p>
                  </>
              )}
            </div>
          </div>
          {errors.image && <div className="form-error">{errors.image}</div>}
        </div>

        {/* Next Button */}
        <div className="btn-group">
          <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleNext}
          >
            Next &gt; Add Rooms →
          </button>
        </div>
      </div>
  );
};

export default HotelBasicInfo;

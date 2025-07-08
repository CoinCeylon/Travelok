import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import HotelBasicInfo from './HotelBasicInfo';
import RoomManagement from './RoomManagement';
import RegistrationSummary from './RegistrationSummary';
import '../styles/HotelRegistry.css';

const HotelRegistrationWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    walletAddress: '',
    license: null,
    image: null
  });
  const [rooms, setRooms] = useState([]);

  const steps = [
    { id: 'basic', label: 'Hotel Info' },
    { id: 'rooms', label: 'Add Rooms' },
    { id: 'summary', label: 'Review & Submit' }
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = (registrationData) => {
    // Reset form
    setCurrentStep(1);
    setFormData({
      name: '',
      location: '',
      walletAddress: '',
      license: null,
      image: null
    });
    setRooms([]);
    
    // Call parent completion handler
    if (onComplete) {
      onComplete(registrationData);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <HotelBasicInfo
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <RoomManagement
            rooms={rooms}
            setRooms={setRooms}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <RegistrationSummary
            formData={formData}
            rooms={rooms}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1> Hotel Registration</h1>
        <p>Register your hotel on the blockchain with our secure, step-by-step process</p>
      </div>

      <StepIndicator currentStep={currentStep} steps={steps} />
      {renderCurrentStep()}
    </div>
  );
};

export default HotelRegistrationWizard;

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mail, Phone, Cake, Edit2, Save, X, AlertCircle, Calendar } from 'lucide-react';
import Badge from './Badge/Badge';

const Alert = ({ children, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{children}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
        <X className="h-6 w-6 text-green-500" />
      </span>
    </div>
  );
};

const ProfileField = ({ label, value, icon, isEditing, onChange, type = "text" }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        {icon}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        className={`w-full pl-10 pr-3 py-2 rounded-md border ${
          isEditing ? 'border-blue-300' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {type === "date" && isEditing && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer">
          <Calendar className="h-5 w-5" onClick={() => document.getElementById('dob-input').showPicker()} />
        </span>
      )}
    </div>
  </div>
);

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    dateOfBirth: '1990-01-01',
    points: 100,
    profileImage: '/api/placeholder/150/150',
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowAlert(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg font-medium leading-6 text-gray-900">My Profile</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <div className="relative">
                <img
                  className="h-40 w-40 rounded-full object-cover"
                  src={formData.profileImage}
                  alt="Profile"
                />
                <button
                  className={`absolute bottom-0 right-0 rounded-full p-2 shadow-lg ${
                    isEditing ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
                  }`}
                  onClick={triggerImageUpload}
                >
                  <Camera className="h-5 w-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex-grow space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ProfileField
                  label="Username"
                  value={formData.username}
                  icon={<Mail className="h-5 w-5" />}
                  isEditing={isEditing}
                  onChange={(e) => handleInputChange({ target: { name: 'username', value: e.target.value } })}
                />
                <ProfileField
                  label="Full Name"
                  value={formData.fullName}
                  icon={<Edit2 className="h-5 w-5" />}
                  isEditing={isEditing}
                  onChange={(e) => handleInputChange({ target: { name: 'fullName', value: e.target.value } })}
                />
                <ProfileField
                  label="Email"
                  value={formData.email}
                  icon={<Mail className="h-5 w-5" />}
                  isEditing={isEditing}
                  onChange={(e) => handleInputChange({ target: { name: 'email', value: e.target.value } })}
                />
                <ProfileField
                  label="Phone"
                  value={formData.phone}
                  icon={<Phone className="h-5 w-5" />}
                  isEditing={isEditing}
                  onChange={(e) => handleInputChange({ target: { name: 'phone', value: e.target.value } })}
                />
                <ProfileField
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  icon={<Cake className="h-5 w-5" />}
                  isEditing={isEditing}
                  onChange={(e) => handleInputChange({ target: { name: 'dateOfBirth', value: e.target.value } })}
                  type="date"
                />
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Points</label>
                  <div className="text-lg font-semibold text-blue-600">{formData.points}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit2 className="h-5 w-5 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
      {/* Badge Section */}
      <div className="max-w-3xl mx-auto py-4">
        <Badge />
      </div>
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)}>
          <AlertCircle className="h-5 w-5 inline mr-2" />
          Profile updated successfully!
        </Alert>
      )}
    </div>
  );
};

export default Account;

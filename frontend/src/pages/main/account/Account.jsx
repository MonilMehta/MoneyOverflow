import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Camera, Mail, Phone, Cake, Edit2, Save, X, AlertCircle, Calendar } from 'lucide-react';
import Badge from './Badge/Badge';
import { currentUser } from "../../../apis/user.api";

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
    username: '',
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    points: 0,
  });

  const fileInputRef = useRef(null);

  // Fetch current user data from backend
  const fetchCurrentUser = async () => {
    try {
      let accessToken = await document.cookie.split("accessToken=")[1]?.split(";")[0];
      const res = await axios.get(currentUser, { headers: { Authorization: `Bearer ${accessToken}` } });
      const userData = res?.data?.data;

      // Update formData with fetched user data
      setFormData({
        username: userData.username || '',
        fullName: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone_no || '',
        dateOfBirth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : '',
        points: userData.points || 0
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
                <ProfileField
                  label="Points"
                  value={formData.points}
                  isEditing={false} // Points are read-only
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit2 className="h-5 w-5 mr-2" />
              Edit
            </button>
          )}
        </div>
      </div>
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)}>Profile updated successfully!</Alert>
      )}
    </div>
  );
};

export default Account;

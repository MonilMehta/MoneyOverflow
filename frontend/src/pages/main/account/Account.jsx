import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, Cake, Edit2, Save, X, Calendar, User, Award, BookOpen, Bell } from 'lucide-react';
import { currentUser, updateDetails } from "../../../apis/user.api";

const Alert = ({ children, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50" role="alert">
      <div className="flex items-center justify-between">
        <span className="font-medium">{children}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, icon, isEditing, onChange, name, type = "text" }) => (
  <div className="flex flex-col space-y-3">
    <label className="text-base font-medium text-gray-700">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-[#ff5722]">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        className={`w-full pl-14 pr-5 py-4 rounded-xl border-2 bg-white text-gray-900 placeholder-gray-400 text-lg ${
          isEditing 
            ? 'border-[#ff5722] focus:border-[#e64a19] focus:ring-2 focus:ring-[#ff5722] focus:ring-opacity-20' 
            : 'border-gray-200'
        } focus:outline-none transition-all duration-200`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {type === "date" && isEditing && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#ff5722] cursor-pointer">
          <Calendar className="h-5 w-5" />
        </span>
      )}
    </div>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl p-6 border-2 border-[#ff5722] hover:shadow-lg transition-all duration-200">
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-[#ff5722] text-white">
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-base">{label}</p>
        <p className="text-gray-900 text-2xl font-bold">{value}</p>
      </div>
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
    phone_no: '',
    date_of_birth: '',
    points: 0,
    newsettler: 'No',
    courses: 0
  });

  const fetchCurrentUser = async () => {
    try {
      let accessToken = await document.cookie.split("accessToken=")[1]?.split(";")[0];
      const res = await axios.get(currentUser, { headers: { Authorization: `Bearer ${accessToken}` } });
      const userData = res?.data?.data;

      setFormData({
        username: userData.username || '',
        fullName: userData.fullName || '',
        email: userData.email || '',
        phone_no: userData.phone_no || '',
        date_of_birth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : '',
        points: userData.points || 0,
        newsettler: userData.isSubscribed === false ? "No" : "Yes",
        courses: userData.highestCompletedIndex + 1
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

  const handleSave = async () => {
    try {
      let accessToken = await document.cookie.split("accessToken=")[1]?.split(";")[0];
      const response = await axios.patch(updateDetails, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response);

      if (response.status === 200) {
        setShowAlert(true);  // Show success alert
      } else {
        // Handle error response
        console.error("Failed to update profile:", response);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsEditing(false);  // Disable editing mode after save
    }
  };

  return (
    <div className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden min-h-screen w-full">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Background Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="max-w-full mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 text-left px-8">
          <h2 className="text-7xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">My</span>
            <span className="block text-[#ff5722] italic">PROFILE</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 px-8">
          <StatCard 
            icon={<Award className="h-6 w-6" />}
            label="Points Earned"
            value={formData.points}
          />
          <StatCard 
            icon={<BookOpen className="h-6 w-6" />}
            label="Courses Completed"
            value={formData.courses}
          />
          <StatCard 
            icon={<Bell className="h-6 w-6" />}
            label="Newsletter"
            value={formData.newsettler}
          />
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-[24px] p-8 shadow-2xl border-4 border-[#ff5722] mb-12 relative overflow-hidden mx-8">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[24px] opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px'
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-4xl font-black text-[#000000] uppercase tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>
                Profile Information
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#ff5722] text-white px-6 py-3 rounded-xl text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  Edit Profile →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(formData).map(([key, value]) => (
                <ProfileField
                  key={key}
                  label={key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  value={value}
                  icon={
                    {
                      username: <User className="h-5 w-5" />,
                      fullName: <Edit2 className="h-5 w-5" />,
                      email: <Mail className="h-5 w-5" />,
                      phone_no: <Phone className="h-5 w-5" />,
                      date_of_birth: <Cake className="h-5 w-5" />
                    }[key]
                  }
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  name={key}
                  type={key === "email" ? "email" : key === "phone_no" ? "tel" : key === "date_of_birth" ? "date" : "text"}
                />
              ))}
            </div>

            {isEditing && (
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    fetchCurrentUser();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
                >
                  <X className="h-5 w-5" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#ff5722] text-white rounded-xl text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="h-5 w-5" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {showAlert && (
          <Alert onClose={() => setShowAlert(false)}>
            Profile updated successfully!
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Account;
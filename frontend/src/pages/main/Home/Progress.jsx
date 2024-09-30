import React from 'react';

export const Progress = ({ value, className }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-indigo-600 h-2 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

import React from 'react';

const Calendar = () => {
  const streakDays = 10; // Replace with dynamic data

  return (
    <div className="grid grid-cols-7 gap-2">
      {[...Array(30)].map((_, index) => (
        <div
          key={index}
          className={`h-8 w-8 rounded-full ${
            index < streakDays ? 'bg-green-500' : 'bg-gray-200'
          } transition-colors duration-300 ease-in-out`}
        />
      ))}
    </div>
  );
};

export default Calendar;

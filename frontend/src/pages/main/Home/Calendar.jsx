import React from 'react';

const Calendar = () => {
  const streakDays = 10; // Current streak
  const totalDays = 30; // Total days in the calendar
  const missedDays = [4, 7, 12]; // Days missed (can be dynamic)

  return (
    <div className="grid grid-cols-7 gap-2">
      {[...Array(totalDays)].map((_, index) => {
        const day = index + 1;
        const isMissed = missedDays.includes(day);
        const isStreak = day <= streakDays && !isMissed;

        return (
          <div
            key={index}
            className={`h-8 w-8 flex items-center justify-center rounded-full text-white font-bold ${
              isStreak ? 'bg-blue-500' : 'bg-gray-400'
            } transition-colors duration-300 ease-in-out`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;

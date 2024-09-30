import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const DailyProgressTracker = () => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // September
  const [currentYear, setCurrentYear] = useState(2024);
  const [timeLeft, setTimeLeft] = useState('');
  const [completedDays, setCompletedDays] = useState({});

  const currentDate = new Date(); // Today's actual date
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYearActual = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = endOfDay - now;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
    };

    updateTimeLeft(); // Initial call
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    } else {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < 11) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    } else {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    }
  };

  const toggleDayCompletion = (day) => {
    const isFuture = currentYear === currentYearActual && currentMonthIndex >= currentMonth && day > currentDay;
    if (!isFuture) {
      setCompletedDays(prev => ({
        ...prev,
        [`${currentYear}-${currentMonthIndex}-${day}`]: !prev[`${currentYear}-${currentMonthIndex}-${day}`]
      }));
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <div className="text-xl font-semibold mr-2">
            {currentMonthIndex === currentMonth && currentYear === currentYearActual ? `Day ${currentDay}` : ''}
          </div>
          <div className="bg-teal-600 text-black font-bold rounded-lg p-2">
            <span>{months[currentMonthIndex]}</span>
          </div>
        </div>
        <button onClick={handleNextMonth} className="text-gray-400 hover:text-white transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 bg-gray-800 p-3 rounded-lg">
        <Clock className="w-5 h-5 text-blue-400" />
        <span className="text-sm text-blue-400 ml-2">{timeLeft}</span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-gray-500 text-xs font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="h-8"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isFuture = currentYear === currentYearActual && currentMonthIndex >= currentMonth && day > currentDay;
          return (
            <div key={day} className="flex justify-center items-center h-8">
              {completedDays[`${currentYear}-${currentMonthIndex}-${day}`] && !isFuture ? (
                <CheckCircle2 
                  className="w-6 h-6 text-blue-500 cursor-pointer"
                  onClick={() => toggleDayCompletion(day)}
                />
              ) : (
                <div 
                  className={`w-6 h-6 flex items-center justify-center text-xs cursor-pointer ${isFuture ? 'text-gray-500 cursor-not-allowed' : ''}`}
                  onClick={() => toggleDayCompletion(day)}
                >
                  {day}
                  {isFuture && <span className="absolute mt-5 text-red-500 text-lg">•</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="font-bold text-lg mb-4">Ongoing Study Plan</h2>
        {/* Your study plan section */}
      </div>
    </div>
  );
};

export default DailyProgressTracker;

import React from 'react';

export const Avatar = ({ children }) => {
  return (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-white">
      {children}
    </div>
  );
};

export const AvatarFallback = ({ children }) => {
  return <span>{children}</span>;
};

import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="border-b p-4">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h3 className="text-lg font-bold">{children}</h3>;
};

import React from 'react';
import { Link } from "react-router-dom";

export default function RedirectPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link 
        to='/auth' 
        className="text-xl text-blue-500 border-2 border-blue-500 rounded-lg px-6 py-2 hover:bg-blue-500 hover:text-white transition duration-300"
      >
        Please Log in First!
      </Link>
    </div>
  );
}

import React from 'react';
import { BarChart, BookOpen, Users } from 'lucide-react';
import Image1 from '../../assets/Image1.jpg';
import Image2 from '../../assets/Image2.jpg';
import Image3 from '../../assets/Image3.jpg';

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id='section'>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 - Interactive Learning */}
        <div
          className="relative bg-white overflow-hidden shadow-md rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            height: '75vh',
            marginTop: '0vh',
            backgroundImage: `url(${Image1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50"></div>
        <div className="px-8 py-12 sm:p-14 relative z-10 flex flex-col justify-center items-center h-full">
          <div className="flex-shrink-0 bg-indigo-500 rounded-full p-5 mb-5">
            <Users className="h-12 w-12 text-white" />
          </div>
          <div className="w-full flex-1 text-center flex flex-col justify-center items-center">
            <dl className="w-full">
              <dt className="text-4xl font-bold text-white mb-2">
                Interactive Learning
              </dt>
              <dd className="text-lg font-medium text-white-300">
                Learn and grow with peers
              </dd>
            </dl>
          </div>
        </div>
        </div>

        {/* Card 2 - Comprehensive Curriculum */}
        <div
          className="relative bg-white overflow-hidden shadow-md rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            height: '75vh',
            marginTop: '10vh',
            backgroundImage: `url(${Image2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50"></div>
        <div className="px-8 py-12 sm:p-14 relative z-10 flex flex-col justify-center items-center h-full">
          <div className="flex-shrink-0 bg-indigo-500 rounded-full p-5 mb-5">
            <Users className="h-12 w-12 text-white" />
          </div>
          <div className="w-full flex-1 text-center flex flex-col justify-center items-center">
            <dl className="w-full">
              <dt className="text-4xl font-bold text-white mb-2">
                Comprehensive Curriculum
              </dt>
              <dd className="text-lg font-medium text-white-300">
                Learn and grow with peers
              </dd>
            </dl>
          </div>
        </div>
        </div>

        {/* Card 3 - Community Support */}
        <div
          className="relative bg-white overflow-hidden shadow-md rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            height: '75vh',
            marginTop: '20vh',
            backgroundImage: `url(${Image3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50"></div>
        <div className="px-8 py-12 sm:p-14 relative z-10 flex flex-col justify-center items-center h-full">
          <div className="flex-shrink-0 bg-indigo-500 rounded-full p-5 mb-5">
            <Users className="h-12 w-12 text-white" />
          </div>
          <div className="w-full flex-1 text-center flex flex-col justify-center items-center">
            <dl className="w-full">
              <dt className="text-4xl font-bold text-white mb-2">
                Community Support
              </dt>
              <dd className="text-lg font-medium text-white-300">
                Learn and grow with peers
              </dd>
            </dl>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

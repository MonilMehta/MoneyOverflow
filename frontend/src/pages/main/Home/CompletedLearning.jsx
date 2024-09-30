import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from './Card';

const CompletedLearningPaths = () => {
  const completedPaths = [
    { id: 1, title: "Budgeting Basics", modules: 5 },
    { id: 2, title: "Investing 101", modules: 7 },
    { id: 3, title: "Debt Management", modules: 4 },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-6xl font-extrabold mb-10 text-center">
        <span className="text-blue-600">Completed</span> Learning Paths ✅
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {completedPaths.map((path) => (
          <Card
            key={path.id}
            className="relative h-80 bg-gradient-to-br from-blue-100 to-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQelC6JgRyqL-uTC1CimDqcfLILAFKR8PN_HQ&s"
              alt="Learning Path Visual"
              className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 pointer-events-none"
            />
            <CardContent className="p-8 z-10 relative">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">{path.title}</h3>
                  <p className="text-lg text-gray-700">{path.modules} modules completed</p>
                </div>
                <CheckCircle className="text-green-500 h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CompletedLearningPaths;

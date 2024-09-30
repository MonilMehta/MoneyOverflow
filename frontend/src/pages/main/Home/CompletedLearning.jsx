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
      <h2 className="text-6xl font-bold mb-6"><span className='text-blue-600'>Completed</span> Learning Paths✅</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedPaths.map((path) => (
          <Card key={path.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
                  <p className="text-gray-600">{path.modules} modules completed</p>
                </div>
                <CheckCircle className="text-blue-500 h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CompletedLearningPaths;
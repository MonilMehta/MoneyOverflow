import React from 'react';
import { BookOpen, TrendingUp, Target, CheckCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import displayRazorPay from './razorpay';

const FinancialLiteracyPlans = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const plans = [
    {
      title: "Basic Learner",
      price: "Free",
      description: "Start your financial literacy journey",
      features: [
        "Access to foundational modules",
        "Basic budgeting tools",
        "Community forum access",
        "Weekly financial tips"
      ],
      icon: BookOpen
    },
    {
      title: "Smart Saver",
      price: 3000, // Price in INR (Rupees)
      description: "Enhance your financial knowledge",
      features: [
        "All Basic Learner features",
        "Advanced saving strategies",
        "Personalized learning path",
        "Monthly webinars with experts",
        "Investment basics course"
      ],
      icon: TrendingUp
    },
    {
      title: "Financial Master",
      price: 6000, // Price in INR (Rupees)
      description: "Comprehensive financial empowerment",
      features: [
        "All Smart Saver features",
        "AI-powered financial advisor",
        "Advanced investment simulations",
        "Retirement planning tools",
        "1-on-1 coaching sessions"
      ],
      icon: Target
    }
  ];

  // Handle the payment process
  const handlePayment = (plan) => {
    if (plan.price === "Free") {
      // Redirect to the main page for free plan
      navigate('/main'); // Redirect to http://localhost:3000/main
    } else {
      displayRazorPay(plan.price); // Pass the price directly in INR for Razorpay
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">Empower Your Financial Future</h1>
      <p className="text-center text-gray-600 mb-8">Choose the plan that fits your journey to financial literacy</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 bg-blue-50 rounded-t-lg">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-blue-800">{plan.title}</h2>
                <plan.icon className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-3xl font-bold mb-4 text-blue-700">
                {plan.price === "Free" ? plan.price : `₹${plan.price}`} {/* Display price in INR */}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                onClick={() => handlePayment(plan)} // Call the handlePayment function when clicked
              >
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Join our community of financially empowered individuals</p>
        <div className="flex items-center justify-center text-blue-600">
          <Users className="h-5 w-5 mr-2" />
          <span className="font-semibold">10,000+ active learners</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialLiteracyPlans;

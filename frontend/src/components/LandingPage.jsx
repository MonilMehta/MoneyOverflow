import React, { useState } from 'react';
import { BarChart, DollarSign, BookOpen, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: "John Doe", text: "MoneyOverflow changed my financial life. I've never felt more in control of my finances!" },
    { name: "Jane Smith", text: "The courses are so easy to understand. I finally feel confident about investing." },
    { name: "Mike Johnson", text: "Thanks to MoneyOverflow, I've paid off my debts and started saving for retirement." },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <DollarSign className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">MoneyOverflow</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Courses
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Resources
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Master Your Finances with</span>
            <span className="block text-indigo-600">MoneyOverflow</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our community and gain the knowledge and skills you need to make smarter financial decisions. Start your journey to financial literacy today!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get Started
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Boxes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Interactive Learning
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Engaging modules and quizzes
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Comprehensive Curriculum
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Cover all aspects of personal finance
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Community Support
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Learn and grow with peers
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((blog) => (
            <div key={blog} className="bg-white overflow-hidden shadow-lg rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={`/api/placeholder/32/32`} alt="Author" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime="2024-03-16">Mar 16, 2024</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>6 min read</span>
                    </div>
                  </div>
                </div>
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">Boost Your Savings: 10 Simple Strategies</p>
                  <p className="mt-3 text-base text-gray-500">Learn how to increase your savings with these easy-to-implement strategies. Start building your financial future today!</p>
                </a>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="inline-flex items-center px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      Savings
                    </a>
                  </div>
                  <div className="ml-3">
                    <a href="#" className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                      Read full story
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Experience Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">What Our Users Say</h2>
        <div className="relative bg-indigo-600 rounded-lg shadow-xl p-8">
          <div className="text-white text-center">
            <p className="text-xl italic mb-4">"{testimonials[currentTestimonial].text}"</p>
            <p className="font-semibold">- {testimonials[currentTestimonial].name}</p>
          </div>
          <button onClick={prevTestimonial} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-indigo-600 hover:bg-indigo-100">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={nextTestimonial} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-indigo-600 hover:bg-indigo-100">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { question: "What is MoneyOverflow?", answer: "MoneyOverflow is a comprehensive financial literacy platform designed to help individuals make smarter financial decisions through interactive learning modules, expert resources, and community support." },
            { question: "Is MoneyOverflow suitable for beginners?", answer: "Absolutely! MoneyOverflow caters to all levels of financial knowledge, from complete beginners to those looking to refine their skills." },
            { question: "How much does it cost to use MoneyOverflow?", answer: "We offer a range of pricing options, including a free tier with basic features. Check our pricing page for more details on our premium plans." },
          ].map((faq, index) => (
            <div key={index} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{faq.question}</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
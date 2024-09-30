import React from 'react'

const Blog = () => {
  return (
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
                <a href="#section" className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">Boost Your Savings: 10 Simple Strategies</p>
                  <p className="mt-3 text-base text-gray-500">Learn how to increase your savings with these easy-to-implement strategies. Start building your financial future today!</p>
                </a>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href="#section" className="inline-flex items-center px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      Savings
                    </a>
                  </div>
                  <div className="ml-3">
                    <a href="#section" className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                      Read full story
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

  )
}

export default Blog

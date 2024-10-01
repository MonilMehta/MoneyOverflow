import React, { useEffect, useState } from "react";
import { getBlogs } from "../../apis/blogs.api"
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(getBlogs);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data.slice(0, 3));
        setRender(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <>
      {render && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Latest from Our Blog
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs && blogs.map((blog, index) => (
              <div
                key={blog._id}
                className="bg-white overflow-hidden shadow-lg rounded-lg"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={blog.imageUrl}
                        alt="Author"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {index == 1? "Akash Sharma" : index == 2? "Sayush Shah" : "Dyanesh Solanki"}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime="2024-03-16">{index == 1? "Sep 16," : index == 2? "Sep 12," : "Sep 21,"} 2024</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{index == 1? "3" : index == 2? "5" : "6"} min read</span>
                      </div>
                    </div>
                  </div>
                  <a href="#section" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {blog.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {blog.description.substring(0,150)}...
                    </p>
                  </a>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a
                        href="#section"
                        className="inline-flex items-center px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-800"
                      >
                        Savings
                      </a>
                    </div>
                    <div className="ml-3">
                      <Link to={`/main/blogs/${blog._id}`}
                        href="#section"
                        className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Read full story
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;

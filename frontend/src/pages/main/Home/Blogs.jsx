import React, { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { getBlogs } from "../../../apis/blogs.api";
import { Link } from "react-router-dom";

const Blogs = () => {
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
        setBlogs(data.slice(0,2));
        setRender(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="mb-12">
      {render && (
        <>
          <h2 className="text-6xl font-bold mb-10 text-center">
            Latest <span className="text-blue-600">Case Studies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                className="bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-3xl overflow-hidden"
              >
                <Link to={`/main/blogs/${blog._id}`}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-2 h-4 w-4" />
                        {blog.createdAt.split("T")[0]}
                      </div>
                      <span className="text-sm text-gray-500">
                        {/* By {blog.author} */}
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to='/main/blogs' className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-4 rounded-full shadow-lg flex items-center w-fit">
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Blogs;

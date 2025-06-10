import React, { useState, useEffect } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import { getBlogs } from "../../../apis/blogs.api";
import blogs1 from "../../../assets/blogs1.gif";

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(getBlogs);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    setTimeout(() =>{
      setLoading(false);
    }, 3000)
  });

  if (error) return <p className="text-blue-600">{error}</p>;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800">
      {loading? <img src={blogs1} className="w-[45%] text-center mx-auto max-h-screen"/> :
        <div className="blogfull">
          <article>
            <section id="blog" className="blog-area pt-24">
              <div className="container mx-auto px-4">
                <div className="flex justify-between">
                  <div className="section-title pb-4">
                    <div className="line"></div>
                    <h3 className="title text-4xl font-bold pl-8 text-white ">
                      <span>Case Study Posts</span>
                      <div className="border-4 mt-8 w-64 rounded-full"></div>
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start">
                  {blogs.map((blog, index) => (
                    <div
                      key={index}
                      className="col-lg-4 col-md-7 w-full md:w-1/2 lg:w-1/3 p-4"
                    >
                      <div className="bg-white single-blog mt-8 transition-transform transform hover:-translate-y-5 hover:border-blue-500 hover:shadow-lg rounded-xl p-5 border border-gray-200 shadow-md">
                        <div className="blog-image mb-5 flex justify-center">
                          <div>
                            <img
                              src={blog.imageUrl || "assets/images/default.jpg"} // Fallback to default image
                              alt={blog.title}
                              className="rounded-lg h-40 w-full object-cover shadow-md"
                            />
                          </div>
                        </div>
                        <div className="blog-content">
                          <div>
                            <p className="reviewtext text-lg font-medium text-gray-800 leading-relaxed overflow-hidden overflow-ellipsis line-clamp-3 mb-4">
                              {blog.title}
                            </p>
                          </div>
                          <Link
                            to={`/main/blogs/${blog._id}`}
                            className="more text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-2 inline-block rounded-lg transition duration-300 ease-in-out border border-blue-600"
                          >
                            Learn More <i className="lni-chevron-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </article>
        </div>
      }
    </div>
  );
};
export default BlogPosts;

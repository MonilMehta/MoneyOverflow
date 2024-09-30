import React, { useState, useEffect } from "react";
import "./Blog.css";

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/blog/getBlogs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="blogfull">
        <article>
          <section id="blog" className="blog-area pt-24">
            <div className="container mx-auto px-4">
              <div className="flex justify-between">
                <div className="section-title pb-9">
                  <div className="line"></div>
                  <h3 className="title text-2xl font-bold">
                    <span></span> Blog Posts
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap justify-start">
                {blogs.map((blog, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-7 w-full md:w-1/2 lg:w-1/3 p-4"
                  >
                    <div className="bg-white single-blog mt-8 transition-transform transform hover:-translate-y-5 hover:border-orange-500 hover:shadow-lg rounded-xl p-5 border border-gray-200 shadow-md">
                      <div className="blog-image mb-5 flex justify-center">
                        <a href={blog.link}>
                          <img
                            src={blog.imageUrl || "assets/images/default.jpg"} // Fallback to default image
                            alt={blog.title}
                            className="rounded-lg h-40 w-full object-cover shadow-md"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <a href={blog.link}>
                          <p className="reviewtext text-lg font-medium text-gray-800 leading-relaxed overflow-hidden overflow-ellipsis line-clamp-3 mb-4">
                            {blog.title}
                          </p>
                        </a>
                        <a
                          href={blog.link}
                          className="more text-red-600 hover:bg-orange-500 hover:text-white px-4 py-2 inline-block rounded-lg transition duration-300 ease-in-out"
                        >
                          Learn More <i className="lni-chevron-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default BlogPosts;

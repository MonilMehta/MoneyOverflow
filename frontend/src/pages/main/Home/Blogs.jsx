import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Button } from './Button';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Steps to Financial Freedom",
      excerpt: "Discover the key steps to achieve financial independence and secure your future.",
      author: "Jane Doe",
      readTime: "8 min read",
      image: "https://media.licdn.com/dms/image/D4D12AQFR5DZoHHPX9Q/article-cover_image-shrink_720_1280/0/1702350432200?e=2147483647&v=beta&t=VtnDC4E0NX2gQrJ2o-QCCZpYnzuSTluCwiJPpaiuysg"
    },
    {
      id: 2,
      title: "Investing for Beginners: Where to Start",
      excerpt: "Learn the basics of investing and how to build a strong investment portfolio from scratch.",
      author: "John Smith",
      readTime: "10 min read",
      image: "https://img.freepik.com/free-vector/illustration-financial-concept_53876-20606.jpg"
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-6xl font-bold mb-6">Latest <span className='text-blue-600'>Case Studies</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <Card key={blog.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {blog.readTime}
                </div>
                <span className="text-sm text-gray-500">By {blog.author}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button className="bg-blue-400 hover:bg-blue-700 flex">
          View All Posts
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Blogs;
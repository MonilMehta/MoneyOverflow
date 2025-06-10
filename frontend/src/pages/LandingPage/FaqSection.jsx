import React from 'react';
import FAQItem from './FaqItem';

const FAQSection = () => {
  const faqs = [
    { question: "What is MoneyOverflow?", answer: "MoneyOverflow is a comprehensive financial literacy platform designed to help individuals make smarter financial decisions through interactive learning modules, expert resources, and community support." },
    { question: "Is MoneyOverflow suitable for beginners?", answer: "Absolutely! MoneyOverflow caters to all levels of financial knowledge, from complete beginners to those looking to refine their skills." },
    { question: "How much does it cost to use MoneyOverflow?", answer: "We offer a range of pricing options, including a free tier with basic features. Check our pricing page for more details on our premium plans." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ height: '100vh' }}>
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
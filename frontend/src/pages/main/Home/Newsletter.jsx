import React, { useState } from 'react';
import axios from 'axios';
import displayRazorPay from './razorpay';
import { subscribe } from '../../../apis/user.api';
import SuccessGif from '../../../assets/payment.gif';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePayment = async () => {
    try {
      // await displayRazorPay(59);
      // Simulate payment success for demo
      setTimeout(() => {
        setPaymentSuccess(true);
        handleSubscription();
      }, 1000);
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  const handleSubscription = async () => {
    try {
      const response = await axios.post(subscribe, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Simulate successful subscription for demo
      setTimeout(() => {
        setSubscriptionSuccess(true);
      }, 500);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    }
  };

  return (
    <div className="bg-[#f6f6f6] py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden min-h-screen flex items-center">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="w-full relative z-10">
        {paymentSuccess ? (
          // Success State
          <div className="text-center">
            <div className="bg-white rounded-[24px] p-12 shadow-2xl border-4 border-[#ff5722] max-w-2xl mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="text-4xl">✅</div>
              </div>
              <h2 className="text-4xl font-black text-[#ff5722] mb-4 uppercase tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>
                Payment Successful!
              </h2>
              {subscriptionSuccess && (
                <p className="text-xl text-gray-700 font-medium">
                  Subscription confirmed! Check your email for details.
                </p>
              )}
              <div className="mt-8 flex justify-center">
                <div className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold">
                  Welcome to the community!
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Main Newsletter Form
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8 pl-8">
              <div>
                <h1 className="text-7xl font-black tracking-tight text-[#000000] leading-tight mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <span className="block italic">Daily</span>
                  <span className="block text-[#ff5722] italic">INSIGHTS</span>
                </h1>
                <p className="text-2xl text-gray-700 font-medium leading-relaxed max-w-xl">
                  Get exclusive tips & tricks to optimize your financial flow. 
                  Join 50K+ subscribers who trust our daily insights.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold">
                  Only ₹59/month
                </div>
                <div className="text-3xl font-black text-[#ff5722]">*</div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ff5722] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Daily market insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ff5722] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Exclusive financial tips</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ff5722] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Expert analysis & trends</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="relative pr-8">
              <div 
                className="bg-white rounded-[24px] p-12 shadow-2xl border-4 border-[#ff5722] relative overflow-hidden"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[24px] opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px'
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-[#000000] mb-2 uppercase tracking-wide">
                    Subscribe Now
                  </h3>
                  <p className="text-gray-600 mb-8 font-medium">
                    Join thousands of smart investors
                  </p>

                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg font-medium focus:border-[#ff5722] focus:outline-none transition-colors"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      />
                    </div>

                    <button 
                      onClick={handlePayment}
                      className="w-full bg-[#ff5722] text-white px-8 py-4 rounded-xl text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-[#ff5722]"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Subscribe for ₹59/month →
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Cancel anytime • Secure payment • No hidden fees
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 opacity-20">
                  <div className="w-12 h-12 border-4 border-[#ff5722] rounded-full"></div>
                </div>
                <div className="absolute bottom-6 left-6 opacity-20">
                  <div className="w-8 h-8 bg-[#ff5722] rounded-full"></div>
                </div>
              </div>

              {/* Additional decorative card behind */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-[#e8ddd4] rounded-[24px] -z-10 border-2 border-[#d7c4b0]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
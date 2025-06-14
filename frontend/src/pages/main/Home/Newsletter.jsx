import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animation state first
            setIsVisible(false);
            // Small delay to ensure reset, then trigger animation
            setTimeout(() => {
              setIsVisible(true);
            }, 50);
          } else {
            // Reset when component leaves viewport
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of component is visible
        rootMargin: '50px 0px -50px 0px' // Start animation slightly before/after entering viewport
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePayment = async () => {
    try {
      // Simulate payment process
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setPaymentSuccess(true);
        handleSubscription();
      }, 2000);
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  const handleSubscription = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setSubscriptionSuccess(true);
      }, 1000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    }
  };

  return (
    <div 
      ref={componentRef}
      className="bg-[#f6f6f6] py-8 md:py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Dotted Grid Background with fade-in */}
      <div 
        className={`absolute inset-0 opacity-20 transition-opacity duration-1000 ease-out ${
          isVisible ? 'opacity-20' : 'opacity-0'
        }`}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines with fade-in */}
      <div 
        className={`absolute inset-0 opacity-10 transition-opacity duration-1200 ease-out ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines with fade-in */}
      <div 
        className={`absolute inset-0 opacity-10 transition-opacity duration-1400 ease-out ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="w-full relative z-10 max-w-7xl mx-auto">
        {paymentSuccess ? (
          // Success State with animations
          <div 
            className={`text-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="bg-white rounded-[24px] p-6 md:p-12 shadow-2xl border-4 border-[#ff5722] max-w-2xl mx-auto">
              <div 
                className={`w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 rounded-full bg-green-100 flex items-center justify-center transition-all duration-800 delay-200 ease-out ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-600" />
              </div>
              <h2 
                className={`text-2xl md:text-4xl font-black text-[#ff5722] mb-4 uppercase tracking-wide transition-all duration-1000 delay-400 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Payment Successful!
              </h2>
              {subscriptionSuccess && (
                <p 
                  className={`text-lg md:text-xl text-gray-700 font-medium transition-all duration-1000 delay-600 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Subscription confirmed! Check your email for details.
                </p>
              )}
              <div 
                className={`mt-6 md:mt-8 flex justify-center transition-all duration-1000 delay-800 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-bold">
                  Welcome to the community!
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Main Newsletter Form with responsive grid
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div 
              className={`space-y-6 md:space-y-8 px-2 md:pl-8 order-2 lg:order-1 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div>
                <h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#000000] leading-tight mb-4 md:mb-6 text-center lg:text-left" 
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <span 
                    className={`block italic transition-all duration-800 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    Daily
                  </span>
                  <span 
                    className={`block text-[#ff5722] italic transition-all duration-1000 delay-200 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  >
                    INSIGHTS
                  </span>
                </h1>
                <p 
                  className={`text-lg md:text-2xl text-gray-700 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left transition-all duration-1200 delay-400 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Get exclusive tips & tricks to optimize your financial flow. 
                  Join 50K+ subscribers who trust our daily insights.
                </p>
              </div>
              
              <div 
                className={`flex items-center justify-center lg:justify-start gap-4 transition-all duration-1000 delay-600 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-bold">
                  Only ₹59/month
                </div>
                <div className="text-2xl md:text-3xl font-black text-[#ff5722]">*</div>
              </div>

              {/* Features */}
              <div 
                className={`space-y-3 transition-all duration-1000 delay-800 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {[
                  'Daily market insights',
                  'Exclusive financial tips',
                  'Expert analysis & trends'
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-center lg:justify-start gap-3 transition-all duration-800 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${1000 + index * 150}ms` }}
                  >
                    <div className="w-2 h-2 bg-[#ff5722] rounded-full"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div 
              className={`relative px-2 md:pr-8 order-1 lg:order-2 transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
              }`}
            >
              <div 
                className="bg-white rounded-[24px] p-6 md:p-12 shadow-2xl border-4 border-[#ff5722] relative overflow-hidden"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {/* Background Pattern */}
                <div 
                  className={`absolute top-0 left-0 w-full h-full pointer-events-none rounded-[24px] opacity-5 transition-opacity duration-1500 ease-out ${
                    isVisible ? 'opacity-5' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: '1200ms' }}
                >
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
                  <h3 
                    className={`text-2xl md:text-3xl font-black text-[#000000] mb-2 uppercase tracking-wide text-center transition-all duration-800 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
                    style={{ transitionDelay: '800ms' }}
                  >
                    Subscribe Now
                  </h3>
                  <p 
                    className={`text-gray-600 mb-6 md:mb-8 font-medium text-center transition-all duration-800 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '1000ms' }}
                  >
                    Join thousands of smart investors
                  </p>

                  <div className="space-y-4 md:space-y-6">
                    <div 
                      className={`relative transition-all duration-800 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: '1200ms' }}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-300 rounded-xl text-base md:text-lg font-medium focus:border-[#ff5722] focus:outline-none transition-colors"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      />
                    </div>

                    <button 
                      onClick={handlePayment}
                      className={`w-full bg-[#ff5722] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-[#ff5722] ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                      }`}
                      style={{ 
                        fontFamily: 'Arial, sans-serif',
                        transitionDelay: '1400ms'
                      }}
                    >
                      Subscribe for ₹59/month →
                    </button>

                    <div 
                      className={`text-center transition-all duration-800 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: '1600ms' }}
                    >
                      <p className="text-sm text-gray-500">
                        Cancel anytime • Secure payment • No hidden fees
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div 
                  className={`absolute top-4 md:top-6 right-4 md:right-6 opacity-20 transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ transitionDelay: '1800ms' }}
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-[#ff5722] rounded-full"></div>
                </div>
                <div 
                  className={`absolute bottom-4 md:bottom-6 left-4 md:left-6 opacity-20 transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ transitionDelay: '2000ms' }}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#ff5722] rounded-full"></div>
                </div>
              </div>

              {/* Additional decorative card behind */}
              <div 
                className={`absolute -top-2 md:-top-4 -right-2 md:-right-4 w-full h-full bg-[#e8ddd4] rounded-[24px] -z-10 border-2 border-[#d7c4b0] transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: '600ms' }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Success Component */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl text-center max-w-sm w-full animate-pulse">
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 md:w-24 md:h-24 text-green-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-green-600">Processing Payment...</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
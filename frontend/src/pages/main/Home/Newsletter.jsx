import React, { useState } from 'react';
import displayRazorPay from './razorpay';
import PaymentGif from '../../../assets/payment.gif';

const Newsletter = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      await displayRazorPay(59); // Trigger Razorpay payment for ₹59
      setPaymentSuccess(true);   // Set payment success flag
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <div className='w-full py-16 text-white bg-blue-600 px-4' style={{ borderRadius: '30px' }}>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Subscribe to our daily newsletter for just ₹59/Month!
          </h1>
          <p>Stay updated with our latest tips & tricks to optimize your flow.</p>
        </div>
        <div className='my-4'>
          {paymentSuccess ? (
            <div className='flex items-center justify-center'>
              <img src={PaymentGif} alt="Payment Successful" className='w-32 h-32' />
            </div>
          ) : (
            <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
              <input
                className='p-3 flex w-full rounded-md text-black'
                type='email'
                placeholder='Enter Email'
              />
              <button
                className='bg-white text-blue-600 rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'
                onClick={handlePayment}
              >
                Subscribe Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
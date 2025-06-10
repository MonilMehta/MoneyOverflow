import React, { useState } from 'react';
import axios from 'axios';
import displayRazorPay from './razorpay'; // Import the function to handle payment
import { subscribe } from '../../../apis/user.api';
import SuccessGif from '../../../assets/payment.gif';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle the payment process and subscription
  const handlePayment = async () => {
    try {
      // Assuming displayRazorPay() handles payment logic
      await displayRazorPay(59); // Assuming payment is ₹59
      setPaymentSuccess(true);
      
      // Call the handleSubscription function after successful payment
      await handleSubscription();
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  // Function to handle subscription
  const handleSubscription = async () => {
    try {
      const response = await axios.post(subscribe, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });

      if (response.status === 200) {
        setSubscriptionSuccess(true);
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <div className="newsletter-text">
          <h1>Subscribe to our daily newsletter for just ₹59/month</h1>
          <p>Get exclusive tips & tricks to optimize your flow.</p>
        </div>
        <div className="newsletter-form">
          {paymentSuccess ? (
            <div className="success-message">
              <img src={SuccessGif} alt="Payment Successful" className="success-gif" />
              {subscriptionSuccess && <p>Subscription successful! Confirmation email sent.</p>}
            </div>
          ) : (
            <div className="form-content">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                className="email-input"
              />
              <button onClick={handlePayment} className="subscribe-button">
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
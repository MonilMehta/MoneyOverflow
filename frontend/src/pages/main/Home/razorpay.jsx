export const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
  
      script.onload = () => {
        resolve(true);
      };
  
      script.onerror = () => {
        reject(new Error('Failed to load script'));
      };
  
      document.body.appendChild(script);
    });
  };
  
  const displayRazorPay = async (amount) => {
    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
      if (!res) {
        alert('You are offline... Failed to load Razorpay SDK');
        return;
      }
  
      const options = {
        key: 'rzp_test_DwptmlE6gLwR5G', // Replace with your Razorpay API key
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        image: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Handle payment success here
        },
        prefill: {
          name: 'Your Name',
          email: 'your-email@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Your Company Address',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error loading Razorpay script:', error);
      alert('Failed to load Razorpay SDK. Please try again later.');
    }
  };
  
  export default displayRazorPay;
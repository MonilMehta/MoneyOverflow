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
  
  export const displayRazorPay = async (amount, email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
        if (!res) {
          reject(new Error('You are offline... Failed to load Razorpay SDK'));
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
            // Payment successful
            resolve(response);
          },
          modal: {
            ondismiss: function() {
              reject(new Error('Payment cancelled'));
            }
          },
          prefill: {
            email: email || '',
          },
          theme: {
            color: '#ff5722',
          },
        };
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error('Error in Razorpay:', error);
        reject(error);
      }
    });
  };
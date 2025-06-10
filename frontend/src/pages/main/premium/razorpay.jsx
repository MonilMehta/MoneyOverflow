const loadScript =(src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src=src
  
      script.onload=()=>{
        resolve(true)
  
      }
  
      script.onerror=()=>{
        resolve(false)
      }
  
      document.body.appendChild(script)
    })
  }
  
  const displayRazorPay=async (amount)=>{
    const res = await loadScript("http://checkout.razorpay.com/v1/checkout.js")
    
    if(!res)
    {
      alert("you are   offline..  Failed to load Razorpay SDK")
      return 
    }
  
    const options={
      key:"rzp_test_DwptmlE6gLwR5G",
      currency:"INR",
      amount:amount*100,
      name:"Transaction",
      description:"Thanks for donating!!",
  
      handler: function (response){
        alert(response.razorpay_payment_id)
  
        alert("Payment successful")
      },
      prefill:{
        name: "Razorpay"
      }
  
     // if(response.razorpay_payment_id)
    };
  
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

export default displayRazorPay
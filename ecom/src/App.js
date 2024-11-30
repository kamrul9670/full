import React, { useState } from 'react';
import './App.css';
import sareeImage from './Saree.jpeg';

function App() {
  const [paymentUrl, setPaymentUrl] = useState(null);

  const initiatePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
        window.open(data.paymentUrl, '_blank'); // Open payment link in a new tab
      } else {
        alert('Failed to retrieve payment URL.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred while initiating payment.');
    }
  };

  return (
    <div className="App">
      <div className="product">
        {/* Product Image */}
        <img src={sareeImage} alt="Saree" className="product-image" />

        {/* Product Price */}
        <p className="product-price">Price: ₹1000</p>

        {/* Buy Now Button */}
        <button className="buy-now-button" onClick={initiatePayment}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default App;

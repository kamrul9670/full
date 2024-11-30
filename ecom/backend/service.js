const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Instamojo = require('instamojo-nodejs');

const app = express();

// Instamojo API Keys
const API_KEY = 'a7bd295fdeb08a8af8420df1fc89e190';
const AUTH_TOKEN = '4254c9851b93f1b82fd8de20be7a9e94';

Instamojo.setKeys(API_KEY, AUTH_TOKEN);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to create payment link
app.post('/create-payment', (req, res) => {
  const paymentDetails = {
    purpose: 'Saree Purchase',
    amount: '1000',
    buyer_name: 'Kamrul Hasan', // Replace with dynamic buyer name if needed
    email: 'Kamrul9670@gmail.com', // Replace with dynamic email if needed
    phone: '8707040113', // Replace with dynamic phone number if needed
    redirect_url: 'http://localhost:3000/payment-success', // Update with your React app's success page URL
    webhook_url: 'http://localhost:5000/webhook', // Optional webhook URL to receive updates
  };

  Instamojo.createPayment(paymentDetails, (error, response) => {
    if (error) {
      console.error('Error creating payment:', error);
      return res.status(500).json({ message: 'Error initiating payment' });
    } else {
      try {
        const responseData = JSON.parse(response);
        if (responseData.success) {
          res.json({ paymentUrl: responseData.payment_request.longurl });
        } else {
          res.status(400).json({ message: 'Failed to create payment link' });
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        res.status(500).json({ message: 'Error parsing payment response' });
      }
    }
  });
});

// Webhook endpoint (optional)
app.post('/webhook', (req, res) => {
  console.log('Webhook data received:', req.body);
  res.status(200).send('Webhook received');
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

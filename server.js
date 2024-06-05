const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('LLAVE SECRETA AQUI'); // llave secreta va aqui

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas

app.use(bodyParser.json());

app.post('/api/payment', async (req, res) => {
  const { token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: 5000, // El monto en centavos 50 psos
      currency: 'mxn',
      source: token,
      description: 'Test Charge'
    });
    res.send({ success: true, charge });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ success: false, error });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

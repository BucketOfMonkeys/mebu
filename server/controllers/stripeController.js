require('dotenv').config();

const secretKey = process.env.STRIPE_KEY;
const stripe = require('stripe')(secretKey);

const stripeCharge = (req, res) => {
  const db = req.app.get('db');
  stripe.charges.create(
    {
      amount: req.body.amount,
      currency: 'usd',
      source: req.body.stripeToken,
    },
    (error, charge) => {
      if (error) {
        return res.status(200).json({charged: false, charge: '', error: `${error}`});
      }
      return db
        .billing_update([req.body.billid])
        .then(response => res.status(200).json({charged: true, charge}))
        .catch(err => console.log(err));
    },
  );
};

module.exports = {
  stripeCharge,
};

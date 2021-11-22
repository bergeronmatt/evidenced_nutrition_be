const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SK);

app.post("/", async (req, res) => {
  let {amount, id, customer} = req.body;

  let fee = amount * .05;

  console.log('customer id: ', req.body);

  try {
    const intent = await stripe.paymentIntents.create({
      confirmation_method: 'manual',
      payment_method_types: ["card"],
      amount: amount,
      description: 'Connect Payment Test',
      payment_method: id,
      customer: customer,
      confirm: true,
      currency: "usd",
      application_fee_amount: fee,
      transfer_data: {
        destination: "acct_1JwqDM2fkuPJ5VOo",
      }
    });
    res.json({
      message: 'Payment Created.',
      intent,
      success: true,
  });
  console.log('payment created: ', intent);
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Connect Payment Failure",
      success: false,
    });
  }
});

module.exports = app;

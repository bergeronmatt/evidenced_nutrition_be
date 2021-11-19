const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SK);

app.post("/", async (req, res) => {
  // TODO: change this to take in the req body from applicants/self filled intake forms
  // when it's front end ready
  let {amount, id} = req.body;

  let fee = amount * .05;

  try {
    const intent = await stripe.paymentIntents.create({
      confirmation_method: 'manual',
      payment_method_types: ["card"],
      amount: amount,
      description: 'Connect Payment Test',
      payment_method: id,
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

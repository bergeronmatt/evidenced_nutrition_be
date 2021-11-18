const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SK);

app.post("/", async (req, res) => {
//   let { card_payments, transfers } = req.body;

  res.json({
    message: "update hit",
    req_body: req.body,
  });

//   try {
//     const account = await stripe.accounts.update("acct_1JwqDM2fkuPJ5VOo", {
//       capabilities: {
//         card_payments: card_payments,
//         transfers: transfers, 
//       },
//     });
//     res.json({ message: "update complete" });
//   } catch (err) {
//     console.log("could not update the account", err);
//   }
});

module.exports = app;

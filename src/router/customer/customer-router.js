const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SK);

app.use(express.json());


app.post('/', async (req, res) => {
    let {
        address,
        email,
        name,
        phone,
        shipping
    } = req.body;

    try {
        const customer = await stripe.customers.create({
            address,
            email,
            name,
            phone,
            shipping,
        });
        res.json({'customer': customer, success: true,
    });
    } catch (err) {
        console.log('Customer Creation error', err)
    }
});

module.exports = app;
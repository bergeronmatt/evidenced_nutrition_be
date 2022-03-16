const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

const authRouter = require('./auth');
const checkoutRouter = require('../router/checkout/checkout-router');
const accountRouter = require('../router/connect/account-router');
const customerRouter = require('../router/customer/customer-router');

server.get('/api', (req, res) => {
    res.status(200).json({message: 'The api is up and running.'});
});

// End Points
server.use('/api/auth', authRouter);
server.use('/api/checkout', checkoutRouter);
server.use('/api/update', accountRouter);
server.use('/api/customers', customerRouter);



module.exports = server;
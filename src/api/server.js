const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

const authRouter = require('./auth');

server.get('/api', (req, res) => {
    res.status(200).json({message: 'The api is up and running.'});
});

// End Points
server.use('/api/auth', authRouter);

module.exports = server;
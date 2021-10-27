const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

const auth = require('./auth')

server.get('/api', (req, res) => {
    res.status(200).json({message: 'The api is up and running.'});
});

// End Points
server.use('/api/auth', auth);

module.exports = server;
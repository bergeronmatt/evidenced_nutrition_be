// set up dotenv to manage .env 
require('dotenv').config();

// set up the server object
const server = require('./src/api/server');
const cors = require('cors')

server.use(cors({
    origin: "https://evidenced-nutrition.vercel.app/",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
}));

// set up the env port and backup port
const port = process.env.PORT || 5000;

// listen to the server
server.listen(port, () => {
    console.log(`=== SERVER IS RUNNING ON PORT ${port} ===`)
})
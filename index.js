// set up dotenv to manage .env 
require('dotenv').config();

// set up the server object
const server = require('./src/api/server');

const cors = require("cors");

server.use(cors())

// set up the env port and backup port
const port = process.env.PORT || 8080;

// listen to the server
server.listen(port, () => {
    console.log(`=== SERVER IS RUNNING ON PORT ${port} ===`)
})
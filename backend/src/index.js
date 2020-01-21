const http = require('http');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes')
const mongoConnection = require('./database')

const { setupWebsocket } = require ('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(mongoConnection, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(3333, () => {
    console.log("Server Listening at 3333");
});
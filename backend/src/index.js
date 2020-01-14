const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes')
const mongoConnection = require('./mongoConnectionString')

const app = express();


mongoose.connect(mongoConnection, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("Server Listening at 3333");
});
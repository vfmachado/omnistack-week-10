const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const routes = require('./routes')
const mongoConnection = require('./database')

const app = express();


mongoose.connect(mongoConnection, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("Server Listening at 3333");
});
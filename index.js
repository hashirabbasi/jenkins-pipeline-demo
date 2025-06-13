
const express = require('express');
const app = express();


require('dotenv').config();



app.get('/', (req, res) => res.send('Hello World!'));
console.log("Running on port", process.env.PORT);
console.log("Current environment:", process.env.ENV);




module.exports = app;



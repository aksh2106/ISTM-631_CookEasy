const functions = require('firebase-functions');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  
  res.sendFile(__dirname + '/public/home.html');

});

exports.app = functions.https.onRequest(app);
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const createExpressApp = require('./create-express-app');

require('dotenv').config();
const uri = process.env.DB_CONN;
let database;

MongoClient.connect(uri, (err, client) => {
  console.log('.:: connected to mongodb ::.');
  const db = client.db('nps-app');
  createExpressApp(db)
    .listen(3000, () => {
      database = db;
      console.log('.:: listening on port 3000 ::.');
    });
  // perform actions on the collection object
  // client.close();
});

  

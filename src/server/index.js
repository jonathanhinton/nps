require('dotenv').configure();
const express = require('express');

const { MongoClient } = require('mongodb');
const uri = process.env.DB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const database = client.db("nps-app");
  // perform actions on the collection object
  client.close();
});

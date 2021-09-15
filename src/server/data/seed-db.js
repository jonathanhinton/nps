require('dotenv').config();

// const parks = require('./parks');
const users = require('./users');
// const badges = require('./badges');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

function seedCollection(collectionName, initialRecords) {
    MongoClient.connect(process.env.DB_URI, (err, client) => {
        console.log('connected to mongodb... ');

        var db = client.db('nps-app');
        const collection = db.collection(collectionName);

        collection.deleteMany({});

        initialRecords.forEach((item) => {
            if (item.password) {
                item.password = bcrypt.hashSync(item.password, 10);
            }
        });

        collection.insertMany(initialRecords, (err, result) => {
            console.log(`${result.insertedCount} records inserted.`);
            console.log('closing connection...');
            client.close();
            console.log('done.');
        });
    });
}

seedCollection('users', users);
// seedCollection('parks', parks);
// seedCollection('badges', badges);
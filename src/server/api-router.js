const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');
const ObjectId = require('mongodb').ObjectId;

function apiRouter(database) {
    const router = express.Router();

    // AUTH SECURITY
    router.use(
        checkJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: '/api/authenticate'})
    );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({ error: err.message });
        }
    });

    // GET ALL PARKS
    router.get('/parks', (req, res) => {
        const parksCollection = database.collection('parks');

        parksCollection.find({}).toArray((err, docs) => {
            return res.json(docs)
        });
    });

    // GET park by ID
    router.get('/parks/:id', (req, res) => {
        const parksCollection = database.collection('parks');
        const id = req.params.id;
        const o_id = new ObjectId(id);
        parksCollection.findOne(o_id, function(err, result) {
            if (err) {
                console.log(err);
            }
            return res.json(result);
        });
    });

    // GET ALL USERS <-- For Testing purposes
    router.get('/users', (req, res) => {
        const usersCollection = database.collection('users');

        usersCollection.find({}).toArray((err, docs) => {
            if (err) {
                console.log(err.message);
            }
            return res.json(docs)
        });
    });

    // CREATE NEW USER
    router.post('/create-account', (req, res) => {
        const user = req.body;
        
        // ENSURE PASSWORD FIELD IS NOT BLANK
        if (user.password === "") {
            return res.status(400).send({error: "Password cannot be blank"})
        }

        // HASH PASSWORD FOR SECURITY
        const hashed_pwd = user.password = bcrypt.hashSync(user.password, 10);

        // create user object with empty fields to be updated later
        const user_to_insert = {
            "username": user.username,
            "role": "user",
            "password": hashed_pwd,
            "avatar": "",
            "bio": "",
            "parks_visited":0,
            "parks": [],
            "badges": []
        };
        const usersCollection = database.collection('users');

        // ENSURE USERNAME IS UNIQUE
        usersCollection.createIndex({username:1}, {unique:true});

        // INSERT USER INTO THE DATABASE
        usersCollection.insertOne(user_to_insert, (err, result) => {
            if (err) {
                return res.status(400).send({error: err.message})
            }
            return res.json(result);
        });
    });

    // AUTHENTICATE USER
    router.post('/authenticate', (req, res) => {
        const user = req.body;
        const usersCollection = database.collection('users');
        usersCollection
            .findOne({ username: user.username }, (err, result) => {
                if (!result) {
                    return res.status(404).json({ error: 'user not found' })
                }

                if (!bcrypt.compareSync(user.password, result.password)) {
                    return res.status(401).json({ error: 'incorrect password' });
                }

                const payload = {
                    username: result.username,
                    admin: result.admin
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });
                return res.json({
                    message: 'successfully authenticated',
                    token: token
                })
            });
    });
    return router;
}

module.exports = apiRouter;
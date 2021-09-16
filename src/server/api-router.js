const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');

function apiRouter(database) {
    const router = express.Router();

    router.use(
        checkJwt({ secret: process.env.JWT_SECRET}).unless({ path: '/api/authenticate'})
    );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({ error: err.message });
        }
    });

    // GET ALL PARKS
    router.get('/parks', (req, res) => {
        const parksColection = database.collection('parks');

        parksColection.find({}).toArray((err, docs) => {
            return res.json(docs)
        });
    });

    //GET ALL USERS <-- For Testing purposes
    router.get('/users', (req, res) => {
        const usersColection = database.collection('users');

        usersColection.find({}).toArray((err, docs) => {
            return res.json(docs)
        });
    });
    return router;
}

module.exports = apiRouter;
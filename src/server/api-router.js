const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');

function apiRouter(database) {
    const router = express.Router();

    // AUTH SECURITY --IMPLEMENT AFTER SETTING UP BASIC UI
    // router.use(
    //     checkJwt({ secret: process.env.JWT_SECRET, algorithms: ['RS256'] }).unless({ path: '/api/authenticate'})
    // );

    // router.use((err, req, res, next) => {
    //     if (err.name === 'UnauthorizedError') {
    //         res.status(401).send({ error: err.message });
    //     }
    // });

    // GET ALL PARKS
    router.get('/parks', (req, res) => {
        const parksColection = database.collection('parks');

        parksColection.find({}).toArray((err, docs) => {
            return res.json(docs)
        });
    });

    // GET ALL USERS <-- For Testing purposes
    router.get('/users', (req, res) => {
        const usersColection = database.collection('users');

        usersColection.find({}).toArray((err, docs) => {
            if (err) {
                console.log(err.message);
            }
            return res.json(docs)
        });
    });

    // AUTHENTICATE USER
    router.post('/authenticate', (req, res) => {
        const user = req.body;

        const usersColection = database.collection('users');
        usersColection
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
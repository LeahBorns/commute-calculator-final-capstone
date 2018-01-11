const User = require('./models/user');
const co2Divert = require('./models/co2Divert');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');

//const unirest = require('unirest');
//const events = require('events');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//const BasicStrategy = require('passport-http').BasicStrategy;
const morgan = require('morgan');

const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());



// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;




//RUN/CLOSE SERVER
let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// USER ENDPOINTS
//POST -> Creating a new user (Registration)
app.post('/signup', (req, res) => {
    let username = req.body.username;
    //        console.log(username);
    username = username.trim();

    let password = req.body.password;
    //        console.log(password);
    password = password.trim();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                username,
                password: hash,
                verifyPw: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                if (item) {
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });

    });
});


//put -> User signing in

app.post('/signin/', function (req, res) {
    const user = req.body.username;
    const pw = req.body.password;
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                //wrong username
                return res.status(401).json({
                    message: 'Not Found!'
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        //                        console.log('There was an error validating the password.');
                        return res.status(401).json({
                            message: 'There was an error validating the password.'
                        });
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: 'Invalid user'
                        });
                    } else {
                        var logInTime = new Date();
                        //                        console.log('User logged in:' + req.body.username + 'at' + logInTime);
                        return res.json(items);
                    }
                });
            };
        });
});


//////////////////////////Profile Activtiy/////////////////////////////////////////////
// Completing a new activity


app.get('/tableDataByUsername/:username', (req, res) => {

    co2Divert.find({
        username: req.params.username
    }, (err, co2Divert) => {

        if (err) {
            res.send(err)
        }

        res.json(co2Divert)
    })
})

app.post('/co2Divert/add', (req, res) => {


    let currentDate = req.body.currentDate;
    let dailyMileage = req.body.dailyMileage;
    let username = req.body.username;

    co2Divert.create({
        username: username,
        currentDate: currentDate,
        dailyMileage: dailyMileage

    }, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.json(item);
    });
});

//Take completed activity and put in feed
app.get('/co2Divert/show/:username', function (req, res) {
    //    console.log(req.params.user);
    co2Divert
        .find({
            username: req.params.username
        })
        .sort("currentDate")
        .then(function (item) {

            res.json({
                item
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});



//MISC -> catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;

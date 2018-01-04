const User = require('./models/user');
const activity = require('./models/activity');
const activityCategory = require('./models/activityCategory');
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
    //    console.log(username);
    username = username.trim();

    let goals = req.body.goals;
    //    console.log(goals);

    let password = req.body.password;
    //    console.log(password);
    password = password.trim();

    let email = req.body.email;
    //    console.log(email);
    email = email.trim();

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

//ACTIVITY ENDPOINTS (CREATE?, FIND, DELETE?)
//FIND/GET -> accessing all of users activties
//adding new activity
app.post('/category/add', function (req, res) {
    //    console.log(req.params.user);
    let username = req.body.username;
    let image = req.body.image;
    let name = req.body.name;
    let points = req.body.points;


    //    console.log(username, name, points, description, image);
    console.log("-->", name, "<---");

    activityCategory.create({
        username: username,
        activityCategoryImage: image,
        activityCategoryName: name,
        activityCategoryPoints: points
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`activity \`${name}\` added.`);
            return res.json(item);
        }
    });
});
app.get('/get-category-by-username/:user', function (req, res) {
    console.log(req.params.user);
    activityCategory
        .find()
        .sort()
        .then(function (category) {

        console.log("user categories->", category);
        let categoryOutput = [];
        category.map(function (category) {
            if (category.username == req.params.user) {
                categoryOutput.push(category);
            }
        });
        res.json({
            categoryOutput
        });
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    });
});

app.get('/category/show/:user', function (req, res) {
    console.log(req.params.user);
    activityCategory
        .find()
        .sort()
        .then(function (category) {

        console.log("user categories->", category);
        let categoryOutput = [];
        category.map(function (category) {
            if (category.username == req.params.user) {
                categoryOutput.push(category);
            }
        });
        res.json({
            categoryOutput
        });
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    });
});

//DELETE -> an activity by ID
app.delete('/activity/:id', function (req, res) {
    activity.findByIdAndRemove(req.params.id).exec().then(function (activity) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    });
});

//////////////////////////Profile Activtiy/////////////////////////////////////////////
// Completing a new activity


app.get('/activity-feed-by-username/:username', (req, res) => {

    activity.find({
        username: req.params.username
    }, (err, activity) => {

        if (err) {
            res.send(err)
        }

        res.json(activity)
    })
})

app.post('/activity/add', (req, res) => {


    let image = req.body.activityImage;
    let name = req.body.activityName;
    let points = req.body.activityPoints;
    let description = req.body.activityDescription;
    let username = req.body.username;



    activity.create({
        username: username,
        name: name,
        points: points,
        description: description,
        image: image
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`activity \`${name}\` completed.`);
            return res.json(item);
        }
    });
});

//Take completed activity and put in feed
app.get('/activity/show', function (req, res) {
    //    console.log(req.params.user);
    activity
        .find()
        .sort()
        .then(function (activity) {
        let activityOutput = [];
        activity.map(function (activity) {
            if (activity.user == req.params.user) {
                activityOutput.push(activity);
            }
        });
        res.json({
            activityOutput
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

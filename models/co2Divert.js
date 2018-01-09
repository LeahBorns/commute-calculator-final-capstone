"use strict";

const mongoose = require('mongoose');

const co2DivertedSchema = new mongoose.Schema({
    username: String,
    currentDate: String,
    dailyMileage: String,
});


const co2Divert = mongoose.model('co2Divert', co2DivertedSchema);

module.exports = co2Divert;

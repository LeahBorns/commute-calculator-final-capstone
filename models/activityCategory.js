"use strict";

const mongoose = require('mongoose');



const activityCategorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    activityCategoryImage: {
        type: String,
        required: false
    },
    activityCategoryName: {
        type: String,
        required: false
    },
    activityCategoryPoints: {
        type: Number,
        required: false
    }
});


const activityCategory = mongoose.model('activityCategory', activityCategorySchema);

module.exports = activityCategory;

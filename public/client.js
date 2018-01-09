"use strict";

// Function and object definitions
var user = undefined;
var loggedinUserName = '';
var loggedinPassword = '';

///////////////////////REGISTER AND SIGN UP////////////////////////////
function showLandingPage() {
    $('#profile-page').hide();
    $('#sign-in-section').hide();
    $('#sign-in-page').show();
    $('#js-signout-link').hide();
    $('#js-signin-link').show();
}

function showSignInSection() {
    $('#profile-page').hide();
    $('#sign-in-section').show();
    $('#sign-in-page').show();
    $('#js-signout-link').hide();
    $('#js-signin-link').show();
}


/////////////////////PROFILE PAGE FUNCTIONS////////////////////////////////

// SHOW PROFILE PAGE
function showProfilePage(loggedinUserName) {

    $('#profile-page').hide();
    $('#signin-form').hide();
    $('#sign-in-page').show();
    $('#js-signout-link').show();
    $('#js-signout-link').text("Sign out " + loggedinUserName);
    $('#js-signin-link').hide();
    $('#profileUsername').text(loggedinUserName);
    $('#miles-number').text(currentScore + myActivities.activityPoints);
    displayProfileActivities(myActivities);
}

/////////////////SIGN-IN TRIGGERS/////////////////////////////////////////
//Page loads to SIGN-IN PAGE
//1. User enters user name and password. Press enter to enter site
$(document).ready(function () {
    showLandingPage();
    alert('the page loaded');

});




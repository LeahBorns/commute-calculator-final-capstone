"use strict";

// Function and object definitions
var user = undefined;
var loggedinUserName = '';
var loggedinPassword = '';

function displayError(message) {
    $("#messageBox span").html(message);
    $("#messageBox").fadeIn();
    $("#messageBox").fadeOut(10000);
};


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

    $('#profile-page').show();
    $('#signin-form').hide();
    $('#sign-in-page').hide();
    $('#js-signout-link').show();
    $('#js-signout-link').text("Sign out " + loggedinUserName);
    $('#js-signin-link').hide();
    $('#profileUsername').text(loggedinUserName);
//    $('#miles-number').text(currentScore + myActivities.activityPoints);
//    displayProfileActivities(myActivities);
}

/////////////////SIGN-IN TRIGGERS/////////////////////////////////////////
//Page loads to SIGN-IN PAGE
//1. User enters user name and password. Press enter to enter site
$(document).ready(function () {
    showLandingPage();
});

$("#messageBox").hide();

//User clicks on sign-in button
$('#js-signin-link').on('click', function () {
    $('#sign-in-section').toggle();
});

//USER WITH ACCOUNT SIGNS IN
$('#js-signin-button').on('click', function (event) {
    event.preventDefault();

    //AJAX call to validate login info and sign user in
    const inputUname = $('input[name="username"]').val();
    const inputPw = $('input[name="password"]').val();

    // check for spaces, empty, undefined
    if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {

        displayError('Invalid username');
        console.log('invalid username');
        //            alert('Invalid username');
    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
        displayError('Invalid password');
        //            alert('Invalid password');
        console.log('invalid password');
    } else {
        const unamePwObject = {
            username: inputUname,
            password: inputPw
        };
        user = inputUname;

        $.ajax({
            type: "POST",
            url: "/signin",
            dataType: 'json',
            data: JSON.stringify(unamePwObject),
            contentType: 'application/json'
        })
            .done(function (result) {
             console.log(result);
            loggedinUserName = result.username;
            loggedinPassword = result.password;

            // show the signout link in header as soon as user is signed in
            $('#js-signout-link').show();

            showProfilePage(loggedinUserName);
        })
            .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            displayError('Invalid username and password combination. Please check your username and password and try again.');
            //                    alert('Invalid username and password combination. Pleae check your username and password and try again.');
        });
    };
});

///////////////////////////////////////////REGISTER PAGE TRIGGERS///////////////////////////////////////////////
//2. Visitor wants to create an account. Clicks create an account
//Add username, email, password and verify password. Submit
//and brought back to sign in page to sign in

$('#js-signup-button').on('click', function (event) {
//    event.preventDefault();

    const form = document.body.querySelector('#signup-form');

    const uname = $('input[name="username"]').val();
    const pw = $('input[name="password"]').val();
    const confirmPw = $('input[name="confirm-password"]').val();

    if (uname == "") {
        displayError('Please add an username');
    } else if (pw == "") {
        displayError('Please add a password');
    } else if (pw !== confirmPw) {
        displayError('Passwords must match!');
    } else {
        event.preventDefault();
        const newUserObject = {
            username: uname,
            password: pw
        };

        // will assign a value to variable 'user' in signin step below
        // AJAX call to send form data up to server/DB and create new user

        $.ajax({
            type: 'POST',
            url: '/signup',
            dataType: 'json',
            data: JSON.stringify(newUserObject),
            contentType: 'application/json'
        })
            .done(function (result) {
            event.preventDefault();
            displayError('Thanks for signing up! You may now sign in with your username and password.');
            showSignInSection();
        })
            .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            displayError('All fields must be complete before submitting.');
        });
    };
});

///////////////////////////////////////////PROFILE PAGE TRIGGERS///////////////////////////////////////////////
//PROFILE PAGE from image in nav



///////click signout link/////////
// when user clicks sign-out link in header
document.getElementById('js-signout-link').addEventListener('click', function (event) {
    location.reload();
});

///////////////message box triggers//////////////////////
$(document).on("click", "#hideBtn", function () {
    $("#messageBox").fadeOut();
});

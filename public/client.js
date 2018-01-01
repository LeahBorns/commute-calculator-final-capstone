"use strict";

// Function and object definitions
var user = undefined;
var loggedinUserName = '';
var loggedinPassword = '';

///////////////////////REGISTER AND SIGN UP////////////////////////////
function showSignInPage() {
    $('#profile-page').hide();
    $('#signin-form').hide();
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
    $('.profileUsername').text(loggedinUserName);
    $('.profileDescription').text(sustainGoals);
    $('#total-points').text(currentScore + myActivities.activityPoints);
    displayProfileActivities(myActivities);
    //        $('.profileActivityBoxesSection').text(displayProfileActivities(myActivities));
}

///////////////////////////////////////////SIGN-IN TRIGGERS///////////////////////////////////////////////
//Page loads to SIGN-IN PAGE
//1. User enters user name and password. Press enter to enter site
$(document).ready(function () {
    // when page first loads
    //    $('*').scrollTop(0);

    $('.sustain-logo').on('click', function (event) {
        showSignInPage();
    })



    $('#friends-page').hide();
    $('.addedCategoryCard').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').show();
    $('#js-signout-link').hide();
    $('#nav-links').hide();
    $("#messageBox").hide();

    // USER WITH ACCOUNT SIGNS IN

    $('#js-signin-button').on('click', function (event) {
        event.preventDefault();

        // AJAX call to validate login info and sign user in
        const inputUname = $('input[name="signin-username"]').val();
        const inputPw = $('input[name="signin-pw"]').val();
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
                // console.log(result);
                loggedinUserName = result.username;
                loggedinPassword = result.password;

                // show the signout link in header as soon as user is signed in
                $('#js-signout-link').show();

                showActivitiesPage(allActivities);
                displayAllActivities(myActivities);
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
    //
    ///////////////////////////////////////////REGISTER PAGE TRIGGERS///////////////////////////////////////////////
    //2. Visitor wants to create an account. Clicks create an account
    //Add username, email, password and verify password. Submit
    //and brought back to sign in page to sign in
    $('#js-new-account').on('click', function (event) {
        showNewUserPage();
    });
    $('#signup-button').on('click', function (event) {
        event.preventDefault();
        const form = document.body.querySelector('#new-user-form');
        //        if (form.checkValidity && !form.checkValidity()) {
        //            return;
        //        }
        const uname = $('input[name="username"]').val();
        const email = $('input[name="email"]').val();
        const pw = $('input[name="pw"]').val();
        const confirmPw = $('input[name="confirm-pw"]').val();
        //        const goals = $('input[name="goals"]').val();
        if (uname == "") {
            displayError('Please add an username');
        } else if (email == "") {
            displayError('Please add an email');
        } else if (pw == "") {
            displayError('Please add a password');
        } else if (pw !== confirmPw) {
            displayError('Passwords must match!');
        } else {
            event.preventDefault();
            const newUserObject = {
                username: uname,
                password: pw,
                email: email,
                //                goals: goals
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
                //                    alert('Thanks for signing up! You may now sign in with your username and password.');
                displayError('Thanks for signing up! You may now sign in with your username and password.');
                showSignInPage();
            })
                .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                displayError('All fields must be complete before submitting.');
            });
        };
    });

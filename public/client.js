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
    $('#about').hide();
    $('#signup').hide();
    //    $('#profileUsername').text(loggedinUserName + " ");
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
    $('#sign-in-section').show();
    $(window).scrollTop(0);
});

//USER WITH ACCOUNT SIGNS IN
$('#js-signin-button').on('click', function (event) {
    event.preventDefault();

    //AJAX call to validate login info and sign user in
    const inputUname = $('#username').val();
    const inputPw = $('#password').val();

    console.log(inputUname, inputPw);
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
                getCo2DivertByUsername(loggedinUserName);
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

    const uname = $('#signup-username').val();
    const pw = $('#signup-password').val();
    const confirmPw = $('#confirm-password').val();

    console.log(uname, pw, confirmPw);
    if (uname == "") {
        displayError('Please add an username');
    } else if (pw == "") {
        displayError('Please add a password');
    } else if (pw !== confirmPw) {
        event.preventDefault();
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
                showLandingPage();
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
$(document).on('submit', '#miles-form', function (event) {
    event.preventDefault();

    const currentDate = $(this).parent().find('#date').val();
    const dailyMileage = $(this).parent().find('#miles').val();

    console.log(currentDate, dailyMileage, loggedinUserName);

    if (currentDate.length > 10) {
        displayError('Please select a date');
        //        alert('Must be at least 10 characters');
    } else if (dailyMileage.length == 0) {
        displayError('Please input mileage');
    } else {
        const newMileage = {
            currentDate: currentDate,
            dailyMileage: dailyMileage,
            username: loggedinUserName
        };

        $.ajax({
                type: 'POST',
                url: '/co2Divert/add',
                dataType: 'json',
                data: JSON.stringify(newMileage),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                //                alert('Congrats! You completed todays task');
                displayError('Congrats! You completed todays task');
                getCo2DivertByUsername(loggedinUserName);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

    };

});

function getCo2DivertByUsername(username) {


    $.ajax({
            type: 'GET',
            url: '/co2Divert/show/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {

            displayCo2DivertByUsernameTable(result.item);
            //            displayCo2DivertByUsernameSummary(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}



function displayCo2DivertByUsernameTable(tableData) {
    console.log(tableData);
    let totalMileage = 0;
    let greenCo2 = 0;
    let SedanCo2 = 0;
    let suvCo2 = 0;

    //table head
    let buildTable = '<tr>';
    buildTable += '<th>Date</th>';
    buildTable += '<th>Miles</th>';
    buildTable += '<th>Efficient CO<sub>2</sub>Divert</th>';
    buildTable += '<th>Sedan CO<sub>2</sub>Divert</th>';
    buildTable += '<th>SUV CO<sub>2</sub>Divert</th>';
    buildTable += '</tr>';

    //table body
    $.each(tableData, function (myTableKey, myTableValue) {

        buildTable += '<tr>';
        buildTable += '<td> ' + myTableValue.currentDate + ' </td>';
        buildTable += '<td>' + myTableValue.dailyMileage + '</td>';
        buildTable += '<td>' + (myTableValue.dailyMileage * 255.0).toFixed(1) + '</td>';
        buildTable += '<td>' + (myTableValue.dailyMileage * 500.0).toFixed(1) + '</td>';
        buildTable += '<td>' + (myTableValue.dailyMileage * 708.3).toFixed(1) + '</td>';
        buildTable += '</tr>';

        totalMileage = totalMileage + parseInt(myTableValue.dailyMileage);
        greenCo2 = greenCo2 + myTableValue.dailyMileage * 255.0;
        SedanCo2 = SedanCo2 + myTableValue.dailyMileage * 500.0;
        suvCo2 = suvCo2 + myTableValue.dailyMileage * 708.3;
    });

    //table footer
    buildTable += '<tr>';
    buildTable += '<th>Total</th>';
    buildTable += '<td>' + totalMileage + '</td>';
    buildTable += '<td>' + greenCo2.toFixed(1) + '</td>';
    buildTable += '<td>' + SedanCo2.toFixed(1) + '</td>';
    buildTable += '<td >' + suvCo2.toFixed(1) + '</td>';
    buildTable += '</tr>';

    //send data to the dom
    $('#table-data').html(buildTable);
    $('#miles-number').html(totalMileage + " miles");
    $('#green-car p.carbon').html(greenCo2.toFixed(1) + " lbs CO<sub>2</sub>");
    $('#sedan-car p.carbon').html(SedanCo2.toFixed(1) + " lbs CO<sub>2</sub>");
    $('#suv-car p.carbon').html(suvCo2.toFixed(1) + " lbs CO<sub>2</sub>");

};






///////click signout link/////////
// when user clicks sign-out link in header
document.getElementById('js-signout-link').addEventListener('click', function (event) {
    location.reload();
});

///////////////message box triggers//////////////////////
$(document).on("click", "#hideBtn", function () {
    $("#messageBox").fadeOut();
});

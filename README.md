# commute-calculator-final-capstone
Final capstone that will allow bike commuters to calculate the lbs co2 diverted

![Sign-in Page Screenshot](https://github.com/LeahBorns/sustain-node-capstone/blob/master/github-images/sustain-screen-shots/sustain-sign-in-page.png)
![Registration Screenshot](https://github.com/LeahBorns/sustain-node-capstone/blob/master/github-images/sustain-screen-shots/sustain-registration-page.png)
![Activity Categories Page Screenshot](https://github.com/LeahBorns/sustain-node-capstone/blob/master/github-images/sustain-screen-shots/sustain-categories-page.png)
![Profile page (top/bottom) Screenshot](https://github.com/LeahBorns/sustain-node-capstone/blob/master/github-images/sustain-screen-shots/sustain-profile-page-top.png)
![Profile page (top/bottom) Screenshot](https://github.com/LeahBorns/sustain-node-capstone/blob/master/github-images/sustain-screen-shots/sustain-profile-page-bottom.png)

## Introduction
Co2mmute calculator is a simple way for bike commuters to keep track of their milage and the positive impact they are having each time they decide to pedal vs drive.


## Use Case
Why is this app useful? This app will show the positive impact that bike commuting can have on our communities by comparing how much co2 they divert compared to a prius, average size car and an SUV. The ability to put a number and impact on their commute may encourage them to commute more as well as others to start.

## UX

Initial wireframes for Co2mmute calculator can be seen below. Wireframes of all key processes were designed along with data flow and user questions for key tasks.


## User-stories

##### Sign-in/Signup
* As a user I should be able to sign up for Co2mmute calculator to access my own account and data
* As a user I should be able to log in to Co2mmute calculator to access my own account and data
* As a user I should be able to understand the purpose of the app based off the landing page to know what the app does.

##### MVP
* As a user I should be able to input and submit the date and daily milage to see the amount of co2 diverted to date.
* As a user I should be able to see my total milage to date to stay updated on my progress
* As a user I should be able to see my milage converted into lbs of co2 for a prius, average sedan and an SUV to get a better understanding of my impact on biking vs driving.
* As a user I should be able to see the date, my milage, and lbs co2 diverted in chronological order in a table below the input area to access each submission individually.

##### Screen Inventory
* Landing page/account signup page
* login page
* Nav bar with logo and login/out
* User home page with milage totals, co2 diverted, input area and table of overall submissions

##### Wireframes

* Wireframe to understand purpose and sign-up
![Purpose and Sign-up](https://github.com/LeahBorns/commute-calculator-final-capstone/blob/master/wire-frame-images/landing-signup-html-wireframe.png)
* Wireframe to sign-in
![Sign-in](https://github.com/LeahBorns/commute-calculator-final-capstone/blob/master/wire-frame-images/sign-in-page-html-wireframe.png)
* Wireframe with user profile to see co2 diverted to date and to input more milage to be converted
![User Profile](https://github.com/LeahBorns/commute-calculator-final-capstone/blob/master/wire-frame-images/user-data-html-wireframe.png)

## Working Prototype

You can access a node working prototype of the app here: https://commute-calculator-capstone.herokuapp.com/ and a react working prototype here: https://leahborns.github.io/commute-calculator-final-capstone-react/build/

## Functionality
The app's functionality includes:

* Register as a new user with a username, email, and password.
* Sign-in using registered username and password.
* Review current milage and co2 diverted
* Select date and input milage each day to add to total.
* Review miles converted into co2 at the top of the page.
* Review each submission in chronological table at bottom of profile page.


## Technical

The app is built with HTML, CSS, JavaScript, jQuery, Node.js and React. All data is held in an mLab database during the user's session. It has been built to be fully responsive across mobile, tablet and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

* I plan to add a friends page and overall feed page for users to interact with other users. I also want to connect the points to artists merchandise web pages so users can redeem their points for prizes.

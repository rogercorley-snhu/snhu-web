

/* =============================================================

Book:           New Perspectives on HTML and CSS
Project:        Tutorial 10 : Case Problem 3
``````````````````````````````````````````````````````````````````
Filename:       functions.js
``````````````````````````````````````````````````````````````````
Author:         Roger Corley
Date:           June 5, 2015
``````````````````````````````````````````````````````````````````
Description:

This file contains functions used in the today.htm file.

The GetDate function displays the date in "Weekday, Month Day, Year" format.
The GetWeekDay function displays the weekday name.

================================================================== */


function GetDate() {

    var rightNow;

    var months = [ 'January','February','March','April','May',
        'June','July','August','September','October',
        'November','December' ];

    var days = [ 'Sunday','Monday','Tuesday','Wednesday',
        'Thursday','Friday','Saturday' ];

    var date = new Date();

    var today = date.getDay();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    rightNow = days[today] + ", " + months[month] + " " + day + " " + year;

    return rightNow

}


function GetWeekDay() {

    var weekday;

    var days = [ 'Sunday','Monday','Tuesday','Wednesday',
        'Thursday','Friday','Saturday' ];

    var day = new Date().getDay();

    weekday = days[day];

    return weekday

}


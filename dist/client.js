"use strict";

//document.getElementById("send").addEventListener("click", notNull);
function notNull() {
  var message = document.getElementById("message");
  var name = document.getElementById("name");
  var subject = document.getElementById("subject");
  var email = document.getElementById("email");

  if (message === "" || message === undefined) {
    document.getElementById("message").style.border = "red";
  } else if (name === "" || name === undefined) {
    document.getElementById("name").style.border = "red";
  } else if (subject == "" || subject == undefined) {
    document.getElementById("subject").style.border = "red";
  } else if (email == "" || email == undefined) {
    document.getElementById("email").style.border = "red";
  } else {
    console.log("ill be what you want");
    sendMessage(name, email, subject, message);
  }
}

function sendMessage(name, email, subject, message) {
  fetch('http://165.232.40.121:8001/sendMessage?', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      subject: subject,
      message: message
    })
  }).then(function (response) {
    return response.json();
  }).then(function (success) {
    var bool = success.state;

    if (bool) {
      document.getElementById("contactForm").style.visibility = "hidden";
    } else {// error validation (highlight form etc)
    }
  })["catch"](function (err) {
    console.log('Fetch problem: ' + err.message);
  });
}

function playDemo(exert) {// extert 1.. 2... etc
  //https://www.cssscript.com/html5-green-audio-player/
}
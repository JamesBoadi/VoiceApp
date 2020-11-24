let express = require('express');
var body = require('body-parser');
var path = require('path');
var Mailgun = require('mailgun-js');
require('dotenv').config()

var server = express();

server.use(body.urlencoded({ extended: true }));
server.use(body.json());
server.use(body.raw());


server.use(express.static(path.join(__dirname, '..')));


let sendMes = async function (name, email, subject, message) {

  var mailgun = new Mailgun({apiKey: process.env.API_KEY, 
      domain: process.env.DOMAIN, host: process.env.API_HOST});

  var data = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: subject.toString(),
    html: "From " + email.toString() + "\n\xA0 " + message.toString()
  }

  mailgun.messages().send(data, function (err, body) {
      if (err) {
          return false;
      }
      else {
          return true;
      }
  });
  return true;
}

// Registration
server.all('/sendMessage', async function (req, res, next) { // callback

  let name = new String(req.query.name);
  let email = new String(req.query.email);
  let subject = new String(req.query.subject);
  let message = new String(req.query.message);

  const reg = await sendMes(name, email, subject, message);

  if (reg === true) {
   
    res.send(200);
  }
  else {
  
    res.status(400);
  }

  next();
});

module.exports = app;

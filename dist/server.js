"use strict";

var requirejs = require('requirejs');

requirejs.config({
  //load the mode modules to top level JS file 
  //by passing the top level main.js require function to requirejs
  nodeRequire: require
});

var _express = requirejs("express");

var _bodyParser = requirejs("body-parser");

var _nodemailer = requirejs("nodemailer");

var _path = requirejs("path");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var server = (0, _express.express)();
server.use((0, _bodyParser.urlencoded)({
  extended: true
}));
server.use((0, _bodyParser.json)());
server.use(raw());
server.use(path.join(__dirname, '..'));
server.listen(8001, function () {
  //console.log("This confirms the server is running")
  console.log((0, _path.resolve)(__dirname, '..'));
});
/*server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 /* res.writeHead(200, {
    'Content-Type': ' text/html'
  });
  fs.readFile('./index.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Whoops! File not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
  next();
});*/
// Send Mail

var sendMes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, email, subject, message) {
    var transporter;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transporter = (0, _nodemailer.createTransport)({
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              // true for 465, false for other ports
              auth: {
                user: "boadiunmonitored@gmail.com",
                // email
                pass: "qsczseqsczseQ@" // password

              },
              tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
              }
            });
            _context.prev = 1;
            _context.next = 4;
            return transporter.sendMail({
              from: email.toString(),
              // sender address
              to: "boadiunmonitored@gmail.com",
              // myself as the reciever
              subject: "Name " + name.toString() + "Subject " + subject.toString() + "From " + email.toString(),
              // Subject line
              text: message.toString() // plain text body

            });

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", false);

          case 9:
            return _context.abrupt("return", true);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));

  return function sendMes(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}(); // Registration


server.all('/sendMessage', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var name, email, subject, message, reg;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // callback
            name = new String(req.query.name);
            email = new String(req.query.email);
            subject = new String(req.query.subject);
            message = new String(req.query.message);
            _context2.next = 6;
            return sendMes(name, email, subject, message);

          case 6:
            reg = _context2.sent;

            if (reg === true) {
              res.send("OK");
            } else {
              res.status(400).end();
            }

            next();

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}());
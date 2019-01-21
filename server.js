const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session")
const morgan = require('morgan');
const routes = require("./routes");
const app = express();
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT ? process.env.PORT : 3001;

// Socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.Promise = global.Promise;

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/saytrees");

// Console visual aid for dev environment
app.use(morgan('dev'))

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
  secret: 'keyboard-cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Access the session as req.session
app.get('/api/tree/:name', function (req, res, next) {
  var sessData = req.session;
  sessData.online = true;
  res.send(sessData);
  console.log(`Session on server: ${req.session}`)
});

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// // Add routes, both API and view
app.use(routes);



// app.listen(PORT, function () {
//   console.log(`🌎 ==> Server now on port ${PORT}!`);
// });

// =======================================
// ========== Implement Socket============
app.get('/', function (req, res) {
  res.send(routes);
});

io.on('connection', function (socket) {
  socket.on('factory', function (name) {
    io.emit('factory', name);
    console.log('a user connected');
    console.log('factory: ' + name);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');

  });
});

http.listen(PORT, function () {
  console.log(`🌎 listening on *:${PORT}`);
});
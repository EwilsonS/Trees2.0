const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan');
const app = express();
const routes = app.use(require("./routes"));
const PORT = process.env.PORT ? process.env.PORT : 3001;

mongoose.Promise = global.Promise;


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/saytreesV2");

// Console visual aid for dev environment
app.use(morgan('dev'))

// Define middleware here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send(routes);
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });
  
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
      
    });
  });

  io.on('connection', function(socket){
    socket.broadcast.emit('hi');
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });

http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});
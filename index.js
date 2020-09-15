var express = require('express'); //express initializes app to be given to http server
var app = express();
var socket = require('socket.io');

// app.get('/', (req, res) => {                   //define route handler '/' that gets called
//     res.send('<h1>Hello world</h1>');          //when we hit website home
// })

/*
The below code allowed for sending of one file, however not an entire directory.
The structure of this had to be changed to accomodate for the directory
*/
// app.get("/", (req, res) => {
//   //passover an html file
//   res.sendFile(__dirname + "/public/html");
// });

var server = app.listen(3000, function() {
  console.log("listening on *:3000");
});

app.use(express.static('public')); 

var io = socket(server); //new instance of socket.io, by passing http object

io.on("connect", (socket) => {
  //listen on connection event and log to console
  console.log("a user connected");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  //   socket.on("chat message", (msg) => {
  //     io.emit("chat message", msg);
  //   });
});

// http.listen(3000, () => {
//   //make http server listen on port 5500
//   console.log("listening on *:3000");
// });

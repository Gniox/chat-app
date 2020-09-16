var express = require("express"); //express initializes app to be given to http server
var app = express();
var port = process.env.PORT || 3000;
var http = require("http").Server(app);
var io = require("socket.io")(http);
var user = 1;
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

app.use(express.static("public"));

// var io = socket(server); //new instance of socket.io, by passing http object

io.on("connect", (socket) => {
  //listen on connection event and log to console
  socket.on("entered", (name) => {
    io.emit("entered", name);
    user++;
  });
  socket.on("chat message", (data) => {
    io.emit("chat message", data);
    // console.log("message: ", msg);
  });
});

exports.server = http.listen(port);

// http.listen(3000, () => {
//   //make http server listen on port 5500
//   console.log("listening on *:3000");
// });

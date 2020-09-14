var app = require("express")(); //express initializes app to be given to http server
var http = require("http").createServer(app); //http server
var io = require("socket.io")(http); //new instance of socket.io, by passing http object

// app.get('/', (req, res) => {                   //define route handler '/' that gets called
//     res.send('<h1>Hello world</h1>');          //when we hit website home
// })

app.get("/", (req, res) => {
  //passover an html file
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", () => {
  //listen on connection event and log to console
  console.log("a user connected");
  //   socket.on("chat message", (msg) => {
  //     io.emit("chat message", msg);
  //   });
});

http.listen(3000, () => {
  //make http server listen on port 5500
  console.log("listening on *:3000");
});

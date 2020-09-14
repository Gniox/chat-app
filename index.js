var app = require('express')();                //express initializes app to be given to http server
var http = require('http').createServer(app);  //http server

// app.get('/', (req, res) => {                   //define route handler '/' that gets called
//     res.send('<h1>Hello world</h1>');          //when we hit website home
// })

app.get('/', (req, res) => {                   //passover an html file 
    res.sendFile(__dirname + '/index.html');
})

http.listen(3000, () => {                      //make http server listen on port 3000
    console.log('listening on *:3000');
});


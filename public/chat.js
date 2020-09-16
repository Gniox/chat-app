const socket = io();
let prevName = '';
let curName = '';
let hasName = false;

document.getElementById("m").addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    submitMessage();
  }
});

document.getElementById("name").addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    if (document.getElementById("name").value != '') submitName();
  }
});

// document.getElementById("name").addEventListener("mouseout", function () {
//   if (document.getElementById("name").value != '') {
//     curName = document.getElementById("name").value;
//     submitName();
//   }
    
// });

socket.on("entered", (name) => {
  let message = document.createElement("li");
  message.appendChild(
    document.createTextNode(name + " has entered the chat UwU")
  );
  document.getElementById("messages").append(message);
});

socket.on("chat message", (msg) => {
  let message = document.createElement("li");
  let name = document.getElementById("name").value + ": ";
  message.appendChild(document.createTextNode(name + msg));
  document.getElementById("messages").append(message);
});

function submitMessage() {
  if (document.getElementById("name").value == '') {
    alert("Name yourself first.");
  } else {
    event.preventDefault();
    socket.emit("chat message", document.getElementById("m").value);
    document.getElementById("m").value = "";
  }
}

function submitName() {
  socket.emit("entered", document.getElementById("name").value);
}

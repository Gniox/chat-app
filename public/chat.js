const socket = io();
let prevName = "";
let curName = "";
let hasName = false;

// window.onload = function() {
//   document.
// }

document.getElementById("m").addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    submitMessage();
  }
});

document.getElementById("name").addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    submitName();
  }
});

document.getElementById("m").addEventListener("focus", function () {
  socket.emit(
    "typing",
    document.getElementById("name").value + " is typing ..."
  );
});

// document.getElementById("name").addEventListener("mouseout", function () {
//   if (document.getElementById("name").value != '') {
//     curName = document.getElementById("name").value;
//     submitName();
//   }

// });

// socket.on("connect", socket);

//when name has been entered
socket.on("entered", (name) => {
  let message = document.createElement("li");
  message.appendChild(
    document.createTextNode(name + " has entered the chat UwU")
  );
  // message.appendChild(
  //   document.createTextNode(name + " has entered the chat UwU")
  // );
  document.getElementById("messages").append(message);
});

//when message has been received
socket.on("chat message", (data) => {
  let message = document.createElement("li");
  let mark = document.createElement("mark");

  if (document.getElementById("name").value == data.name) {
    mark.appendChild(document.createTextNode(data.message));
    message.appendChild(mark);
    message.classList.add("self");
    document.getElementById("messages").append(message);
  } else {
    let name = data.name + ": ";
    mark.appendChild(document.createTextNode(data.message));
    message.appendChild(document.createTextNode(name));
    message.appendChild(mark);
    document.getElementById("messages").append(message);
  }
  scrollDown();
});

socket.on("typing", (msg) => {
  let message = document.createElement("li");
  message.appendChild(document.createTextNode(msg));
  document.getElementById("messages").append(message);
});

//when message is being sent
function submitMessage() {
  if (document.getElementById("m").value != "") {
    event.preventDefault();
    socket.emit("chat message", {
      name: document.getElementById("name").value,
      message: document.getElementById("m").value,
    });
    document.getElementById("m").value = "";
  }
  event.preventDefault();
}

//when submitting name
function submitName() {
  event.preventDefault();
  document.getElementById("popupbox").classList.add("hide");
  document.getElementById("chatbody").classList.remove("name-overlay");
  console.log("did you get here");
  socket.emit("entered", document.getElementById("name").value);
}

//scroll down
function scrollDown() {
  let chat = document.getElementById("msg-container");
  chat.scrollTop = chat.scrollHeight;
}

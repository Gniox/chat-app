const socket = io();
// const tx = document.getElementsByTagName("textarea");

let prevName = "";
let curName = "";
let hasName = false;

// window.onload = function() {
//   document.
// }

// for (let i = 0; i < tx.length; i++) {
//   tx[i].setAttribute(
//     "style",
//     "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
//   );
//   tx[i].addEventListener("input", OnInput, false);
// }

document.getElementById("m").addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    submitMessage();
  }
});

document.getElementById("name").addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    submitName();
  }
});

document.getElementById("m").addEventListener("focus", function() {
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
socket.on("entered", name => {
  let message = document.createElement("li");
  let container = document.createElement("div");

  message.appendChild(
    document.createTextNode(name + " has entered the chat UwU")
  );
  // message.appendChild(
  //   document.createTextNode(name + " has entered the chat UwU")
  // );
  message.classList.add("notification");
  container.appendChild(message);
  container.classList.add("message-div");
  document.getElementById("messages").append(container);
});

//when message has been received
socket.on("chat message", data => {
  let message = document.createElement("li");
  // let mark = document.createElement("mark");
  let brokenMessage = lineBreak(data.message);
  let container = document.createElement("div");

  if (document.getElementById("name").value == data.name) {
    message.appendChild(document.createTextNode(brokenMessage));
    // message.appendChild(mark);
    message.classList.add("self");
    container.appendChild(message);
    container.classList.add("message-div");
    document.getElementById("messages").append(container);
  } else {
    let name = data.name + ": ";
    message.appendChild(document.createTextNode(name + brokenMessage));
    container.appendChild(message);
    message.classList.add("other");
    container.classList.add("message-div");
    document.getElementById("messages").append(container);
  }
  scrollDown();
});

//when someone types in chat
socket.on("typing", msg => {
  let message = document.createElement("li");
  let container = document.createElement("div");

  message.appendChild(document.createTextNode(msg));
  container.appendChild(message);
  message.classList.add("notification");
  container.classList.add("message-div");
  document.getElementById("messages").append(container);
});

//when message is being sent
function submitMessage() {
  if (document.getElementById("m").value != "") {
    event.preventDefault();
    socket.emit("chat message", {
      name: document.getElementById("name").value,
      message: document.getElementById("m").value
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

// function OnInput() {
//   // document.getElementById('input-div').style.height = 'auto';
//   this.style.height = "auto";
//   this.style.height = this.scrollHeight + "px";
//   console.log(document.getElementById("messages").style.maxHeight);
//   document.getElementById("form-m").style.height = this.scrollHeight + "px";
//   if (document.getElementById("messages").style.height === messageHeight) {
//     document.getElementById("messages").style.height -=
//       this.scrollHeight + "px";
//   }
// }

//takes messages in and breaks them up
function lineBreak(message) {
  let i = 0;
  let numCharSmol = 60;
  let numCharBig = 90;

  if ((message.length < 60 && screen.width < 600) || message.length < 90)
    return message;
  for (i; i < message.length; i++) {
    if (i >= numCharSmol && message[i] === " " && screen.width < 600) {
      message = message.slice(0, i) + "<br/>" + message.slice(i);
      console.log("this is from numsmol: " + i);
      message.length += 5;
      numCharSmol *= 2;
      remainder += 1;
    } else if (i >= numCharBig && message[i] === " ") {
      message = message.slice(0, i) + "<br/>" + message.slice(i);
      console.log("this is from numbig: " + i);
      message.length += 5;
      numCharBig *= 2;
    }
  }
  // console.log("this is the message: " + message);
  return message;
}

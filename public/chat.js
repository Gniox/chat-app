const socket = io();

document.getElementById("m").addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    submitMessage();
  }
});

socket.on('chat message', function(msg) {
  let message = document.createElement('li');
  message.appendChild(document.createTextNode(msg));
  document.getElementById('messages').append(message);
  document
})

function submitMessage() {
  event.preventDefault();
  socket.emit("chat message", document.getElementById("m").value);
  document.getElementById("m").value = "";
}

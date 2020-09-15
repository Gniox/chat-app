const socket = io();

document.getElementById("m").addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    submitMessage();
  }
});

socket.on('chat message', function(msg) {
  message = document.createElement('li').innerHTML = msg;
  document.getElementById('messages').append(message);
})

function submitMessage() {
  event.preventDefault();
  socket.emit("chat message", document.getElementById("m").value);
  document.getElementById("m").value = "";
}

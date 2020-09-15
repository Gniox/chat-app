const socket = io();

const item = document.getElementById("body");

socket.on("connect", () => {
  console.log("this should be the body " + item);
});

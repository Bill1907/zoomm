const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);
//
// socket.addEventListener("open", () => {
//     console.log("Connected to Browser ✅");
// });
//
// socket.addEventListener("message", (message) => {
//     console.log("New message:  ", message.data);
// });
//
function makeMessage(type, payload) {
    return JSON.stringify({type, payload});
}

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}

function handleOpen() {
    console.log("Connected to Server ✅");
}


socket.addEventListener("open", handleOpen);
socket.addEventListener("message", (message) => {
   const li = document.createElement('li');
   li.innerText = message.data;
   messageList.append(li);
});
socket.addEventListener("close", () => {
    console.log("Disconnected from server ❌");
});

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
// Put all your frontend code here.
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const messageList = document.querySelector('ul');
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', (socket) => {
    console.log('connected');
});

socket.addEventListener('message', (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener('close', () => {
    console.log('disconnected');
});

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener('submit', handleMessageSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
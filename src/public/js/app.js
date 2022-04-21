const socket = io();

const welcome = document.getElementById('welcome');
const room = document.getElementById('room');
const roomNameForm = welcome.querySelector('#roomName');
const nickForm = welcome.querySelector('#nick');

room.hidden = true;

let roomName;
let nickName;

function addMessage(msg) {
    const ul = room.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = msg;
    ul.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector('input');
    const value = input.value;
    socket.emit("new_message", input.value, roomName, nickName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = '';
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h2 = room.querySelector("h2");
    h2.innerText = `Room ${roomName}`;
    const h3 = room.querySelector("h3");
    h3.innerText = `your Nickname is ${nickName}`;
    const form = room.querySelector('form');
    form.addEventListener('submit', handleMessageSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = roomNameForm.querySelector('input');
    socket.emit('enter_room', input.value, showRoom);
    roomName = input.value;
    input.value = '';
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.emit('set_nickName', input.value, showRoom);
    nickName = input.value;
    input.value = '';
}

roomNameForm.addEventListener('submit', handleRoomSubmit);
nickForm.addEventListener('submit', handleNickSubmit);

socket.on('welcome', () => {
    addMessage('Someone Joined!');
});

socket.on('bye', () => {
    addMessage('Someone Left!');
});

socket.on('new_message', addMessage);
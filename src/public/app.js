// Put all your frontend code here.
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', (socket) => {
    console.log('connected');
});

socket.addEventListener('message', (messsage) => {
    console.log(messsage);
});

socket.addEventListener('close', () => {
    console.log('disconnected');
});
const socket = io()

socket.emit('message-1', 'Hi! i am a new client')
socket.on('message-2', data => { console.log(data) })
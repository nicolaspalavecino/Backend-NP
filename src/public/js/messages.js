const socket = io()

const chatForm = document.getElementById('chat-form')
const chatBox = document.getElementById('chat-box')
const messageLogs = document.getElementById('chat-logs')

chatForm.addEventListener('submit', async e => {
  e.preventDefault()
  const message = chatBox.value.trim()
  const userEmail = chatForm.title
  fetch(`/api/messages/${userEmail}/${message}`, { 
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      response.json()
      .then(user => {
        socket.emit('message', { user: user.first_name, message: message })
        chatBox.value = ''
      })
    } else {
      console.error('Error while sending message!')
    }
  })
})

socket.on('messageLogs', data => {
  let logs = ''
  data.forEach(log => {
    logs += `${log.user} dice: ${log.message}<br/>`
  })
  messageLogs.innerHTML = logs
})
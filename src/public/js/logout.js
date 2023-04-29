const logout = document.getElementById('logoutBtn')

logout.addEventListener('click', e => {
  e.preventDefault()
  fetch('/api/sessions/logout', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  }).then(result => {
    if(result.status === 200) {
      alert('The session was successfully ended!')
      window.location.replace('/users/login')
    } else if (result.status === 401) {
      alert("Invalid login")
    }
  })
})

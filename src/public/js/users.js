const upgradeUser = (email) => {
  fetch(`/users/premium/${email}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      alert('Your account has been upgrated to premium!')
      window.location.replace(`/products`)
    } else {
      console.error('Error trying to upgrade your account!')
    }
  })
}

const sendRestorePassword = (email) => {
  fetch(`/users/restore/${email}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      alert(`A mail was sent to ${email}! Please check your inbox!`)
    } else {
      console.error('Error trying to send restore password link!')
    }
  })
}

const deleteUser = (email) => {
  fetch(`/users/${email}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      response.json().then((result) => {
        alert(result.message)
        window.location.reload()
      })
    } else {
      console.error('Error trying to delete user!')
    }
  })
}

const deleteIdleUsers = () => {
  fetch('/users/', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      response.json().then((result) => {
        alert(result.message)
        window.location.reload()
      })
    } else {
      console.error('Error trying to delete idle users!')
    }
  })
}
const form = document.getElementById('passwordForm')
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const token = urlParams.get('token')

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  fetch(`/api/users/restore/password?token=${token}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(result => {
    if(result.ok) {
      result.json()
      alert('Password was successfully restored!')
      window.location.replace('/users/login')
  } else {
      return result.json().then((error) => {
        console.log(error.detail)
        alert('Password could not be restored: ' + error.message)
      })
    }
  }).catch((error => {
    alert('An error ocurred: ' + error.message)
  }))
})



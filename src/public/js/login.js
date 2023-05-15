const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  let data = new FormData (form)
  let obj = {}
  data.forEach((value,key) => obj[key] = value)
  fetch('/api/sessions/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(result => {
    if(result.status === 200) {
      result.json()
      .then(json => {
        console.log(json)
        localStorage.setItem('authToken', json.access_token)
        localStorage.setItem('USER_ID', json.id)
        alert('Successfull login!')
        window.location.replace('/users')
      })
    } else if (result.status === 401) {
      alert("Invalid login")
    }
  })
})

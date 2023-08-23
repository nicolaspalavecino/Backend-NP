const form = document.getElementById('premiumForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  const userEmail = form.name
  const data = new FormData(form)
  fetch(`/api/users/${userEmail}/documents`, {
    method: 'POST',
    body: data
  }).then(result => {
    if(result.ok) {
      alert('Your files were successfully uploaded!')
      fetch(`/api/users/premium/${userEmail}`, {
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
    } else {
      return result.json().then((error) => {
        console.log(error.detail)
        alert('Your files could not be uploaded: ' + error.message)
      })
    }
  }).catch((error => {
    alert('An error ocurred: ' + error.message)
  }))
})
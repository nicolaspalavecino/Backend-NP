const profilePic = document.getElementById('profile-pic-img')
const profilePicInput = document.getElementById('profile-pic-input')
const userEmail = profilePicInput.getAttribute('data-email')

profilePicInput.addEventListener('change', e => {
  e.preventDefault()
  let form = new FormData()
  form.append('profile-pic', profilePicInput.files[0])
  fetch(`/api/users/${userEmail}/profilepic`, {
    method: 'POST',
    body: form
  }).then(result => {
    if(result.ok) {
      result.json().then((response) => {
        alert(response.message)
        window.location.reload()
      })
    } else {
      result.json().then((error) => {
        alert(error.message)
        window.location.reload()
      })
    }
  }).catch((error => {
    alert('An error ocurred: ' + error.message)
    console.error(error.detail)
  }))
})
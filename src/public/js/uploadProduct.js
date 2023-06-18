const form = document.getElementById('productForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(result => {
    if(result.ok) {
      result.json()
      console.log(result)
      alert('Product was successfully created!')
      form.reset()
    } else {
      return result.json().then((error) => {
        console.log(error.detail)
        alert('Product could not be created: ' + error.message)
      })
    }
  }).catch((error => {
    alert('An error ocurred: ' + error.message)
  }))
})

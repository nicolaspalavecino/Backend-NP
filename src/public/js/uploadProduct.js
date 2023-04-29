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
    if(result.status === 201) {
      result.json()
      alert('Product was successfully created!')
      form.reset()
    } else {
      alert('Product could not be created')
    }
  }).then (json => console.log(json))
})

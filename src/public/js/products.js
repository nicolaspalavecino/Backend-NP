const deleteProduct = (productId, ownerEmail) => {
  fetch(`/api/products/${productId}`, { 
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((result) => {
    if(result.ok) {
      result.json().then((response) => {
        if (response.payload.owner === 'admin') {
          alert('Product was successfully deleted!')
          window.location.reload()
        } else {
          fetch(`/api/emails/${ownerEmail}/${response.payload.title}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            }
          }).then((result2) => {
            if(result2.ok) {
              result2.json().then((response2) => {
                alert(response2.message)
                window.location.reload()
              })
            }
          })
        }
      })
    } else {
      console.error('An error ocurred while trying to delete the product!')
    }
  })
}
const updateProduct = (productId) => {
  let validProperties = ['title', 'category', 'description', 'price', 'thumbnail', 'code', 'stock']
  let property = prompt(`Please, write the product's property you want to change:`)
  if (property !== null) {
    if(validProperties.includes(property)) {
      let value = prompt(`Please, now write the value you want to give to ${property}:`)
      if (value !== null) {
        if (value !== '') {
          const data = { property: property, value: value }
          fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json'
            }
          }).then((result) => {
            if (result.ok) {
              result.json().then((response) => {
                alert(response.message)
                window.location.reload()
              })        
            }
          })
        } else {
          alert('You need to give a value for the property you want to change. Please, try again!')
        }
      } else {
        alert('Update operation was canceled, no changes were made!')
      }
    } else {
      alert(`'${property}' is not a valid product property. The valid properties are: ${validProperties.join(', ')}. Please, try again!`)
    }
  } else {
    alert('Update operation was canceled, no changes were made!')
  }

}

const deleteProduct = (productId, productTitle, ownerEmail) => {
  let confirmation = confirm(`Are you sure you want todelete '${productTitle}' from the list of products?`)
  if (confirmation) {
    fetch(`/api/products/${productId}`, { 
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    }).then((result) => {
      if (result.ok) {
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
  } else {
    alert('Delete opertation was canceled, no changes were made!')
  }
}
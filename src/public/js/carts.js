const addItem = (cartId, productId, productTitle) => {
  fetch(`/api/carts/${cartId}/products/${productId}`, { 
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      alert(`${productTitle} was added to your cart!`)
    } else {
      console.error('error agregando producto!')
    }
  })
}

const plusItem = (cartId, productId, productTitle) => {
  fetch(`/api/carts/${cartId}/products/${productId}`, { 
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      window.location.replace(`/carts/${cartId}`)
    } else {
      console.error('error agregando producto!')
    }
  })
}

const deleteItem = (cartId, productId) => {
  fetch(`/api/carts/${cartId}/products/${productId}`, { 
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      window.location.replace(`/carts/${cartId}`)
    } else {
      console.error('error eliminando producto!')
    }
  })
}

const emptyCart = (cartId) => {
  fetch(`/api/carts/${cartId}`, { 
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      response.json().then(result => {
        alert(result.message)
        window.location.reload()
      })
    } else {
      console.error('error vaciando producto!')
    }
  })
}

const purchaseCart = (cartID) => {
  fetch(`/api/carts/${cartID}/purchase`, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      }
  }).then((response) => {
      if(response.ok) {
        response.json()
        .then(ticket => {
          alert(`Gracias por su compra! Su ticket con código: #${ticket.code} fue generado correctamente. Si escogiste productos sin stock permanecerán en tu carrito`)
          window.location.replace(`/carts/${cartID}`)
        })
      } else {
        console.error('Error while preparing the purchase')
      }
  })
}
const socket = io()

const product = document.getElementById('products-container')

// Recibiendo lista de productos:
socket.on('products', data => {
  let content = ''
  data.productsList.forEach(p => {
  content += 
      ` <div id=${p.code} class='product-card'>
          <h3>${p.title}</h3>
          <div class='product-img'>
            <img src=${p.thumbnail}/>
          </div>
          <ul>
              <li>$ ${p.price}</li>
              <li>Stock: ${p.stock}</li>
          </ul> 
        </div>`
  })
  product.innerHTML= content
})
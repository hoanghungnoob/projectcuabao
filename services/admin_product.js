function fetchProducts() {
  fetch('http://localhost:3000/product')
    .then(response => response.json())
    .then(data => {
      var list_product = document.getElementById('list_product');
      data.forEach(product => {
        var row = document.createElement("tr");
        var imageCell = document.getElementById('imageCell');
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td id="imageCell"></td>
          <td>${product.newPrice}</td>
          <td>${product.quantity}</td>
          <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="saveProduct()">Edit</button>
            <button class="delete_btn_product btn btn-danger" data-product-id="${product.id}">Delete</button>
          </td>
        `;
        var img = document.createElement('img');
        img.src = product.image1;
        img.width = 250;
        row.querySelector('td:nth-child(3)').appendChild(img);
        list_product.appendChild(row);
      });

      var deleteButtons = document.getElementsByClassName('delete_btn_product');
      for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', deleteProduct);
      }

      localStorage.setItem('products', JSON.stringify(data));
    });
}

function deleteProduct(event) {
  var productId = event.target.getAttribute('data-product-id');

  fetch(`http://localhost:3000/product/${productId}`, {
    method: 'DELETE'
  })
    .then(() => {
      location.reload();
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
}

fetchProducts();
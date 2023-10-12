function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function fetchProducts() {
  fetch('http://localhost:3000/product')
    .then(respone => respone.json())
    .then(data => {
      var list_product = document.getElementById('list_product');
      data.forEach(product => {
        console.table(product)
        var row = document.createElement("tr");
        var imageCell = document.getElementById('imageCell');
        row.innerHTML = `
      <td>${product.id}</td>
      <td> ${product.name}</td>
      <td id="imageCell"></td>
      <td> ${product.newPrice} </td>
      <td> ${product.quantity}</td>
      <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal_add" onclick="edit_product(${product.id},'${product.name}','${product.quantity}','${product.newPrice}','${product.oldPrice}','${product.image1}','${product.image2}','${product.image3}','${product.description}')">Edit</button>
          <button id="delete_btn_product" onclick = "deleteProduct(${product.id})" >Delete</button>
      </td>
    `;
        var img = document.createElement('img');
        img.src = product.image1;
        img.width = 250; // Thiết lập chiều rộng ảnh

        // Thêm ảnh vào thẻ td trong hàng sản phẩm
        row.querySelector('td:nth-child(3)').appendChild(img);
        list_product.appendChild(row);
      });
    });
}
fetchProducts();
//  chỉnh sửa sản phẩm 
function edit_product(id, name, quantity, newPrice, oldPrice, image1, image2, image3, description) {
  // Đặt giá trị vào các trường nhập trong modal chỉnh sửa sản phẩm
  document.querySelector("#add_productID").value = id;
  document.querySelector('#nameInput_add').value = name;
  document.querySelector('#qtyInput_add').value = quantity;
  document.querySelector('#newPriceInput_add').value = newPrice;
  document.querySelector('#oldPriceInput_add').value = oldPrice;
  document.querySelector('#imageFileInput1_add').value = image1;
  document.querySelector('#imageFileInput2_add').value = image2;
  document.querySelector('#imageFileInput3_add').value = image3;
  document.querySelector('#descriptionInput_add').value = description;
  document.querySelector("#myModal_add #content-des").value;
}


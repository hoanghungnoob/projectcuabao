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

// thêm sản phẩm vào datta
function addProducts() {
  var add_productId = document.querySelector("#add_productID").value;
  var name_addproduct = document.querySelector('#nameInput_add').value;
  var quantity = document.querySelector('#qtyInput_add').value;
  var newPrice = document.querySelector('#newPriceInput_add').value;
  var oldPrice = document.querySelector('#oldPriceInput_add').value;
  var image_add1 = document.querySelector('#imageFileInput1_add').value;
  var image_add2 = document.querySelector('#imageFileInput2_add').value;
  var image_add3 = document.querySelector('#imageFileInput3_add').value;
  var description = document.querySelector('#descriptionInput_add').value;
  const content_des = document.querySelector("#myModal_add #content-des").value;
  var data = {
    name: name_addproduct,
    quantity: quantity,
    newPrice: newPrice,
    oldPrice: oldPrice,
    image1: image_add1,
    image2: image_add2,
    image3: image_add3,
    description: description,
    type: "",
    productReviews: 4
  };

  if (add_productId) {
    fetch(`http://localhost:3000/product/${add_productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Add new product susscess")
      fetchUsers();
    });
  } else {
    fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Add new product susscess")
      fetchUsers();
    });
  }
}

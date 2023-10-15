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
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal_add" onclick="edit_product(${product.id},'${product.name}','${product.quantity}','${product.newPrice}','${product.oldPrice}','${product.image1}','${product.image2}','${product.image3}','${product.description}')">Edit</button>

            <button class="delete_btn_product btn btn-danger" data-product-id="${product.id}" onclick="deleteProduct(${product.id})">Delete</button>
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
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



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
      fetchUsers();
    });
  }
}

function deleteProduct(id) {
  fetch(`http://localhost:3000/product/${id}`, {
    method: "DELETE",
  })
    .then(() => fetchProducts())
    .catch(() => {
      alert("Delete fail");
    });
}
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


function increment() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 0;
    var newQty = currentQty + 1;
    if (newQty < 1) {
        newQty = 1;
    }
    inputQty.value = newQty;
}

function decrement() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 0;
    var newQty = currentQty - 1;
    if (newQty < 1) {
        newQty = 1;
    }
    inputQty.value = newQty;
}

// JavaScript code
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch("http://localhost:3000/product")
    .then((res) => res.json())
    .then((data) => {
        var product = false;
        data.forEach(element => {
            if (productId == element.id) {
                product = true;
                if (product) {
                    document.getElementById('product__name').innerHTML = element.name;
                    document.getElementById('main__img').src = element.image1;
                    document.getElementById('item__img1').src = element.image2;
                    document.getElementById('item__img2').src = element.image3;
                    document.getElementById('item__img3').src = element.image1;
                    document.getElementById('new__price').innerHTML = element.newPrice + " VND";
                    document.getElementById('old__price').innerHTML = element.oldPrice + " VND";
                    document.getElementById('describe').innerHTML = element.description;

                    var rating = element.productReviews; 

                    var stars = document.getElementsByClassName("star");

                    for (var i = 0; i < rating; i++) {
                        stars[i].classList.add("selected");
                        console.log(stars[i])
                    }
                } else {
                    document.getElementById("product-detail").innerHTML = "Product not found.";
                }
            }

        });
    });
function choise_product(imgs) {
    main__img.src = imgs.src;
}



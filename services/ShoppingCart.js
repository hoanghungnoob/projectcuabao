
fetch('http://localhost:3000/carts')
  .then(response => response.json())
  .then(data => {
    const dataArray = Array.isArray(data) ? data : [data];
    let cart = "";
    let totalPrice = 0;
    let totalItems = 0;

    // Lấy userID từ local storage
    const localUserID = localStorage.getItem('userId');

    dataArray.forEach((item, index) => {
      // Kiểm tra nếu userID trùng khớp
      if (item.userId === localUserID) {
        cart += `
        <tr id="row_${item.id}">
          <td>
            <div class="product-info">
              <img src="${item.image1}" alt="coffee">
              <div class="product-details">
                <h3>${item.name}</h3>
                <p>Drink</p>
              </div>
            </div>
          </td>
          <td>
            <div class="quantity-container">
              <button class="quantity-button decrease" onclick="decreaseQuantity(${item.id})">-</button>
              <span class="quantity" id="quantity_${item.id}">${item.quantity}</span>
              <button class="quantity-button increase" onclick="increaseQuantity(${item.id})">+</button>
            </div>
          </td>
          <td id="new_price_${item.id}">${item.newPrice}</td>
          <td class="total-price" id="total_price_${item.id}">${item.totalPrice}</td>
          <td><i class="fa-regular fa-trash-can" onclick="deleteItem(${item.id})"></i></td> 
          <td><input type="checkbox" class="custom-checkbox" data-itemid="${item.id}" onchange="calculateTotalPrice()"></td>
        </tr>      
        `;
        totalPrice += item.totalPrice;
        totalItems++;
      }
    });

    document.querySelector(".table-cart").innerHTML = cart;
    document.getElementById("totalItems").textContent = totalItems;
    document.getElementById("allTotalPrice").textContent = "Total Price: " + totalPrice + " VND";
  });
// Hàm để cập nhật giá tổng
function updateTotalPrice(itemId, quantity) {
  const newPriceElement = document.getElementById("new_price_" + itemId);
  const totalPriceElement = document.getElementById("total_price_" + itemId);

  const newPrice = parseFloat(newPriceElement.textContent);
  const totalPrice = newPrice * quantity;
  totalPriceElement.textContent = totalPrice;

  calculateTotalPrice();
}
// Hàm để tăng số lượng sản phẩm
function increaseQuantity(itemId) {
  const quantityElement = document.getElementById("quantity_" + itemId);
  let quantity = parseInt(quantityElement.textContent);
  quantity += 1;
  quantityElement.textContent = quantity;

  updateCartItem(itemId, quantity);
}

// Hàm để giảm số lượng sản phẩm
function decreaseQuantity(itemId) {
  const quantityElement = document.getElementById("quantity_" + itemId);
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity -= 1;
    quantityElement.textContent = quantity;

    updateCartItem(itemId, quantity);
  }
}

// Hàm để cập nhật giá trị `quantity` trong JSON của mục giỏ hàng
function updateCartItem(itemId, quantity) {
  // Gửi yêu cầu PUT hoặc PATCH đến máy chủ
  fetch(`http://localhost:3000/carts/${itemId}`, {
    method: 'PATCH', // Hoặc 'PUT' tùy thuộc vào yêu cầu của máy chủ
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity: quantity }),
  })
  .then(response => {
    if (response.ok) {
      // Cập nhật thành công trên máy chủ
      updateTotalPrice(itemId, quantity);
    } else {
      // Xử lý lỗi nếu có
      console.error('Lỗi cập nhật số lượng sản phẩm');
    }
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Lỗi cập nhật số lượng sản phẩm', error);
  });
}

function deleteItem(itemId) {
  // Gửi yêu cầu DELETE đến máy chủ
  fetch(`http://localhost:3000/carts/${itemId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Xóa thành công trên máy chủ, xóa giao diện người dùng
      const rowElement = document.getElementById("row_" + itemId);
      const checkboxElement = rowElement.querySelector(".custom-checkbox");
      const isChecked = checkboxElement.checked;

      rowElement.remove();
      
      if (isChecked) {
        calculateTotalPrice();
      }
    } else {
      // Xử lý lỗi nếu có
      console.error('Lỗi xóa sản phẩm');
    }
  })
  .catch(error => {
    // Xử lý lỗi nếu có
    console.error('Lỗi xóa sản phẩm', error);
  });
}
function calculateTotalPrice() {
  const checkboxes = document.getElementsByClassName("custom-checkbox");
  const totalPriceElements = document.getElementsByClassName("total-price");
  const allTotalPriceElement = document.getElementById("allTotalPrice");
  let totalPrice = 0;
  let selectedItems = 0;

  // Lặp qua tất cả các sản phẩm
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const totalElement = totalPriceElements[i];

    // Kiểm tra nếu checkbox được chọn
    if (checkbox.checked) {
      const price = parseFloat(totalElement.textContent);
      totalPrice += price;
      selectedItems++;
    }
  }

  // Cập nhật tổng giá và số lượng sản phẩm được chọn vào phần tử HTML
  allTotalPriceElement.textContent = "Total Price: " + totalPrice + " VND";

  return {
    totalPrice: totalPrice,
    selectedItems: selectedItems
  };
}
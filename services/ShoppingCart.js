fetch('http://localhost:3000/carts')
  .then(response => response.json())
  .then(data => {
    const dataArray = Array.isArray(data) ? data : [data];
    var cart = "";
    var totalPrice = 0;
    var totalItems = 0;

    dataArray.map((item, index) => {
      cart += `
      <tr>
        <td>
          <div class="product-info">
            <img src=${item.images} alt="Áo thun">
            <div class="product-details">
              <h3>${item.name}</h3>
              <p>Drink</p>
            </div>
          </div>
        </td>
        <td>
          <div class="quantity-container">
            <button class="quantity-button decrease">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-button increase">+</button>
          </div>
        </td>
        <td id="product_price">${item.price}</td>
        <td id="totalPrice">80.000 VND</td>
        <td><i class="fa-regular fa-trash-can"></i></td> 
        <td><input type="checkbox" class="custom-checkbox"></td> 
      </tr>
      `;

      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;
    });

    document.querySelector(".table-cart").innerHTML = cart;

  // Gắn sự kiện click cho từng nút tăng số lượng
var increaseButtons = document.querySelectorAll('.quantity-button.increase');
increaseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var quantityElement = this.parentNode.querySelector('.quantity');
    var quantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = quantity + 1;
    updateTotalPrice();
  });
});

// Gắn sự kiện click cho từng nút giảm số lượng
var decreaseButtons = document.querySelectorAll('.quantity-button.decrease');
decreaseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var quantityElement = this.parentNode.querySelector('.quantity');
    var quantity = parseInt(quantityElement.innerText);
    if (quantity > 1) {
      quantityElement.innerText = quantity - 1;
    }
    updateTotalPrice();
  });
});

// Gắn sự kiện click cho từng nút xóa sản phẩm
var deleteButtons = document.querySelectorAll('.fa-regular.fa-trash-can');
deleteButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalPrice();
  });
});

// Gắn sự kiện change cho từng checkbox
var checkboxes = document.querySelectorAll('.custom-checkbox');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    updateTotalPrice();
  });
});

// Cập nhật tổng giá tiền và số sản phẩm đã chọn
function updateTotalPrice() {
  var selectedItems = document.querySelectorAll('.custom-checkbox:checked');
  var totalSelectedItems = selectedItems.length;

  var totalPrice = 0;
  var totalPriceElements = document.querySelectorAll('.total-price');
  totalPriceElements.forEach(function(element) {
    var price = parseFloat(element.innerText.replace(' VND', '').replace('.', ''));
    totalPrice += price;
  });


  var totalPriceElement = document.querySelector('.total-price');
  var totalItemsElement = document.querySelector('.total-items');

  totalPriceElement.innerText = formatCurrency(totalPrice * totalSelectedItems);
  totalItemsElement.innerText = totalSelectedItems;
}

// Hàm định dạng số tiền thành chuỗi có dấu phân cách hàng nghìn
function formatCurrency(value) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

updateTotalPrice();
  })
  .catch(error => {
    console.log('Đã xảy ra lỗi:', error);
  });
// Hàm mở modal và truyền id của khách hàng vào modal
function openUpdateModal(customerId) {
  var modal = document.getElementById('exampleModal_Item');
  var recipientNameInput = document.getElementById('recipient-name_Item');
  var recipientEmailInput = document.getElementById('recipient-email_Item');
  var recipientPhoneInput = document.getElementById('recipient-phone_Item');
  var recipientAddressInput = document.getElementById('recipient-address_Item');

  // Gán giá trị customerId vào thuộc tính data-bs-whatever của nút "Update" trong modal
  var updateButton = modal.querySelector('.btn-primary');
  updateButton.setAttribute('data-bs-whatever', customerId);

  // Lấy thông tin khách hàng từ server dựa trên customerId
  fetch(`http://localhost:3000/customer/${customerId}`)
    .then(response => response.json())
    .then(customer => {
      recipientNameInput.value = customer.name;
      recipientEmailInput.value = customer.email;
      recipientPhoneInput.value = customer.phoneNumber;
      recipientAddressInput.value = customer.address;
    })
    .catch(error => {
      console.log('Error:', error);
    });

}


// Hàm gắn sự kiện click cho nút "Update" của từng khách hàng
function attachUpdateEventListeners() {
  var updateButtons = document.querySelectorAll('.update_btn_product');
  updateButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      var customerId = event.target.getAttribute('data-bs-whatever');
      openUpdateModal(customerId);
    });
  });
}

// Hàm fetch danh sách khách hàng và gắn sự kiện click cho nút "Update"
function fetchCustomers() {
  fetch('http://localhost:3000/customer')
    .then(response => response.json())
    .then(data => {
      var listCustomerTable = document.getElementById('list_customer');
      var tableBody = listCustomerTable.createTBody();
      data.forEach(customer => {
        var row = tableBody.insertRow();
        row.innerHTML = `
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.phoneNumber}</td>
          <td>${customer.address}</td>
          <td>
            <button class="update_btn_product" data-bs-toggle="modal" data-bs-target="#exampleModal_Item" data-bs-whatever="${customer.id}">Update</button>
            <button class="delete_btn_product">Delete</button>
          </td>
        `;
      });
      // Gắn sự kiện click cho nút "Update" của từng khách hàng
      attachUpdateEventListeners();
      
    });
}

// Gọi hàm fetchCustomers để lấy danh sách khách hàng và gắn sự kiện click cho nút "Update" khi tải trang
fetchCustomers();


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
            <button id="update_btn_product">Update</button>
            <button id="delete_btn_product" onclick="delete_customer(${customer.id})">Delete</button>
            <button class="update_btn_product">Update</button>
            <button class="delete_btn_product" onclick="delete_customer(${customer.id})">Delete</button>
          </td>
        `;
      });
    });
}
fetchCustomers();


// delete customer
// function delete_customer(id) {
//   fetch(`http://localhost:3000/customer/${id}`, {
//     method: "DELETE",
//   })
//     .then(() => {
//       alert("Delete success");
//       fetchCustomers(); // Gọi lại hàm fetchCustomers() để cập nhật danh sách khách hàng sau khi xóa
//     })
//     .catch(() => {
//       alert("Delete fail");
//     });
// }

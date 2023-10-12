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
            
          </td>
        `;
      });
    });
}
fetchCustomers();

const customerForm = document.getElementById("cusForm");
customerForm.addEventListener("submit", createCustomer);
function createCustomer (){
  console.log("Quy cute fo mai que");
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const roleId = document.getElementById("role_id").value;
  const address = document.getElementById("address").value;
  const customer = {
    name: name,
    password: password,
    phoneNumber: phone,
    email: email,
    roleId: roleId,
    address: address
  };
  localStorage.setItem("customer", JSON.stringify(customer));

  fetch("http://localhost:3000/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(customer)
  })
  .then(response => {
    if (response.ok) {
      console.log("Customer added successfully!");
    } else {
      console.log("Failed to add customer.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
};

// delete customer
function delete_customer(id) {
  fetch(`http://localhost:3000/customer/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      alert("Delete success");
      fetchCustomers(); // Gọi lại hàm fetchCustomers() để cập nhật danh sách khách hàng sau khi xóa
    })
    .catch(() => {
      alert("Delete fail");
    });
}

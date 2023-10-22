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
          <button id="update_btn_product" class="btn btn-primary" onclick="update_customer(${customer.id})">Update</button>
            <button id="delete_btn_product" onclick="delete_customer(${customer.id})">Delete</button>
         
          </td>
        `;
      });
    });
}
fetchCustomers();

const customerForm = document.getElementById("cusForm");
customerForm.addEventListener("submit", createCustomer);
function createCustomer() {
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
    roleId: parseInt(roleId),
    address: address
  };

  fetch("http://localhost:3000/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(customer)
  })
    .then(response => {
      if (response.ok) {
        Swal.fire("Thêm khách hàng thành công!", "", "success");
      } else {
        Swal.fire("Thêm khách hàng thất bại!", "", "error");
      }
    })
    .catch(error => {
      console.error("Lỗi:", error);
      Swal.fire("Lỗi", "Đã xảy ra lỗi khi thêm khách hàng", "error");
    });
}
// delete customer
function delete_customer(id) {
  Swal.fire({
    title: "Xác nhận xóa",
    text: "Bạn có chắc chắn muốn xóa khách hàng này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
    confirmButtonColor: "rgb(50, 50, 216)",
    cancelButtonColor: "rgb(220, 53, 69)",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/customer/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchCustomers();
          Swal.fire("Xóa thành công", "", "success");
        })
        .catch(() => {
          Swal.fire("Xóa thất bại", "", "error");
        });
    }
  });
}

function update_customer(id) {

  fetch(`http://localhost:3000/customer/${id}`)
    .then(response => response.json())
    .then(customer => {

      document.getElementById('name').value = customer.name;
      document.getElementById('password').value = customer.password;
      document.getElementById('phone').value = customer.phoneNumber;
      document.getElementById('email').value = customer.email;
      document.getElementById('role_id').value = customer.roleId;
      document.getElementById('address').value = customer.address;

      document.getElementById('main_title').innerHTML = "Update Customer";
      document.getElementById('sub').innerHTML = "Update";
      document.getElementById('sub').style.backgroundColor = "rgb(50, 50, 216)";


      document.getElementById('modal-header').style.backgroundColor = "rgb(50, 50, 216)"
      var modal = new bootstrap.Modal(document.getElementById('myModal'));
      modal.show();

      document.getElementById('cusForm').onsubmit = function (event) {
        event.preventDefault();
        var updatedCustomer = {
          name: document.getElementById('name').value,
          password: document.getElementById('password').value,
          phoneNumber: document.getElementById('phone').value,
          email: document.getElementById('email').value,
          role_id: parseInt(document.getElementById('role_id').value),
          address: document.getElementById('address').value

        };


        fetch(`http://localhost:3000/customer/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
          if (response.ok) {
            Swal.fire("Cập nhật thành công", "", "success");
            fetch('http://localhost:3000/customer') // Refresh the customer table
          } else {
            Swal.fire("Cập nhật thất bại", "", "error");
          }
        })
        .catch(() => {
          Swal.fire("Lỗi", "Đã xảy ra lỗi khi cập nhật thông tin khách hàng", "error");
        });
      };
    })
    .catch(() => {
      alert("Error retrieving customer data");
    });
}

// kiểm tra xem là loại form nào 

function refreshModal() {
  // Thực hiện các thao tác cần thiết để refresh modal tại đây
  location.reload(); // Refresh lại trang web hoặc phần modal
}

// 

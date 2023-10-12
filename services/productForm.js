// function openUpdateModal() {
//   // Lấy thông tin sản phẩm từ bảng
//   var id = document.getElementById("id").innerText;
//   var name = document.getElementById("name").innerText;
//   var price = document.getElementById("price").innerText;
//   var quantity = document.getElementById("quantity").innerText;
//   var description = document.getElementById("description").innerText;
//   // Điền thông tin sản phẩm vào các trường trong modal cập nhật
//   document.getElementById("nameInput").value = name;
//   document.getElementById("qtyInput").value = quantity;
//   document.getElementById("newPriceInput").value = price;
//   document.getElementById("descriptionInput").value = description;
//   // Xử lý sự kiện cập nhật
//   document.getElementById("myModal").querySelector(".modal-footer button").onclick = function () {
//     update(id);
//   };
// }
// function update(id) {
//   // Lấy thông tin sản phẩm từ các trường trong modal cập nhật
//   var name = document.getElementById("nameInput").value;
//   var quantity = document.getElementById("qtyInput").value;
//   var newPrice = document.getElementById("newPriceInput").value;
//   var description = document.getElementById("descriptionInput").value;
//   // Gửi yêu cầu cập nhật sản phẩm đến server
//   fetch('/database/data.json')
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // Tìm sản phẩm cần cập nhật trong danh sách sản phẩm
//       var product = data.find(function (item) {
//         return item.id === id;
//       });
//       if (product) {
//         // Cập nhật thông tin sản phẩm
//         product.name = name;
//         product.quantity = quantity;
//         product.price = newPrice;
//         product.description = description;
//         // Lưu trữ dữ liệu cập nhật vào tệp data.json
//         saveDataToJson(data);
//       }
//     })
//     .catch(function (error) {
//       console.log('Error:', error);
//     });
//   // Đóng modal cập nhật
//   var modal = document.getElementById("myModal");
//   var modalInstance = bootstrap.Modal.getInstance(modal);
//   modalInstance.hide();
// }
// function saveDataToJson(data) {
//   // Gửi yêu cầu lưu trữ dữ liệu vào tệp data.json trên server
//   fetch('data.json', {
//     method: 'PUT', // Phương thức PUT để ghi đè dữ liệu trong tệp
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(function (response) {
//       if (response.ok) {
//         console.log('Data saved successfully');
//       } else {
//         console.log('Failed to save data');
//       }
//     })
//     .catch(function (error) {
//       console.log('Error:', error);
//     });
// }
// const productForm = document.querySelector(#modal - body);

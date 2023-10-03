document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn chặn gửi biểu mẫu

  // Lấy dữ liệu từ biểu mẫu
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("phone").value;
  var message = document.getElementById("message").value;


  // Tạo một đối tượng chứa dữ liệu
  var data = {
    name: name,
    email: email,
    phoneNumber: phone,
    message: message
  };

  // Lấy dữ liệu hiện có từ tệp JSON (nếu có)
  var existingData = [];
  if (localStorage.getItem("messages")) {
    existingData = JSON.parse(localStorage.getItem("messages"));
  }

  // Thêm dữ liệu mới vào mảng
  existingData.push(data);

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("messages", JSON.stringify(existingData));

  document.getElementById("messageSent").style.display = "block";
  document.getElementById("contactForm").reset();
});


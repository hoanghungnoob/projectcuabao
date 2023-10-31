function goBack() {
  window.history.back();
}
function fetch_cus() {
  let userData;
  const hashKey = "Abcd123@";
  const token = localStorage.getItem("token");

  const decryptedUserInfo = CryptoJS.AES.decrypt(token, hashKey).toString(
    CryptoJS.enc.Utf8
  );

  if (decryptedUserInfo) {
    userData = JSON.parse(decryptedUserInfo);
  }

  return userData;
}

const userId = fetch_cus().userId;

document.getElementById("updateBtn").style.display = "none";
function enableEdit() {
  const inputFields = document.querySelectorAll(".input_show");
  const editBtn = document.getElementById("editBtn");
  const updateBtn = document.getElementById("updateBtn");

  inputFields.forEach((input) => {
    input.readOnly = false;

    input.style.backgroundColor = "lightgray";
  });

  editBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
}
function updateData() {
  const inputFields = document.querySelectorAll(".input_show");
  const editBtn = document.getElementById("editBtn");
  const updateBtn = document.getElementById("updateBtn");

  const data = {
    name: document.getElementById("show_name").value,
    roleId: 2,
    password: document.getElementById("show_password").value,
    phoneNumber: document.getElementById("show_phone").value,
    email: document.getElementById("show_email").value,
    address: document.getElementById("show_address").value,
    avatar: document.getElementById("upload-img").src,
  };

  update_cus(userId, data);

  inputFields.forEach((input) => {
    input.readOnly = true;
    input.style.backgroundColor = "white";
  });

  editBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
}

var roleId = localStorage.getItem("roleId");
function fetch_cus() {
  if (roleId == 1) {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        document.getElementById("name_user1").innerHTML = user.name;
        document.getElementById("upload-img").src = user.avatar;
        document.getElementById("show_name").value = user.name;
        document.getElementById("show_email").value = user.email;
        document.getElementById("show_phone").value = user.phoneNumber;
        document.getElementById("show_password").value = user.password;
        document.getElementById("show_address").value = user.address;
        document.getElementById("update").style.display = "none";
      });
  } else {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        document.getElementById("name_user1").innerHTML = user.name;
        document.getElementById("upload-img").src = user.avatar;
        document.getElementById("show_name").value = user.name;
        document.getElementById("show_email").value = user.email;
        document.getElementById("show_phone").value = user.phoneNumber;
        document.getElementById("show_password").value = user.password;
        document.getElementById("show_address").value = user.address;
        document.getElementById("update").style.display = "none";
      });
  }
}
fetch_cus();

function update_cus(id, data) {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire("Cập nhật thành công", "", "success");
        fetch("http://localhost:3000/users"); // Refresh the users table
      } else {
        Swal.fire("Cập nhật thất bại", "", "error");
      }
    })
    .catch(() => {
      Swal.fire(
        "Lỗi",
        "Đã xảy ra lỗi khi cập nhật thông tin khách hàng",
        "error"
      );
    });
}

function uploadFile() {
  const uploadInput = document.getElementById("upload-input");
  const uploadImg = document.getElementById("upload-img");

  const file = uploadInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    uploadImg.src = event.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

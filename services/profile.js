function goBack() {
  window.history.back();
}
function viewMore() {
  document.getElementById('list_order').style.height = "auto";
  document.getElementById('hide_list').style.display = "block";
  document.getElementById('view_more').style.display = "none";
}
document.getElementById('hide_list').style.display = "none";

function hideListOrder() {
  document.getElementById('list_order').style.height = "300px";
  document.getElementById('list_order').style.overflow = "hidden";

  document.getElementById('hide_list').style.display = "none";
  document.getElementById('view_more').style.display = "block";
}
function getUserData() {
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

const userData = getUserData();

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

  update_cus(userData?.id, data);

  inputFields.forEach((input) => {
    input.readOnly = true;
    input.style.backgroundColor = "white";
  });

  editBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
}


function hashPassword(password) {
  const hashedPassword = CryptoJS.SHA256(password).toString();
  return hashedPassword;
}

function fetch_cus() {
  if (userData.roleId == 1) {
    fetch(`https://coffee-web-api-dkrq.onrender.com/users/${userData?.id}`)
      .then((response) => response.json())
      .then((customer) => {
        document.getElementById("name_user1").innerHTML = customer.name;
        document.getElementById("upload-img").src = customer.avatar;
        document.getElementById("show_name").value = customer.name;
        document.getElementById("show_email").value = customer.email;
        document.getElementById("show_phone").value = customer.phoneNumber;
        document.getElementById("show_password").value = hashPassword(customer.password);
        document.getElementById("show_address").value = customer.address;
        document.getElementById("update").style.display = "none";
      });
  } else {
    fetch(`https://coffee-web-api-dkrq.onrender.com/users/${userData?.id}`)
      .then((response) => response.json())
      .then((customer) => {
        document.getElementById("name_user1").innerHTML = customer.name;
        document.getElementById("upload-img").src = customer.avatar;
        document.getElementById("show_name").value = customer.name;
        document.getElementById("show_email").value = customer.email;
        document.getElementById("show_phone").value = customer.phoneNumber;
        document.getElementById("show_password").value = hashPassword(customer.password);
        document.getElementById("show_address").value = customer.address;
        // document.getElementById("update").style.display = "none";
      });
  }
}

fetch_cus();

function update_cus(id, data) {
  fetch(`https://coffee-web-api-dkrq.onrender.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire("Cập nhật thành công", "", "success");
        fetch("https://coffee-web-api-dkrq.onrender.com/users"); // Refresh the customer table
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


const bgImageEl = document.getElementById("bg-image");

window.addEventListener("scroll", () => {
  updateImage();
});

function updateImage() {
  bgImageEl.style.opacity = 1 - window.pageYOffset / 900;
  bgImageEl.style.backgroundSize = 160 - window.pageYOffset / 12 + "%";
}

function getUserData1() {
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
const user_id = getUserData1().id;
async function getOrder() {
  const listOrderElement = document.getElementById("list_order");

  try {
    // Fetch order data
    const customerResponse = await fetch(`https://coffee-web-api-dkrq.onrender.com/users/${user_id}`);
    const customerData = await customerResponse.json();

    // Fetch order data
    const orderResponse = await fetch("https://coffee-web-api-dkrq.onrender.com/orders");
    const orderData = await orderResponse.json();
    console.log(orderData, "odsdfs");

    // Fetch product data
    const productResponse = await fetch("https://coffee-web-api-dkrq.onrender.com/products");
    const productData = await productResponse.json();

    // Filter orders for the customer
    const orderedProducts = orderData.filter((order) => order.customerId == user_id);
    console.log(orderedProducts, "qunr");
    let data = "";
    orderedProducts.forEach((order) => {
      order.productId.forEach((productId) => {
        const product = productData.find((product) => product.id == productId);

        if (product) {
          data += `
            <li>
              <h2>Product: ${product.name}</h2>
              <p>Quantity: ${order.quantity}</p>
              <p>Price per unit: ${product.newPrice} VND</p>
              <p>Total: ${order.quantity * product.newPrice} VND</p>
              <button class="view-btn" onclick="displayProductBill(${product}); data-product-id="${product.id}">View</button>
            </li>
          `;
         
        }
        
      });
      
    });
    
    listOrderElement.innerHTML = data;

   
  } catch (error) {
    console.log(data);
  }
}



  getOrder();
  function displayProductBill(product) {
    const billContainer = document.createElement("div");
    billContainer.classList.add("bill-container");
  
    const billHTML = `
      <h2>Product: ${product.name}</h2>
      <p>Price: ${product.newPrice} VND</p>
      <p>Description: ${product.description}</p>
      <p>Image: <br><img src="${product.image}" alt="${product.name}"></p>
      <button id="bill-ok-btn">OK</button>
      <button id="bill-cancel-btn">Cancel</button>
    `;
  
    billContainer.innerHTML = billHTML;
  
    document.body.appendChild(billContainer);
    
    // Add click event listeners to OK and Cancel buttons
    const okButton = document.getElementById("bill-ok-btn");
    okButton.addEventListener("click", () => {
      document.body.removeChild(billContainer);
    });
  
    const cancelButton = document.getElementById("bill-cancel-btn");
    cancelButton.addEventListener("click", () => {
      document.body.removeChild(billContainer);
    });
  }
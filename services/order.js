//location
const provinceSelect = document.getElementById("province__order");
const districtSelect = document.getElementById("district__order");
const provinceUrl = "http://localhost:3000/provinces";
const districtUrl = "http://localhost:3000/districts";

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

const { id: user_id, roleId: role_Id } = userData;

fetch(provinceUrl)
  .then((data) => data.json())
  .then((data) => {
    const provinces = data;
    provinces.forEach(function (province) {
      var option = document.createElement("option");
      option.value = province.code;
      option.text = province.name;
      provinceSelect.appendChild(option);
    });

    provinceSelect.addEventListener("change", function () {
      var selectedProvinceCode = provinceSelect.value;

      fetch(`${districtUrl}?parent_code=${selectedProvinceCode}`)
        .then((data) => data.json())
        .then((data) => {
          const districts = data;
          districtSelect.innerHTML = "";

          districts.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district.code;
            option.text = district.name;
            districtSelect.appendChild(option);
          });
        });
    });
  });
function redirectToOrderPage(productId) {
  window.location.href = `/page/order/order.html?id=${productId}`;
}

const urlParams3 = new URLSearchParams(window.location.search);
const productId1 = urlParams3.get("id");

function product_order_detail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      var product = false;
      const productList = data;

      productList.forEach((element) => {
        if (productId == element.id) {
          product = true;
          var productDetailHTML = "";

          if (product) {
            document.getElementById("price__order").innerHTML =
              element.newPrice * quantity_order_after + " VND";
            document.getElementById("product__img__order").src = element.image1;
            document.getElementById("procuct__name__order").innerHTML =
              element.name;
            document.getElementById("product__price__order").innerHTML =
              element.newPrice + " VND";
            document.getElementById("product__quantity__order").innerHTML =
              document.get("input__qty").value;
          } else {
            document.getElementById("product-detail").innerHTML =
              "Product not found.";
          }
        }
      });
    });
}
var urlParams1 = new URLSearchParams(window.location.search);
var quantity_detail = urlParams1.get("quantity");

if (quantity_detail == null || quantity_detail == NaN) {
  var quantity_order_after = (document.getElementById(
    "quantity_order"
  ).innerHTML = 1);
} else {
  var quantity_order_after = (document.getElementById(
    "quantity_order"
  ).innerHTML = quantity_detail);
}

function useCustomerData(customerId) {
  if (role_Id == 2) {
    fetch(`http://localhost:3000/users?id=${customerId}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          document.getElementById("name__order").value = element.name;
          document.getElementById("customerID__order").value = element.id;
          document.getElementById("email__order").value = element.email;
          document.getElementById("phone__order").value = element.phoneNumber;
          document.getElementById("address__order").value = element.address;
          document.getElementById("date__order").value = getCurrentTime();
        });
      })
      .catch((error) => {});
  } else {
    fetch(`http://localhost:3000/users?id=${customerId}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          document.getElementById("name__order").value = element.name;
          document.getElementById("customerID__order").value = element.id;
          document.getElementById("email__order").value = element.email;
          document.getElementById("phone__order").value = element.phoneNumber;
          document.getElementById("address__order").value = element.address;
          document.getElementById("date__order").value = getCurrentTime();
        });
      })
      .catch((error) => {});
  }
}

useCustomerData(user_id);

function getDataFormOrder() {
  product_order_detail();
  var fullName = document.getElementById("name__order").value;
  var customerID = document.getElementById("customerID__order").value;
  const productId2 = productId1;
  var email = document.getElementById("email__order").value;
  var phoneNumber = document.getElementById("phone__order").value;
  var address = document.getElementById("address__order").value;
  var province = document.getElementById("province__order").value;
  var district = document.getElementById("district__order").value;
  var productName = document.getElementById("procuct__name__order").textContent;
  var productPrice = document.getElementById(
    "product__price__order"
  ).textContent;
  var quantity = document.getElementById("quantity_order").textContent;
  var totalPrice = document.getElementById("price__order").textContent;
  var date = document.getElementById("date__order").value;

  var data = {
    name: fullName,
    customerId: customerID,
    productId: productId2,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    province: province,
    district: district,
    productName: productName,
    productPrice: productPrice,
    quantity: quantity,
    totalPrice: totalPrice,
    date: date,
  };

  return data;
}
getDataFormOrder();

function placeOrder() {
  if (user_id) {
    var data = getDataFormOrder();

    if (
      !data.name ||
      !data.email ||
      !data.phoneNumber ||
      !data.address ||
      !data.province ||
      !data.district ||
      !data.quantity
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Đơn hàng của bạn đã được gửi thành công!",
          showConfirmButton: true,
        });
      })
      .catch((error) => {});

    // date time
    var date__order = "";
    function getCurrentTime() {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1;
      var day = currentDate.getDate();

      // Định dạng lại đối tượng thời gian
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }

      var formattedDate = year + "-" + month + "-" + day;
      date__order = formattedDate;
      document.getElementById("date__order").innerHTML = date__order;
    }

    getCurrentTime();
  } else {
    // Không có userId trong LocalStorage
    alert("Bạn phải đăng nhập!");
  }
}

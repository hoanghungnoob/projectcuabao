//location
const provinceSelect = document.getElementById('province__order');
const districtSelect = document.getElementById('district__order');
const provinceUrl = 'http://localhost:3000/province';
const districtUrl = 'http://localhost:3000/district';

// Function fetch dữ liệu từ API
function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Đã xảy ra lỗi:', error);
    });
}

// Fetch dữ liệu tỉnh từ localhost
fetchData(provinceUrl)
  .then(data => {
    console.log('Dữ liệu tỉnh:', data);
    const provinces = data;
    // Đẩy dữ liệu tỉnh vào select tỉnh
    provinces.forEach(function (province) {
      var option = document.createElement('option');
      option.value = province.code;
      option.text = province.name;
      provinceSelect.appendChild(option);
    });

    // Xử lý sự kiện khi chọn tỉnh
    provinceSelect.addEventListener('change', function () {
      var selectedProvinceCode = provinceSelect.value;

      // Fetch dữ liệu huyện từ localhost dựa trên mã tỉnh đã chọn
      fetchData(`${districtUrl}?parent_code=${selectedProvinceCode}`)
        .then(data => {
          console.log('Dữ liệu huyện:', data);
          const districts = data;
          // Xóa tất cả các option cũ trong select huyện
          districtSelect.innerHTML = '';
    
          // Đẩy dữ liệu huyện vào select huyện
          districts.forEach(function (district) {
            var option = document.createElement('option');
            option.value = district.code;
            option.text = district.name;
            districtSelect.appendChild(option);
          });
        });
    });
  });
//chuyển về trang order khi nhất button
function redirectToOrderPage(productId) {
  window.location.href = `/page/order/order.html?id=${productId}`;

}



const urlParams3 = new URLSearchParams(window.location.search);
const productId1 = urlParams3.get('id');

function product_order_detail() {

  // JavaScript code
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  fetch("http://localhost:3000/product")
    .then((res) => res.json())
    .then((data) => {
      var product = false;
      const productList = data;

      productList.forEach(element => {
        if (productId == element.id) {
          product = true;
          var productDetailHTML = '';

          if (product) {
            document.getElementById('price__order').innerHTML = element.newPrice * quantity_order_after + " VND";
            document.getElementById('product__img__order').src = element.image1;
            document.getElementById('procuct__name__order').innerHTML = element.name;
            document.getElementById('product__price__order').innerHTML = element.newPrice + " VND";
            document.getElementById('product__quantity__order').innerHTML = document.get('input__qty').value;} else {
              document.getElementById("product-detail").innerHTML = "Product not found.";
            }
          }
  
        });
      });
  
  }
  var urlParams1 = new URLSearchParams(window.location.search);
  var quantity_detail = urlParams1.get('quantity');
  
  if (quantity_detail == null || quantity_detail == NaN) {
    var quantity_order_after = document.getElementById("quantity_order").innerHTML = 1;
  }
  else {
    var quantity_order_after = document.getElementById("quantity_order").innerHTML = quantity_detail;
  }
  
  function useCustomerData(customerId) {
    fetch(`http://localhost:3000/customer?id=${customerId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"hello")
        data.forEach((element)=>{
          console.log(element)
          document.getElementById('name__order').value = element.name;
          document.getElementById('customerID__order').value = element.id;
          document.getElementById('email__order').value = element.email;
          document.getElementById('phone__order').value = element.phoneNumber;
          document.getElementById('address__order').value = element.address;
          // Gán giá trị mặc định cho các ô select province và district
          document.getElementById('date__order').value = getCurrentTime();
          
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  useCustomerData(11);
  function getDataFormOrder() {
    product_order_detail();
    var fullName = document.getElementById('name__order').value;
    var customerID = document.getElementById('customerID__order').value;
    const productId2 = productId1;
    var email = document.getElementById('email__order').value;
    var phoneNumber = document.getElementById('phone__order').value;
    var address = document.getElementById('address__order').value;
    var province = document.getElementById('province__order').value;
    var district = document.getElementById('district__order').value;
    var productName = document.getElementById('procuct__name__order').textContent;
    var productPrice = document.getElementById('product__price__order').textContent;
    var quantity = document.getElementById('quantity_order').textContent;
    var totalPrice = document.getElementById('price__order').textContent;
    var date = document.getElementById('date__order').value;
    console.log(province);
    
  
    var data = {
      name: fullName,
      customerId: customerID,
      productId :productId2,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      province: province,
      district: district,
      productName: productName,
      productPrice: productPrice,
      quantity: quantity,
      totalPrice: totalPrice,
      date:date
    };
  
    return data;
  }
  getDataFormOrder()
  function placeOrder() {
    var data = getDataFormOrder();
  
    // Kiểm tra các trường nhập liệu bắt buộc
    if (!data.name || !data.email || !data.phoneNumber || !data.address || !data.province || !data.district || !data.quantity) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
  
    // Gửi dữ liệu đi
    fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        // Hiển thị thông báo thành công
        Swal.fire({
          icon: "success",
          title: "Đơn hàng của bạn đã được gửi thành công!",
          showConfirmButton: true,
        });
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
      });
  }
// date time
var date__order = "";
function getCurrentTime() {
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1;
var day = currentDate.getDate();

// Định dạng lại đối tượng thời gian
if (month < 10) {
month = '0' + month;
}
if (day < 10) {
day = '0' + day;
}

var formattedDate = year + '-' + month + '-' + day;
date__order = formattedDate;
document.getElementById("date__order").innerHTML = date__order;

}
getCurrentTime();

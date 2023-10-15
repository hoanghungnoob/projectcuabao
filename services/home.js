function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("opacity").style.display = "block";
    document.getElementById('open_sideBar').style.opacity = 0;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("opacity").style.display = "none";
    document.getElementById('open_sideBar').style.opacity = 1;

}
fetch("http://localhost:3000/product")
    .then((res) => res.json())
    .then((data) => {
        const productList = data;

        const productHTML = productList.map((product) => {
            return `
            <div class="product">
                    <a target="_self" id="card" href="/page/product/ProductDetail/ProductDetail.html?id=${product.id}" onclick="loadContent(/page/product/ProductDetail/ProductDetail.html)">
                            <p id="evaluate1">${product.productReviews}<i class="material-symbols-outlined">star</i></p>
                            <img id="main_img" src="${product.image1}" alt="${product.name}">
                            <h2>${product.name}</h2>
                            <div class="price">
                                <p>${product.newPrice} VND</p>
                                <p>${product.oldPrice} VND</p>
                            </div>
                            </a>
                            <div class="descriptiom_and_btn">
                                <p>${product.description}</p>
                                <div>
                                <a target="_self" href="/page/product_detail/product_detail.html?id=${product.id}">
                                <button id="btn_view">View</button>
                                </a>
                                <a><button onclick="redirectToOrderPage(${product.id})"><i id="icon_cart" class="fas fa-shopping-cart"></i>Buy</button></a>

                                </div>
                                </div>
                            </div>
                       
                    `;
        });

        // Gắn nối chuỗi HTML vào phần tử có id "product"
        document.getElementById("product").innerHTML = `
                    <div class="product-container">
                        ${productHTML.join("")}
                    </div>
                `;
        document.getElementById("product1").innerHTML = `
                    <div class="product-container">
                        ${productHTML.join("")}
                    </div>
                `;
        document.getElementById("card_top").innerHTML = `
                    <div class="product-container_top">
                        ${productHTML.join("")}
                    </div>
                `;



    });
const menuIcon = document.querySelector(".navbar_menu-icon")
const navList = document.querySelector(".navbar__ul");
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle("active");
    navList.classList.toggle("active")

})

// function loadContent(page) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onload = function() {
//       if (this.status == 200) {
//         document.getElementById("content").innerHTML = this.responseText;
//       } else {
//         console.error("Error loading page:", this.status, this.statusText);
//       }
//     };
//     xhttp.open("GET", page, true);
//     xhttp.send();
//   }



// // Lấy thông tin về vai trò của người dùng từ URL hoặc localStorage/sessionStorage
// const urlParams = new URLSearchParams(window.location.search);
// const userRole = urlParams.get("roleId"); // hoặc localStorage.getItem("userRole");

// console.table("hello", typeof userRole)
// // for(var a = 0; a < )
// // Kiểm tra vai trò và thực hiện việc ẩn các phần tử tương ứng
// if (userRole == 1) {
//   // Quyền truy cập Home
//   alert("Đăng nhập thành công admin");
//   // Hiển thị toàn bộ phần tử trên trang home
// } else if (userRole ==  2) {
//   // Quyền truy cập Order
//   alert("Đăng nhập thành công customer");
//   // Ẩn các phần tử không cần thiết trên trang home
//   const managementElement = document.getElementById("management");
//   const loginElement = document.getElementById("login");
//   const signupElement = document.getElementById("signup");
//   managementElement.style.display = "none";
//   loginElement.style.display = "none";
//   signupElement.style.display = "none";
// } else {
//   // Sai thông tin đăng nhập hoặc không có thông tin vai trò
//   alert("Sai thông tin đăng nhập hoặc không có thông tin vai trò");
// }
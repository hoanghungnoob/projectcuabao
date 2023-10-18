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
                    <a target="_self" id="card" href="/page/product/ProductDetail/ProductDetail.html?id=${product.id}" >
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

                                <a target="_self" href="/page/product/ProductDetail/ProductDetail.html?id=${product.id}">
                                <button id="btn_view">View</button>
                                </a>
                                
                                <a><button id="btn_buy" onclick="redirectToOrderPage(${product.id})"><i id="icon_cart" class="fas fa-shopping-cart"></i>Buy</button></a>

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


// login

// Get the logged-in user data from local storage
const loggedInUser = localStorage.getItem('loggedInUser');

// Check if the user is logged in
if (loggedInUser) {
  // Parse the logged-in user data
  const user = JSON.parse(loggedInUser);
  console.log(user)

  // Access the user properties as needed
  const userName = user.name;
  const userRoleId = user.roleId;

  // Display personalized content based on the user data
  const welcomeMessage = document.getElementById("welcomeMessage");
  const roleSpecificContent = document.getElementById("roleSpecificContent");

  welcomeMessage.textContent = `Welcome, ${userName}!`;

  if (userRoleId === 1) {
    roleSpecificContent.textContent = "You are logged in as role 1.";
    // Add role-specific logic or content for role 1
  } else if (userRoleId === 2) {
    roleSpecificContent.textContent = "You are logged in as role 2.";
    // Add role-specific logic or content for role 2
  }
} else {
  // Redirect the user to the login page if not logged in
  window.location.href = "/page/login/login.html";
}
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
// JavaScript code
fetch("http://localhost:3000/product")
    .then((res) => res.json())
    .then((data) => {
        const productList = data;
        const productHTML = productList.map((product) => {
            return `
            <div class="product">
                    <a target="_self" id="card" href="/page/product_detail/product_detail.html?id=${product.id} ">
                            <p id="evaluate1">${product.productReviews}<i class="material-symbols-outlined">star</i></p>
                            <img id="main_img" src="${product.image1}" alt="${product.name}">
                            <h2>${product.name}</h2>
                            <div class="price">
                                <p>${product.newPrice} VND</p>
                                <p>${product.oldPrice} VND</p>
                            </div>
                            <div class="descriptiom_and_btn">
                            <p>${product.description}</p>
                            <div>
                            
                            <button>View</button>
                            <button><i id="icon_cart" class="fas fa-shopping-cart"></i>Buy</button>
                            
                            </div>
                            </div>
                            </a>
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
    
    
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("opacity").style.display = "block";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("opacity").style.display = "none";

  }
// JavaScript code
fetch("/database/db.json")
    .then((res) => res.json())
    .then((data) => {
        const productList = data.product;

        const productHTML = productList.map((product) => {
            return `
            <div class="product">
            <a target="_blank" id="card" href="/page/product_detail/product_detail.html?id=${product.id} ">
                            <p id="evaluate">${product.productReviews}<i class="material-symbols-outlined">star</i></p>
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
                                
                                 <button>View</button>
                                <button><i id="icon_cart" class="fas fa-shopping-cart"></i>Buy</button>

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

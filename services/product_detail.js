function increment() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 0;
    var newQty = currentQty + 1;
    inputQty.value = newQty;

}

function decrement() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 0;
    var newQty = currentQty - 1;
    if (newQty < 0) {
        newQty = 0;
    }
    inputQty.value = newQty;

}

// JavaScript code
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch("/database/db.json")
    .then((res) => res.json())
    .then((data) => {
        var product = false;
        const productList = data.product;
        data.product.forEach(element => {
            if (productId == element.id) {
                product = true;
                var productDetailHTML = '';

                if (product) {
                    document.getElementById('product__name').innerHTML = element.name;
                    document.getElementById('main__img').src = element.image;
                    document.getElementById('item__img1').src = element.image;
                    document.getElementById('item__img2').src = element.image;
                    document.getElementById('item__img3').src = element.image;
                    document.getElementById('new__price').innerHTML = "$" + element.newPrice ;
                    document.getElementById('old__price').innerHTML ="$" +  element.oldPrice;

                    document.getElementById('describe').innerHTML = element.description;

                } else {
                    document.getElementById("product-detail").innerHTML = "Product not found.";
                }
            }

        });
    });

    // JavaScript code
    fetch("/database/db.json")
    .then((res) => res.json())
    .then((data) => {
        const productList = data.product;

        const productHTML = productList.map((product) => {
            return `
            <a target="_blank" id="card" href="/page/product_detail/product_detail.html?id=${product.id} ">
                <div class="product">
                    <p id="evaluate">4.8<i class="material-symbols-outlined">star</i></p>
                    <img id="main_img" src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <div class="price">
                        <p>$${product.newPrice}</p>
                        <p>$${product.oldPrice}</p>
                    </div>
                    <div class="descriptiom_and_btn">
                        <p>${product.description}</p>
                        <button><i id="icon_cart" class="fas fa-shopping-cart"></i></button>
                    </div>
                </div></a>
               
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

    });
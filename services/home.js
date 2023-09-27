
// JavaScript code
fetch("/database/db.json")
    .then((res) => res.json())
    .then((data) => {
        const productList = data.product;

        const productHTML = productList.map((product) => {
            return `
                <div class="product">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Old Price: ${product.oldPrice}</p>
                    <p>New Price: ${product.newPrice}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <img src="${product.image}" alt="${product.name}">
                    <a href="/page/product_detail/product_detail.html?id=${product.id}">Buy</a>
                  
                </div>
            `;
        });

        // Gắn nối chuỗi HTML vào phần tử có id "product"
        document.getElementById("product").innerHTML = `
            <div class="product-container">
                ${productHTML.join("")}
            </div>
        `;
   
    });



        // JavaScript code
        fetch("/database/db.json")
            .then((res) => res.json())
            .then((data) => {
                const productList = data.product;

                const productHTML = productList.map((product) => {
                    return `
                    <a target="_blank" id="card" href="/page/product_detail/product_detail.html?id=${product.id} ">
                        <div class="product">
                            <p id="evaluate">${product.productReviews}<i class="material-symbols-outlined">star</i></p>
                            <img id="main_img" src="${product.image1}" alt="${product.name}">
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
                document.getElementById("card_top").innerHTML = `
                    <div class="product-container_top">
                        ${productHTML.join("")}
                    </div>
                `;
                


            });

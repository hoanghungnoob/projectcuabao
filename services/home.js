  // JavaScript code
  fetch("/database/db.json")
  .then((res) => res.json())
  .then((data) => {
      const productList = data.product;

      const productHTML = productList.map((product) => {
          return `
          <a id="card" href="/page/product_detail/product_detail.html?id=${product.id}">
              <div class="product">
                  <img src="${product.image}" alt="${product.name}">
                  <h2>${product.name}</h2>
                  <div class="price">
                      <p>Old Price: ${product.oldPrice}</p>
                      <p>New Price: ${product.newPrice}</p>
                  </div>
                  <div class="descriptiom_and_btn">
                      <p>${product.description}</p>
                      <button><img src="/images/img_icon/icon shoping cart.svg" alt="cart"></button>
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

  });


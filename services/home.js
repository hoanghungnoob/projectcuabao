fetch("./homiedev_blog_information.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(typeof data); // object
    // sử dụng data để thêm dữ liệu vào DOM
    const listProduct = [];
    listProduct.push(data);
    
    const htmlString = listProduct.map((product) => {
      // Tạo chuỗi HTML từ các thuộc tính của đối tượng product
      return `
        <div>
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <!-- Thêm các thuộc tính khác vào đây -->
        </div>
      `;
    });

    // Đưa chuỗi HTML vào phần tử có id "product"
    document.getElementById("product").innerHTML += htmlString.join("");
  });
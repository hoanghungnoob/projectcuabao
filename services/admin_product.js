
 function fetchProducts(){
   fetch ('http://localhost:3000/product')
  .then(respone => respone.json())
  .then(data =>{
  var list_product= document.getElementById('list_product');
  data.forEach(product => {
    var row= document.createElement("tr");
    var imageCell = document.getElementById('imageCell');
    row.innerHTML= `
      <td>${product.id}</td>
      <td> ${product.name}</td>
      <td id="imageCell"></td>
      <td> ${product.newPrice} </td>
      <td> ${product.quantity}</td>
      <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="saveProduct()">Edit</button>
          <button id="delete_btn_product">Delete</button>
      </td>
    `;
    var img = document.createElement('img');
      img.src = product.image1;
      img.width = 250; // Thiết lập chiều rộng ảnh

      // Thêm ảnh vào thẻ td trong hàng sản phẩm
      row.querySelector('td:nth-child(3)').appendChild(img);
    list_product.appendChild(row);
  });
  // Save data to local storage
    localStorage.setItem('products', JSON.stringify(data));
});
}
fetchProducts();

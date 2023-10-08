const createProduct= document.getElementById('add_product_form')
createProduct.addEventListener('submit', addProducts)
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
function addProducts(){
  var form= document.getElementById('add-product-form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const quantity = document.getElementById('qtyInput').value;
    const newPrice = document.getElementById('newPriceInput').value;
    const oldPrice = document.getElementById('oldPriceInput').value;
    const image1 = document.getElementById('imageFileInput1').value;
    const image2 = document.getElementById('imageFileInput2').value;
    const image3 = document.getElementById('imageFileInput3').value;
    const description = document.getElementById('descriptionInput').value;
    const type='';
    const productReviews='';
    console.log(name, quantity, newPrice, oldPrice)
    // fetch('http://localhost:3000/product',{
    //   method: 'POST',
    //   body: JSON.stringify({
    //     "name": name, 
    //     "quantity": quantity,
    //     "newPrice": newPrice,
    //     "oldPrice": oldPrice,
    //     "image1": image1,
    //     "image2": image2,
    //     "image3": image3,
    //     "description": description, 
    //     "type": type,
    //     "productReviews": productReviews
    //   }),
    //   headers:{
    //     "Content-Type": "application/json"
    //   }
    // })
    // .then(respone=> respone.json())
    // .then(newProduct=>{
    //   const table= document.getElementById('list_product');
    //   const newRow = table.insertRow(-1);

    //   const nameCell = newRow.insertCell(0);
    //   nameCell.innerText= newProduct.name;

    //   const quantityCell= newRow.insertCell(1);
    //   quantityCell.innerText= newProduct.quantity;

    //   const newPriceCell= newRow.insertCell(2);
    //   newPriceCell.innerText= newProduct.newPrice;

    //   const oldPriceCell = newRow.insertCell(3);
    //   oldPriceCell.innerText= newProduct.oldPrice;

    //   const image1Cell= newRow.insertCell(4);
    //   image1Cell.innerText= newProduct.image1Cell;

    //   const image2Cell= newRow.insertCell(5);
    //   image2Cell.innerText= newProduct.image2Cell;

    //   const image3Cell= newRow.insertCell(6);
    //   image3Cell.innerText= newProduct.image3Cell;

    //   const descriptionCell= newRow.insertCell(7);
    //   descriptionCell.innerText= newProduct.descriptionCell;

    //   // document.getElementById('nameInput').value = '';
    //   // document.getElementById('qtyInput').value = '';
    //   // document.getElementById('newPriceInput').value = '';
    //   // document.getElementById('oldPriceInput').value = '';
    //   // document.getElementById('imageFileInput1').value = '';
    //   // document.getElementById('imageFileInput2').value = '';
    //   // document.getElementById('imageFileInput3').value = '';
    //   // document.getElementById('descriptionInput').value = '';
    //   // fetchProducts();
    // })
  })

}




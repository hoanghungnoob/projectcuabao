// function increment() {
//     var inputQty = document.getElementById('input__qty');
//     var currentQty = parseInt(inputQty.value) || 1;
//     var newQty = currentQty + 1;
//     if (newQty < 1) {
//         newQty = 1;
//     }
//     inputQty.value = newQty;
// }

// function decrement() {
//     var inputQty = document.getElementById('input__qty');
//     var currentQty = parseInt(inputQty.value) || 1;
//     var newQty = currentQty - 1;
//     if (newQty < 1) {
//         newQty = 1;
//     }
//     inputQty.value = newQty;
// }

// // JavaScript code
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get('id');
// function detail() {
//     fetch("http://localhost:3000/product")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//         const productHTML = data.map((product) => {
//           return `
//           <div class="product">
//             <a target="_self" id="card" href="/page/product/ProductDetail/ProductDetail.html?id=${product.id}">
//               <p id="evaluate1">${product.productReviews}<i class="material-symbols-outlined">star</i></p>
//               <img id="main_img" src="${product.image1}" alt="${product.name}">
//               <h2>${product.name}</h2>
//               <div class="price">
//                 <p>${product.newPrice} VND</p>
//                 <p>${product.oldPrice} VND</p>
//               </div>
//             </a>
//             <div class="descriptiom_and_btn">
//               <p>${product.description}</p>
//               <div>
//                 <a target="_self" href="/page/product_detail/product_detail.html?id=${product.id}">
//                   <button id="btn_view">View</button>
//                 </a>
//                 <a><button onclick="redirectToOrderPage(${product.id})"><i id="icon_cart" class="fas fa-shopping-cart"></i>Buy</button></a>
//               </div>
//             </div>
//           </div>
//           `;
//         });
  
//         // Gắn nối chuỗi HTML vào phần tử có id "product"
//         document.getElementById("product2").innerHTML = `
//           <div class="product-container">
//             ${productHTML.join("")}
//           </div>
//         `;
  
//         console.table(data, "helllooo");
//         var product = false;
//         data.forEach((element) => {
//           if (productId == element.id) {
//             product = true;
//             if (product) {
//               document.getElementById('product__name').innerHTML = element.name;
//               document.getElementById('main__img').src = element.image1;
//               document.getElementById('item__img1').src = element.image2;
//               document.getElementById('item__img2').src = element.image3;
//               document.getElementById('item__img3').src = element.image1;
//               document.getElementById('new__price').innerHTML = element.newPrice + " VND";
//               document.getElementById('old__price').innerHTML = element.oldPrice + " VND";
//               document.getElementById('describe').innerHTML = element.description;
  
//               // Đánh giá sản phẩm (từ 1 đến 5)
//               var rating = element.productReviews; 
//               console.log(rating);
  
//               // Đây chỉ là ví dụ, bạn có thể thay đổi giá trị này.
  
//               // Lấy tất cả các ngôi sao
//               var stars = document.getElementsByClassName("star");
  
//               var quantity = document.getElementById("input__qty").value;
//               console.t(quantity, 'helllloooo');
//               document.getElementById("product__btn__buy").addEventListener("click", function() {
//                 var orderUrl = "/page/order/order.html?id=" + element.id + "&quantity=" + quantity;
//                 window.location.href = orderUrl;
//                 // var orderUrl1 = "/page/purcha_list/purcha_list.html?id=" + element.id;
//                 // window.location.href = orderUrl1;
//               });
//             } else {
//               document.getElementById("product-detail").innerHTML = "Product not found.";
//             }
//           } else {
//             document.getElementById("product-detail").innerHTML = "Product not found.";
//           }
//         });
//       });
//   }

// detail();

// function choise_product(imgs) {
//         main__img.src = imgs.src;
// }


// // Get all like and dislike buttons
// const likeButtons = document.querySelectorAll('.like-button');
// const dislikeButtons = document.querySelectorAll('.dislike-button');

// // Attach click event listener to each like button
// likeButtons.forEach(likeButton => {
//   likeButton.addEventListener('click', () => {
//     likeButton.classList.add('clicked');
//     dislikeButtons.forEach(dislikeButton => {
//       dislikeButton.classList.remove('clicked');
//     });
//   });
// });

// // Attach click event listener to each dislike button
// dislikeButtons.forEach(dislikeButton => {
//   dislikeButton.addEventListener('click', () => {
//     dislikeButton.classList.add('clicked');
//     likeButtons.forEach(likeButton => {
//       likeButton.classList.remove('clicked');
//     });
//   });
// });



